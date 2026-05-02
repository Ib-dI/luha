import { lessons, type Lesson } from '@/data/lessonData'

export function getAllLessons(): Lesson[] {
  return lessons
}

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

export function getAdjacentLessons(id: number): { prev: Lesson | null; next: Lesson | null } {
  return {
    prev: lessons.find((l) => l.id === id - 1) ?? null,
    next: lessons.find((l) => l.id === id + 1) ?? null,
  }
}
