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
