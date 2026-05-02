import { describe, it, expect } from 'vitest'
import { calculateNextReview } from './spaced-repetition'

describe('calculateNextReview', () => {
  it('score 100 increases strength', () => {
    const { newStrength } = calculateNextReview(2, 100)
    expect(newStrength).toBe(3)
  })
  it('score 0 decreases strength', () => {
    const { newStrength } = calculateNextReview(2, 0)
    expect(newStrength).toBe(1)
  })
  it('score 80 keeps strength unchanged', () => {
    const { newStrength } = calculateNextReview(2, 80)
    expect(newStrength).toBe(2)
  })
  it('strength never goes below 0', () => {
    const { newStrength } = calculateNextReview(0, 0)
    expect(newStrength).toBe(0)
  })
  it('strength never goes above 5', () => {
    const { newStrength } = calculateNextReview(5, 100)
    expect(newStrength).toBe(5)
  })
  it('strength 5 → status mastered', () => {
    const { newStatus } = calculateNextReview(4, 100)
    expect(newStatus).toBe('mastered')
  })
  it('nextReviewAt is in the future', () => {
    const { nextReviewAt } = calculateNextReview(0, 100)
    expect(nextReviewAt.getTime()).toBeGreaterThan(Date.now())
  })
})
