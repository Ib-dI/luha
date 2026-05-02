import { createServerClient } from '@/lib/supabase'
import { getAllLessons } from '@/lib/lessons/repository'
import LessonMap from '@/components/learn/LessonMap'

export const metadata = { title: 'Leçons — Luha' }

export default async function LearnPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: progress }, { data: stats }] = await Promise.all([
    supabase
      .from('user_progress')
      .select('lesson_id, completed, score')
      .eq('user_id', user!.id),
    supabase
      .from('user_stats')
      .select('xp, level, streak_days')
      .eq('user_id', user!.id)
      .single(),
  ])

  const allLessons = getAllLessons()
  const completedIds = new Set(
    (progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id)
  )

  return (
    <LessonMap
      lessons={allLessons}
      completedIds={completedIds}
      userXP={stats?.xp ?? 0}
      totalLessons={allLessons.length}
      completedCount={completedIds.size}
    />
  )
}
