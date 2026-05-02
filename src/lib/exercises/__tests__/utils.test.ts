import { describe, it, expect } from 'vitest'
import { levenshtein, normalizeAnswer, shuffle, scoreAnswer } from '../utils'

describe('levenshtein', () => {
  it('returns 0 for two empty strings', () => {
    expect(levenshtein('', '')).toBe(0)
  })

  it('returns 3 for "kitten" vs "sitting"', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3)
  })
})

describe('normalizeAnswer', () => {
  it('lowercases and trims whitespace', () => {
    expect(normalizeAnswer('  Bonjour  ')).toBe('bonjour')
  })

  it('strips French accents (é → e)', () => {
    expect(normalizeAnswer('Éclair')).toBe('eclair')
  })

  it('handles shimaoré NFC characters without crashing and returns non-empty', () => {
    const result = normalizeAnswer('mzurí')
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('shuffle', () => {
  it('preserves all elements and length', () => {
    const original = [1, 2, 3, 4, 5]
    const arr = [...original]
    const result = shuffle(arr)
    expect(result).toHaveLength(original.length)
    expect(result.sort((a, b) => a - b)).toEqual(original)
  })

  it('returns the same array reference (mutates in place)', () => {
    const arr = [1, 2, 3]
    const result = shuffle(arr)
    expect(result).toBe(arr)
  })
})

describe('scoreAnswer', () => {
  it('returns 100 for identical answers', () => {
    expect(scoreAnswer('bonjour', 'bonjour')).toBe(100)
  })

  it('returns > 0 for a close answer (distance 1)', () => {
    expect(scoreAnswer('bonjur', 'bonjour')).toBeGreaterThan(0)
  })

  it('returns 0 for a completely wrong answer (distance > 2)', () => {
    expect(scoreAnswer('xyz', 'bonjour')).toBe(0)
  })
})
