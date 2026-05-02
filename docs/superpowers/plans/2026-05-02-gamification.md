# Gamification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement XP earning, streak tracking, and accurate level display — so the game loop closes when a user reads a lesson.

**Architecture:** Pure functions in `lib/gamification/` take a Supabase client as a parameter (no hardcoded imports). A single `/api/progress` Route Handler orchestrates DB writes. A `LessonCompleteButton` client component fires the API call, then shows the XP gained before routing to the next lesson.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Supabase SSR, Vitest, pnpm.

**Prerequisites:** Plan `2026-05-02-architecture-refactors.md` must be complete — this plan imports `createServerClient` from `@/lib/supabase`.

---

## File Map

```
src/lib/gamification/
  xp.ts               ← CREATE : XP_REWARDS, LEVEL_THRESHOLDS, calculateLevel, getXPProgress
  xp.test.ts          ← CREATE
  streak.ts           ← CREATE : updateStreak(supabase, userId)

src/lib/exercises/
  spaced-repetition.ts       ← CREATE : calculateNextReview, updateWordAfterAnswer
  spaced-repetition.test.ts  ← CREATE

src/app/api/progress/
  route.ts            ← CREATE : POST handler — complete_lesson action

src/components/learn/
  LessonCompleteButton.tsx  ← CREATE : client component, fires POST /api/progress

src/components/learn/
  LessonViewer.tsx    ← MODIFY : render LessonCompleteButton in the navigation footer

src/components/ui/
  XPBar.tsx           ← MODIFY : replace XP_PER_LEVEL=500 with getXPProgress from lib
```

---

### Task 1: XP Module

**Files:**
- Create: `src/lib/gamification/xp.ts`
- Create: `src/lib/gamification/xp.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// src/lib/gamification/xp.test.ts
import { describe, it, expect } from 'vitest'
import { calculateLevel, getXPProgress, LEVEL_THRESHOLDS } from './xp'

describe('calculateLevel', () => {
  it('level 1 at 0 XP', () => {
    expect(calculateLevel(0)).toBe(1)
  })
  it('level 2 at 100 XP', () => {
    expect(calculateLevel(100)).toBe(2)
  })
  it('level 2 at 299 XP (just before level 3)', () => {
    expect(calculateLevel(299)).toBe(2)
  })
  it('level 3 at 300 XP', () => {
    expect(calculateLevel(300)).toBe(3)
  })
  it('max level at very high XP', () => {
    expect(calculateLevel(99999)).toBe(LEVEL_THRESHOLDS.length)
  })
})

describe('getXPProgress', () => {
  it('at level 1 start, 0% progress', () => {
    const { percent } = getXPProgress(0)
    expect(percent).toBe(0)
  })
  it('at level 1 halfway (50 XP out of 100), 50% progress', () => {
    const { percent } = getXPProgress(50)
    expect(percent).toBe(50)
  })
  it('at exact level threshold, 0% progress in new level', () => {
    const { percent, current } = getXPProgress(100)
    expect(current).toBe(0)
    expect(percent).toBe(0)
  })
  it('never exceeds 100%', () => {
    const { percent } = getXPProgress(99999)
    expect(percent).toBeLessThanOrEqual(100)
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `pnpm test xp`
Expected: FAIL — "Cannot find module './xp'"

- [ ] **Step 3: Create the module**

```typescript
// src/lib/gamification/xp.ts
export const XP_REWARDS = {
  lesson_completed:       50,
  exercise_correct_100:   10,
  exercise_correct_80:     7,
  word_mastered:          20,
  conversation_completed: 30,
  perfect_lesson:         25,
  daily_streak:           15,
  streak_7_days:          50,
  streak_30_days:        200,
} as const

export type XPRewardKey = keyof typeof XP_REWARDS

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500]

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--)
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1
  return 1
}

export function getXPProgress(xp: number): { current: number; required: number; percent: number } {
  const level = calculateLevel(xp)
  const levelStart = LEVEL_THRESHOLDS[level - 1] ?? 0
  const levelEnd = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  const current = xp - levelStart
  const required = levelEnd - levelStart
  return {
    current,
    required,
    percent: Math.min(Math.round((current / required) * 100), 100),
  }
}
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `pnpm test xp`
Expected: all 8 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/lib/gamification/xp.ts src/lib/gamification/xp.test.ts
git commit -m "feat: add XP rewards, level thresholds, and progress calculation"
```

---

### Task 2: Streak Module

**Files:**
- Create: `src/lib/gamification/streak.ts`

- [ ] **Step 1: Create the module**

The streak module writes to the database — it accepts a Supabase client instead of importing one, so it works in both API routes and server actions.

```typescript
// src/lib/gamification/streak.ts
import type { SupabaseClient } from '@supabase/supabase-js'
import { XP_REWARDS } from './xp'

export async function updateStreak(
  supabase: SupabaseClient,
  userId: string
): Promise<{ streak: number; bonusXp: number }> {
  const { data: s } = await supabase
    .from('user_stats')
    .select('streak_days, last_activity_date, streak_shield_count, xp, total_sessions')
    .eq('user_id', userId)
    .single()

  const today = new Date().toISOString().split('T')[0]

  if (s?.last_activity_date === today) {
    return { streak: s.streak_days ?? 0, bonusXp: 0 }
  }

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
    streak += 1
    await supabase
      .from('user_stats')
      .update({ streak_shield_count: s.streak_shield_count - 1 })
      .eq('user_id', userId)
  } else {
    streak = 1
  }

  if (streak === 7)  bonusXp += XP_REWARDS.streak_7_days
  if (streak === 30) bonusXp += XP_REWARDS.streak_30_days

  await supabase.from('user_stats').upsert(
    {
      user_id: userId,
      streak_days: streak,
      last_activity_date: today,
      xp: (s?.xp ?? 0) + bonusXp,
      total_sessions: (s?.total_sessions ?? 0) + 1,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  )

  return { streak, bonusXp }
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/gamification/streak.ts
git commit -m "feat: add streak tracking with shield protection"
```

---

### Task 3: Spaced Repetition Module

**Files:**
- Create: `src/lib/exercises/spaced-repetition.ts`
- Create: `src/lib/exercises/spaced-repetition.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// src/lib/exercises/spaced-repetition.test.ts
import { describe, it, expect } from 'vitest'
import { calculateNextReview } from './spaced-repetition'

describe('calculateNextReview', () => {
  it('score 100 increases strength', () => {
    const { newStrength } = calculateNextReview(2, 100)
    expect(newStrength).toBe(3)
  })
  it('score 0 decreases strength', () => {
    const { newStrength } = calculateNextReview(2, 0)
    expect(newStrength).toBe(1)
  })
  it('score 80 keeps strength unchanged', () => {
    const { newStrength } = calculateNextReview(2, 80)
    expect(newStrength).toBe(2)
  })
  it('strength never goes below 0', () => {
    const { newStrength } = calculateNextReview(0, 0)
    expect(newStrength).toBe(0)
  })
  it('strength never goes above 5', () => {
    const { newStrength } = calculateNextReview(5, 100)
    expect(newStrength).toBe(5)
  })
  it('strength 5 → status mastered', () => {
    const { newStatus } = calculateNextReview(4, 100)
    expect(newStatus).toBe('mastered')
  })
  it('nextReviewAt is in the future', () => {
    const { nextReviewAt } = calculateNextReview(0, 100)
    expect(nextReviewAt.getTime()).toBeGreaterThan(Date.now())
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `pnpm test spaced-repetition`
Expected: FAIL

- [ ] **Step 3: Create the module**

```typescript
// src/lib/exercises/spaced-repetition.ts
import type { SupabaseClient } from '@supabase/supabase-js'

const INTERVALS = [1, 2, 4, 7, 14, 30] as const

type WordStatus = 'new' | 'learning' | 'reviewing' | 'mastered'

export function calculateNextReview(
  strength: number,
  score: number
): { newStrength: number; nextReviewAt: Date; newStatus: WordStatus } {
  let s = strength
  if (score === 0)   s = Math.max(0, s - 1)
  if (score === 100) s = Math.min(5, s + 1)

  const next = new Date()
  next.setDate(next.getDate() + INTERVALS[s])

  const newStatus: WordStatus =
    s >= 5 ? 'mastered' :
    s >= 3 ? 'reviewing' :
    s >= 1 ? 'learning' :
             'new'

  return { newStrength: s, nextReviewAt: next, newStatus }
}

export async function updateWordAfterAnswer(
  supabase: SupabaseClient,
  userId: string,
  vocabularyId: string,
  score: number
): Promise<void> {
  const { data: ex } = await supabase
    .from('user_vocabulary')
    .select('strength, mistake_count, correct_count')
    .eq('user_id', userId)
    .eq('vocabulary_id', vocabularyId)
    .single()

  const { newStrength, nextReviewAt, newStatus } = calculateNextReview(ex?.strength ?? 0, score)

  await supabase.from('user_vocabulary').upsert(
    {
      user_id: userId,
      vocabulary_id: vocabularyId,
      strength: newStrength,
      status: newStatus,
      next_review_at: nextReviewAt.toISOString(),
      last_reviewed_at: new Date().toISOString(),
      mistake_count: score === 0 ? (ex?.mistake_count ?? 0) + 1 : (ex?.mistake_count ?? 0),
      correct_count: score > 0  ? (ex?.correct_count ?? 0) + 1  : (ex?.correct_count ?? 0),
    },
    { onConflict: 'user_id,vocabulary_id' }
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `pnpm test spaced-repetition`
Expected: all 7 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/lib/exercises/spaced-repetition.ts src/lib/exercises/spaced-repetition.test.ts
git commit -m "feat: add SM-2 spaced repetition with strength and status tracking"
```

---

### Task 4: Progress API Route

**Files:**
- Create: `src/app/api/progress/route.ts`

- [ ] **Step 1: Create the route handler**

```typescript
// src/app/api/progress/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { XP_REWARDS, calculateLevel } from '@/lib/gamification/xp'
import { updateStreak } from '@/lib/gamification/streak'

export async function POST(request: Request) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body: { action: string; lessonId?: number } = await request.json()

  if (body.action !== 'complete_lesson' || !body.lessonId) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { lessonId } = body

  // Check if already completed to avoid double XP
  const { data: existing } = await supabase
    .from('user_progress')
    .select('completed')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .single()

  const alreadyCompleted = existing?.completed === true

  // Mark lesson as completed
  await supabase.from('user_progress').upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      score: 100,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,lesson_id' }
  )

  // Award XP only on first completion
  let xpGained = 0
  if (!alreadyCompleted) {
    xpGained = XP_REWARDS.lesson_completed

    const { data: stats } = await supabase
      .from('user_stats')
      .select('xp')
      .eq('user_id', user.id)
      .single()

    const newXP = (stats?.xp ?? 0) + xpGained
    const newLevel = calculateLevel(newXP)

    await supabase.from('user_stats').upsert(
      { user_id: user.id, xp: newXP, level: newLevel, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )
  }

  // Update streak (idempotent for same day)
  const { streak, bonusXp } = await updateStreak(supabase, user.id)

  return NextResponse.json({
    xpGained: xpGained + bonusXp,
    lessonXp: xpGained,
    streakBonusXp: bonusXp,
    streak,
    alreadyCompleted,
  })
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/progress/route.ts
git commit -m "feat: add POST /api/progress route for lesson completion and XP awarding"
```

---

### Task 5: Lesson Complete Button

**Files:**
- Create: `src/components/learn/LessonCompleteButton.tsx`
- Modify: `src/components/learn/LessonViewer.tsx`

- [ ] **Step 1: Create the client component**

```typescript
// src/components/learn/LessonCompleteButton.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface Props {
  lessonId: number
  nextLessonId: number | null
}

interface ProgressResult {
  xpGained: number
  streak: number
  alreadyCompleted: boolean
}

export default function LessonCompleteButton({ lessonId, nextLessonId }: Props) {
  const router = useRouter()
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  const [result, setResult] = useState<ProgressResult | null>(null)

  async function handleComplete() {
    if (state !== 'idle') return
    setState('loading')

    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'complete_lesson', lessonId }),
    })
    const data: ProgressResult = await res.json()
    setResult(data)
    setState('done')

    setTimeout(() => {
      if (nextLessonId) {
        router.push(`/learn/${nextLessonId}`)
      } else {
        router.push('/learn')
      }
      router.refresh()
    }, 2000)
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleComplete}
        disabled={state !== 'idle'}
        whileTap={{ scale: 0.97 }}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-60"
        style={{ background: 'var(--accent-blue)', color: 'white' }}
      >
        {state === 'loading' ? (
          <Loader2 size={14} className="animate-spin" />
        ) : state === 'done' ? (
          <CheckCircle2 size={14} />
        ) : null}
        {state === 'done'
          ? nextLessonId
            ? 'Leçon suivante →'
            : 'Parcours terminé !'
          : 'Terminer la leçon'}
      </motion.button>

      <AnimatePresence>
        {state === 'done' && result && !result.alreadyCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: -44, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
            style={{ background: '#22a722', color: 'white', fontFamily: 'var(--font-mono)' }}
          >
            +{result.xpGained} XP ⚡
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Add LessonCompleteButton to LessonViewer**

In `src/components/learn/LessonViewer.tsx`:

Add import at the top:
```typescript
import LessonCompleteButton from './LessonCompleteButton'
```

Replace the "next lesson" block in the navigation footer (the `{nextLesson ? (...) : (...)}` block that currently uses a `<Link>`):

```typescript
{/* ─── Navigation ─── */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="flex items-center justify-between gap-3 pt-4 border-t"
  style={{ borderColor: 'rgba(0,0,0,0.08)' }}
>
  {prevLesson ? (
    <Link href={`/learn/${prevLesson.id}`} className="flex-1">
      <motion.div
        whileHover={{ x: -2 }}
        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
        style={{
          background: 'var(--bg-light-2)',
          border: '1px solid rgba(0,0,0,0.08)',
          color: 'var(--text-dark-gray)',
        }}
      >
        <ArrowLeft size={13} />
        <span className="truncate">{prevLesson.title.replace(/^\d+\s*-\s*/, '')}</span>
      </motion.div>
    </Link>
  ) : (
    <div className="flex-1" />
  )}

  <LessonCompleteButton
    lessonId={lesson.id}
    nextLessonId={nextLesson?.id ?? null}
  />
</motion.div>
```

Note: Remove the old `{nextLesson ? <Link>...</Link> : <div>🎉</div>}` block entirely — `LessonCompleteButton` handles both cases (navigates to next lesson if it exists, to `/learn` if not).

Also remove the `ArrowRight` import if it's no longer used after this change.

- [ ] **Step 3: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/learn/LessonCompleteButton.tsx src/components/learn/LessonViewer.tsx
git commit -m "feat: wire lesson completion to XP API with animated feedback"
```

---

### Task 6: Fix XPBar Level Display

**Files:**
- Modify: `src/components/ui/XPBar.tsx`

- [ ] **Step 1: Update XPBar to use LEVEL_THRESHOLDS-aware progress**

Replace the entirety of `src/components/ui/XPBar.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion'
import { getXPProgress } from '@/lib/gamification/xp'

interface XPBarProps {
  xp: number
  level: number
}

export default function XPBar({ xp, level }: XPBarProps) {
  const { current, required, percent } = getXPProgress(xp)

  return (
    <div
      className="w-full flex items-center gap-3 px-4 py-1.5"
      style={{
        background: 'var(--bg-light-2)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <span
        className="text-[10px] font-bold uppercase tracking-widest shrink-0"
        style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}
      >
        NIV.{level}
      </span>

      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.08)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--accent-blue)' }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <span
        className="text-[10px] shrink-0 tabular-nums"
        style={{ color: 'var(--text-gray)', fontFamily: 'var(--font-mono)' }}
      >
        {current}
        <span style={{ color: 'rgba(0,0,0,0.2)' }}>/{required}</span>
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/XPBar.tsx
git commit -m "fix: XPBar now uses LEVEL_THRESHOLDS for accurate level progress display"
```
