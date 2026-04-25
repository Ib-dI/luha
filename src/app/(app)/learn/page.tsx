import { createClient } from '@/lib/supabase/server'
import { lessons } from '@/data/lessonData'
import LessonMap from '@/components/learn/LessonMap'

export const metadata = { title: 'Leçons — Luha' }

export default async function LearnPage() {
  const supabase = await createClient()
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

  const completedIds = new Set(
    (progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id)
  )
  const userXP = stats?.xp ?? 0
  const totalLessons = lessons.length
  const completedCount = completedIds.size

  return (
    <LessonMap
      lessons={lessons}
      completedIds={completedIds}
      userXP={userXP}
      totalLessons={totalLessons}
      completedCount={completedCount}
    />
  )
}
