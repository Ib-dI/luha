import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { loadLessonExercises } from '@/lib/exercises/engine'
import ExerciseSession from '@/components/exercises/ExerciseSession'
import { getLessonById } from '@/lib/lessons/repository'

interface PageProps {
  params: Promise<{ lessonId: string }>
}

export default async function PracticePage({ params }: PageProps) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { lessonId: lessonIdParam } = await params
  const lessonId = parseInt(lessonIdParam, 10)
  const lesson = getLessonById(lessonId)
  if (!lesson) redirect('/learn')

  const exercises = await loadLessonExercises(supabase, lessonId)

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-dark)' }}>
        Pratique — {lesson.title}
      </h1>
      <ExerciseSession exercises={exercises} lessonId={lessonId} />
    </div>
  )
}
