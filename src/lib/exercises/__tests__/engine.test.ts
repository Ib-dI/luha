import { describe, it, expect } from 'vitest'
import { validateAnswer, generateFallbackQCM } from '../engine'
import type { Exercise } from '../types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeQCM(choices: string[], correctIndex: number): Exercise {
  return {
    id: 'test-qcm-1',
    lessonId: 1,
    is_approved: true,
    question: {
      type: 'qcm',
      question: 'Test question?',
      choices,
      correct: correctIndex,
    },
  }
}

function makeFill(sentence: string, blank: string): Exercise {
  return {
    id: 'test-fill-1',
    lessonId: 1,
    is_approved: true,
    question: {
      type: 'fill',
      sentence,
      blank,
    },
  }
}

// ---------------------------------------------------------------------------
// validateAnswer — QCM
// ---------------------------------------------------------------------------
describe('validateAnswer — QCM', () => {
  it('correct choice → { correct: true, score: 100 }', () => {
    const exercise = makeQCM(['Ndjema', 'Jeje', 'Kwezi', 'Haɓari'], 0)
    const result = validateAnswer(exercise, 'Ndjema')
    expect(result.correct).toBe(true)
    expect(result.score).toBe(100)
    expect(result.exerciseId).toBe('test-qcm-1')
    expect(result.correctAnswer).toBe('Ndjema')
    expect(result.userAnswer).toBe('Ndjema')
  })

  it('wrong choice → { correct: false, score: 0 }', () => {
    const exercise = makeQCM(['Ndjema', 'Jeje', 'Kwezi', 'Haɓari'], 0)
    const result = validateAnswer(exercise, 'Jeje')
    expect(result.correct).toBe(false)
    expect(result.score).toBe(0)
    expect(result.correctAnswer).toBe('Ndjema')
    expect(result.userAnswer).toBe('Jeje')
  })
})

// ---------------------------------------------------------------------------
// validateAnswer — Fill
// ---------------------------------------------------------------------------
describe('validateAnswer — fill', () => {
  it('exact answer → correct', () => {
    const exercise = makeFill('___ aleikum', 'Salaam')
    const result = validateAnswer(exercise, 'Salaam')
    expect(result.correct).toBe(true)
    expect(result.score).toBe(100)
  })

  it('answer with 1 typo → correct (score >= 80)', () => {
    // "Salaam" vs "Salaan" — levenshtein distance 1
    const exercise = makeFill('___ aleikum', 'Salaam')
    const result = validateAnswer(exercise, 'Salaan')
    expect(result.score).toBeGreaterThanOrEqual(80)
    expect(result.correct).toBe(true)
  })

  it('completely wrong answer → { correct: false }', () => {
    const exercise = makeFill('___ aleikum', 'Salaam')
    const result = validateAnswer(exercise, 'bonjour-le-monde-rien')
    expect(result.correct).toBe(false)
    expect(result.score).toBeLessThan(80)
  })
})

// ---------------------------------------------------------------------------
// generateFallbackQCM
// ---------------------------------------------------------------------------
describe('generateFallbackQCM', () => {
  it('returns 5 exercises by default', () => {
    const exercises = generateFallbackQCM(1)
    expect(exercises).toHaveLength(5)
  })

  it('all exercises have is_approved: false', () => {
    const exercises = generateFallbackQCM(1)
    for (const ex of exercises) {
      expect(ex.is_approved).toBe(false)
    }
  })

  it('all exercises have question.type === "qcm"', () => {
    const exercises = generateFallbackQCM(1)
    for (const ex of exercises) {
      expect(ex.question.type).toBe('qcm')
    }
  })

  it('each QCM exercise has 4 choices', () => {
    const exercises = generateFallbackQCM(1)
    for (const ex of exercises) {
      if (ex.question.type === 'qcm') {
        expect(ex.question.choices).toHaveLength(4)
      }
    }
  })

  it('correct index is valid (within choices array)', () => {
    const exercises = generateFallbackQCM(1)
    for (const ex of exercises) {
      if (ex.question.type === 'qcm') {
        expect(ex.question.correct).toBeGreaterThanOrEqual(0)
        expect(ex.question.correct).toBeLessThan(ex.question.choices.length)
      }
    }
  })

  it('respects custom count parameter', () => {
    const exercises = generateFallbackQCM(2, 3)
    expect(exercises).toHaveLength(3)
  })

  it('exercise ids contain the lessonId', () => {
    const exercises = generateFallbackQCM(7)
    for (const ex of exercises) {
      expect(ex.id).toContain('fallback-7-')
      expect(ex.lessonId).toBe(7)
    }
  })
})
