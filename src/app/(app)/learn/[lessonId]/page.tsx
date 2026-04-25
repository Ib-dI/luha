import { notFound } from 'next/navigation'
import { lessons } from '@/data/lessonData'
import LessonViewer from '@/components/learn/LessonViewer'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ lessonId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId } = await params
  const lesson = lessons.find((l) => l.id === Number(lessonId))
  if (!lesson) return {}
  return { title: `${lesson.title} — Luha` }
}

export default async function LessonPage({ params }: Props) {
  const { lessonId } = await params
  const id = Number(lessonId)
  const lesson = lessons.find((l) => l.id === id)
  if (!lesson) notFound()

  const prevLesson = lessons.find((l) => l.id === id - 1) ?? null
  const nextLesson = lessons.find((l) => l.id === id + 1) ?? null

  return <LessonViewer lesson={lesson} prevLesson={prevLesson} nextLesson={nextLesson} />
}
