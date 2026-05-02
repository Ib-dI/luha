export const STAGGER_DELAY = {
  chapter: 0.08,
  card: 0.025,
  section: 0.04,
} as const

export const FADE_DURATION = {
  fast: 0.3,
  normal: 0.45,
  slow: 0.5,
} as const

export const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number]
