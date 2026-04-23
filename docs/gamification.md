# Gamification — XP, Streak, Spaced Repetition — Luha

## XP

```typescript
// src/lib/gamification/xp.ts
export const XP_REWARDS = {
  lesson_completed:       50,
  exercise_correct_100:   10,
  exercise_correct_80:     7,   // réponse approchante
  word_mastered:          20,
  conversation_completed: 30,
  perfect_lesson:         25,   // 100% à une leçon
  daily_streak:           15,
  streak_7_days:          50,
  streak_30_days:        200,
} as const

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500]

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--)
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1
  return 1
}
```

## Streak + Bouclier

```typescript
// src/lib/gamification/streak.ts
import { supabase } from '@/lib/supabase'
import { XP_REWARDS } from './xp'

export async function updateStreak(userId: string) {
  const { data: s } = await supabase
    .from('user_stats').select('*').eq('user_id', userId).single()

  const today = new Date().toISOString().split('T')[0]
  if (s?.last_activity_date === today) return { streak: s.streak_days, bonusXp: 0 }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yStr = yesterday.toISOString().split('T')[0]

  let streak = s?.streak_days ?? 0
  let bonusXp = XP_REWARDS.daily_streak

  if (!s?.last_activity_date) {
    streak = 1
  } else if (s.last_activity_date === yStr) {
    streak += 1
  } else if ((s?.streak_shield_count ?? 0) > 0) {
    // Bouclier : absorbe un jour manqué
    streak += 1
    await supabase.from('user_stats')
      .update({ streak_shield_count: s.streak_shield_count - 1 }).eq('user_id', userId)
  } else {
    streak = 1
  }

  if (streak === 7)  bonusXp += XP_REWARDS.streak_7_days
  if (streak === 30) bonusXp += XP_REWARDS.streak_30_days

  await supabase.from('user_stats').upsert({
    user_id: userId, streak_days: streak,
    last_activity_date: today,
    xp: (s?.xp ?? 0) + bonusXp,
    total_sessions: (s?.total_sessions ?? 0) + 1,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' })

  return { streak, bonusXp }
}
```

## Spaced Repetition (SM-2 simplifié)

```typescript
// src/lib/exercises/spaced-repetition.ts
import { supabase } from '@/lib/supabase'

// Intervalles en jours selon force 0→5
const INTERVALS = [1, 2, 4, 7, 14, 30]

export function calculateNextReview(strength: number, score: number) {
  let s = strength
  if (score === 0)   s = Math.max(0, s - 1)
  if (score === 100) s = Math.min(5, s + 1)
  // score 80 → force inchangée

  const next = new Date()
  next.setDate(next.getDate() + INTERVALS[s])

  return {
    newStrength: s,
    nextReviewAt: next,
    newStatus: s >= 5 ? 'mastered' : s >= 3 ? 'reviewing' : s >= 1 ? 'learning' : 'new'
  }
}

export async function updateWordAfterAnswer(
  userId: string, vocabularyId: string, score: number
) {
  const { data: ex } = await supabase
    .from('user_vocabulary').select('strength, mistake_count, correct_count')
    .eq('user_id', userId).eq('vocabulary_id', vocabularyId).single()

  const { newStrength, nextReviewAt, newStatus } =
    calculateNextReview(ex?.strength ?? 0, score)

  await supabase.from('user_vocabulary').upsert({
    user_id: userId, vocabulary_id: vocabularyId,
    strength: newStrength, status: newStatus,
    next_review_at: nextReviewAt.toISOString(),
    last_reviewed_at: new Date().toISOString(),
    mistake_count: score === 0 ? (ex?.mistake_count ?? 0) + 1 : (ex?.mistake_count ?? 0),
    correct_count: score > 0 ? (ex?.correct_count ?? 0) + 1 : (ex?.correct_count ?? 0),
  }, { onConflict: 'user_id,vocabulary_id' })
}
```
