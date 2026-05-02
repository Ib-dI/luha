import { notFound } from 'next/navigation'
import { getLessonById, getAdjacentLessons } from '@/lib/lessons/repository'
import LessonViewer from '@/components/learn/LessonViewer'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ lessonId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId } = await params
  const lesson = getLessonById(Number(lessonId))
  if (!lesson) return {}
  return { title: `${lesson.title} — Luha` }
}

export default async function LessonPage({ params }: Props) {
  const { lessonId } = await params
  const id = Number(lessonId)
  const lesson = getLessonById(id)
  if (!lesson) notFound()

  const { prev, next } = getAdjacentLessons(id)
  return <LessonViewer lesson={lesson} prevLesson={prev} nextLesson={next} />
}
