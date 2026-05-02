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

  const body: { lessonId?: number } = await request.json()

  if (!body.lessonId) {
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
  const { error: progressError } = await supabase.from('user_progress').upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      score: 100,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,lesson_id' }
  )

  if (progressError) {
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
  }

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
