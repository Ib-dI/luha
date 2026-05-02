import { describe, it, expect } from 'vitest'
import { getAllLessons, getLessonById, getAdjacentLessons } from './repository'

describe('getAllLessons', () => {
  it('returns all 37 lessons', () => {
    expect(getAllLessons()).toHaveLength(37)
  })
  it('first lesson has id 1', () => {
    expect(getAllLessons()[0].id).toBe(1)
  })
})

describe('getLessonById', () => {
  it('finds a lesson by id', () => {
    const lesson = getLessonById(5)
    expect(lesson).toBeDefined()
    expect(lesson!.id).toBe(5)
  })
  it('returns undefined for unknown id', () => {
    expect(getLessonById(999)).toBeUndefined()
  })
})

describe('getAdjacentLessons', () => {
  it('first lesson has no prev', () => {
    const { prev } = getAdjacentLessons(1)
    expect(prev).toBeNull()
  })
  it('last lesson has no next', () => {
    const { next } = getAdjacentLessons(37)
    expect(next).toBeNull()
  })
  it('middle lesson has both prev and next', () => {
    const all = getAllLessons()
    const idx = all.findIndex((l) => l.id === 10)
    const { prev, next } = getAdjacentLessons(10)
    expect(prev!.id).toBe(all[idx - 1].id)
    expect(next!.id).toBe(all[idx + 1].id)
  })
  it('returns null for both when id not found', () => {
    const { prev, next } = getAdjacentLessons(999)
    expect(prev).toBeNull()
    expect(next).toBeNull()
  })
})
