export type LessonStatus = 'completed' | 'current' | 'available' | 'locked'

export const XP_PER_LESSON = 50

export function getRequiredXP(lessonId: number): number {
  return (lessonId - 1) * XP_PER_LESSON
}

export function getLessonStatus(
  lessonId: number,
  completedIds: Set<number>,
  userXP: number
): LessonStatus {
  if (completedIds.has(lessonId)) return 'completed'
  const xpNeeded = getRequiredXP(lessonId)
  if (userXP >= xpNeeded) {
    const prevDone = lessonId === 1 || completedIds.has(lessonId - 1)
    return prevDone ? 'current' : 'available'
  }
  return 'locked'
}
