import { describe, it, expect } from 'vitest'
import { getRequiredXP, getLessonStatus, XP_PER_LESSON } from './progressionEngine'

describe('getRequiredXP', () => {
  it('lesson 1 requires 0 XP', () => {
    expect(getRequiredXP(1)).toBe(0)
  })
  it('lesson 2 requires one unit', () => {
    expect(getRequiredXP(2)).toBe(XP_PER_LESSON)
  })
  it('lesson 10 requires 9 units', () => {
    expect(getRequiredXP(10)).toBe(9 * XP_PER_LESSON)
  })
})

describe('getLessonStatus', () => {
  it('returns completed when lesson is in completedIds', () => {
    expect(getLessonStatus(3, new Set([1, 2, 3]), 0)).toBe('completed')
  })
  it('returns current when XP sufficient and previous done', () => {
    const status = getLessonStatus(2, new Set([1]), XP_PER_LESSON)
    expect(status).toBe('current')
  })
  it('returns available when XP sufficient but previous NOT done', () => {
    const status = getLessonStatus(3, new Set([1]), 2 * XP_PER_LESSON)
    expect(status).toBe('available')
  })
  it('returns locked when XP insufficient', () => {
    const status = getLessonStatus(5, new Set([]), 0)
    expect(status).toBe('locked')
  })
  it('lesson 1 is current with 0 XP and nothing completed', () => {
    expect(getLessonStatus(1, new Set([]), 0)).toBe('current')
  })
})
