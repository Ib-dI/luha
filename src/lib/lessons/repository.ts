import { lessons, type Lesson } from '@/data/lessonData'

export function getAllLessons(): Lesson[] {
  return [...lessons]
}

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

export function getAdjacentLessons(id: number): { prev: Lesson | null; next: Lesson | null } {
  const idx = lessons.findIndex((l) => l.id === id)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: lessons[idx - 1] ?? null,
    next: lessons[idx + 1] ?? null,
  }
}
