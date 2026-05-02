import { createServerClient } from '@/lib/supabase'
import { loadLessonExercises } from '@/lib/exercises/engine'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { lessonId: lessonIdParam } = await params
  const lessonId = parseInt(lessonIdParam, 10)
  if (isNaN(lessonId)) return NextResponse.json({ error: 'Invalid lessonId' }, { status: 400 })

  const exercises = await loadLessonExercises(supabase, lessonId)
  return NextResponse.json({ exercises })
}
