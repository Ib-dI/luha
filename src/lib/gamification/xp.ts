export const XP_REWARDS = {
  lesson_completed:       50,
  exercise_correct_100:   10,
  exercise_correct_80:     7,
  word_mastered:          20,
  conversation_completed: 30,
  perfect_lesson:         25,
  daily_streak:           15,
  streak_7_days:          50,
  streak_30_days:        200,
} as const

export type XPRewardKey = keyof typeof XP_REWARDS

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500]

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--)
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1
  return 1
}

export function getXPProgress(xp: number): { current: number; required: number; percent: number } {
  const level = calculateLevel(xp)
  const levelStart = LEVEL_THRESHOLDS[level - 1] ?? 0
  const levelEnd = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  const current = xp - levelStart
  const required = levelEnd - levelStart
  return {
    current,
    required,
    percent: Math.min(Math.round((current / required) * 100), 100),
  }
}
