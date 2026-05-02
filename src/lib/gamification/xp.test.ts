import { describe, it, expect } from 'vitest'
import { calculateLevel, getXPProgress, LEVEL_THRESHOLDS } from './xp'

describe('calculateLevel', () => {
  it('level 1 at 0 XP', () => {
    expect(calculateLevel(0)).toBe(1)
  })
  it('level 2 at 100 XP', () => {
    expect(calculateLevel(100)).toBe(2)
  })
  it('level 2 at 299 XP (just before level 3)', () => {
    expect(calculateLevel(299)).toBe(2)
  })
  it('level 3 at 300 XP', () => {
    expect(calculateLevel(300)).toBe(3)
  })
  it('max level at very high XP', () => {
    expect(calculateLevel(99999)).toBe(LEVEL_THRESHOLDS.length)
  })
})

describe('getXPProgress', () => {
  it('at level 1 start, 0% progress', () => {
    const { percent } = getXPProgress(0)
    expect(percent).toBe(0)
  })
  it('at level 1 halfway (50 XP out of 100), 50% progress', () => {
    const { percent } = getXPProgress(50)
    expect(percent).toBe(50)
  })
  it('at exact level threshold, 0% progress in new level', () => {
    const { percent, current } = getXPProgress(100)
    expect(current).toBe(0)
    expect(percent).toBe(0)
  })
  it('never exceeds 100%', () => {
    const { percent } = getXPProgress(99999)
    expect(percent).toBeLessThanOrEqual(100)
  })
})
