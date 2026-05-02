# Exercise Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the exercise engine — types, validation, Levenshtein scoring, feedback animation, and a working practice page that renders multiple-choice exercises generated from static vocabulary.

**Architecture:** `lib/exercises/` owns all business logic (pure functions where possible). UI components import only from the lib's stable interface (`validateAnswer`, `Exercise`, `ExerciseResult`). The practice page is a full client component — it manages session state locally and calls the lib directly. A single API route `GET /api/exercises/[lessonId]` provides exercises to the client.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Framer Motion, Vitest, pnpm.

**Prerequisites:** Plan `2026-05-02-architecture-refactors.md` must be complete (imports from `@/lib/supabase`).

**Note on data:** The database may not be seeded yet. The engine has a `generateFallback` path that builds multiple-choice questions directly from `src/data/structured_translations.json` — the practice page will work even with an empty database.

---

## File Map

```
src/lib/exercises/
  types.ts              ← CREATE : QuestionData, Exercise, ExerciseResult
  utils.ts              ← CREATE : levenshtein, shuffle, normalizeAnswer
  utils.test.ts         ← CREATE
  engine.ts             ← CREATE : validateAnswer, loadLessonExercises, generateFallback
  engine.test.ts        ← CREATE

src/components/exercises/
  FeedbackAnimation.tsx       ← CREATE : bottom-sheet correct/incorrect feedback
  MultipleChoiceExercise.tsx  ← CREATE : renders choice grid
  ExerciseSession.tsx         ← CREATE : full session state machine

src/app/(app)/learn/[lessonId]/
  practice/
    page.tsx            ← CREATE : server shell that passes lessonId to ExerciseSession

src/app/api/exercises/
  [lessonId]/
    route.ts            ← CREATE : GET handler — returns exercises for lesson
```

---

### Task 1: Exercise Types

**Files:**
- Create: `src/lib/exercises/types.ts`

- [ ] **Step 1: Create the types file**

```typescript
// src/lib/exercises/types.ts
export type QuestionData =
  | { type: 'multiple_choice'; prompt: string; choices: string[] }
  | { type: 'drag_drop'; sentence_template: string; word_bank: string[] }
  | { type: 'word_builder'; components: string[]; instruction: string }
  | { type: 'fill_gap'; sentence: string; blank_position: number }
  | { type: 'match_pairs'; pairs: Array<{ left: string; right: string }> }
  | { type: 'sentence_scramble'; words: string[]; instruction: string }
  | { type: 'audio_match'; audio_url: string; choices: string[] }
  | { type: 'tap_select'; prompt: string; word_grid: string[] }

export interface Exercise {
  id: string
  type: string
  lesson_id: number
  vocabulary_id?: string
  difficulty: 1 | 2 | 3
  question: QuestionData
  correct_answer: string
  accepted_answers: string[]
  hint?: string
  generated_by: 'human' | 'ai'
  is_approved: boolean
}

export interface ExerciseResult {
  exercise_id: string
  vocabulary_id?: string
  correct: boolean
  score: 0 | 80 | 100
  time_ms: number
  user_answer: string
  suggestion?: string
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/exercises/types.ts
git commit -m "feat: add exercise and result type definitions"
```

---

### Task 2: Utils (Levenshtein + Helpers)

**Files:**
- Create: `src/lib/exercises/utils.ts`
- Create: `src/lib/exercises/utils.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// src/lib/exercises/utils.test.ts
import { describe, it, expect } from 'vitest'
import { levenshtein, normalizeAnswer, shuffle } from './utils'

describe('levenshtein', () => {
  it('identical strings = 0', () => {
    expect(levenshtein('salama', 'salama')).toBe(0)
  })
  it('single insertion = 1', () => {
    expect(levenshtein('salama', 'salamaa')).toBe(1)
  })
  it('single deletion = 1', () => {
    expect(levenshtein('salama', 'salam')).toBe(1)
  })
  it('single substitution = 1', () => {
    expect(levenshtein('salama', 'salame')).toBe(1)
  })
  it('empty vs non-empty = length of non-empty', () => {
    expect(levenshtein('', 'abc')).toBe(3)
  })
  it('typical shimaoré near-miss ≤ 2', () => {
    expect(levenshtein('habari', 'haɓari')).toBeLessThanOrEqual(2)
  })
})

describe('normalizeAnswer', () => {
  it('lowercases', () => {
    expect(normalizeAnswer('SALAMA')).toBe('salama')
  })
  it('trims whitespace', () => {
    expect(normalizeAnswer('  salama  ')).toBe('salama')
  })
  it('strips trailing punctuation', () => {
    expect(normalizeAnswer('salama!')).toBe('salama')
  })
  it('applies NFC normalization', () => {
    const nfd = 'ã'
    const nfc = 'ã'
    expect(normalizeAnswer(nfd)).toBe(nfc)
  })
})

describe('shuffle', () => {
  it('returns same length', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffle(arr)).toHaveLength(5)
  })
  it('does not mutate original', () => {
    const arr = [1, 2, 3]
    shuffle(arr)
    expect(arr).toEqual([1, 2, 3])
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `pnpm test utils`
Expected: FAIL

- [ ] **Step 3: Create the module**

```typescript
// src/lib/exercises/utils.ts
export function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) =>
      i === 0 ? j : j === 0 ? i : 0
    )
  )
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
  return dp[a.length][b.length]
}

export function normalizeAnswer(s: string): string {
  return s.toLowerCase().trim().replace(/[.,!?;:]+$/g, '').normalize('NFC')
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `pnpm test utils`
Expected: all 10 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/lib/exercises/utils.ts src/lib/exercises/utils.test.ts
git commit -m "feat: add levenshtein, normalizeAnswer, and shuffle utilities"
```

---

### Task 3: Exercise Engine

**Files:**
- Create: `src/lib/exercises/engine.ts`
- Create: `src/lib/exercises/engine.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// src/lib/exercises/engine.test.ts
import { describe, it, expect } from 'vitest'
import { validateAnswer } from './engine'
import type { Exercise } from './types'

function makeExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    id: 'test-id',
    type: 'multiple_choice',
    lesson_id: 1,
    difficulty: 1,
    question: { type: 'multiple_choice', prompt: 'Test?', choices: ['salama', 'habari'] },
    correct_answer: 'salama',
    accepted_answers: ['salama', 'salama alekhum'],
    generated_by: 'human',
    is_approved: true,
    ...overrides,
  }
}

describe('validateAnswer', () => {
  it('exact match → score 100', () => {
    const result = validateAnswer('salama', makeExercise())
    expect(result.score).toBe(100)
    expect(result.correct).toBe(true)
  })
  it('case-insensitive exact match → score 100', () => {
    const result = validateAnswer('SALAMA', makeExercise())
    expect(result.score).toBe(100)
  })
  it('matches any accepted_answer → score 100', () => {
    const result = validateAnswer('salama alekhum', makeExercise())
    expect(result.score).toBe(100)
  })
  it('near-miss within levenshtein 2 → score 80', () => {
    const result = validateAnswer('salam', makeExercise())
    expect(result.score).toBe(80)
    expect(result.correct).toBe(true)
    expect(result.suggestion).toBe('salama')
  })
  it('wrong answer → score 0', () => {
    const result = validateAnswer('bonjour', makeExercise())
    expect(result.score).toBe(0)
    expect(result.correct).toBe(false)
  })
  it('result includes exercise_id', () => {
    const result = validateAnswer('salama', makeExercise({ id: 'abc' }))
    expect(result.exercise_id).toBe('abc')
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `pnpm test engine`
Expected: FAIL

- [ ] **Step 3: Create the engine**

```typescript
// src/lib/exercises/engine.ts
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Exercise, ExerciseResult } from './types'
import { levenshtein, normalizeAnswer, shuffle } from './utils'

export function validateAnswer(userAnswer: string, exercise: Exercise): ExerciseResult {
  const u = normalizeAnswer(userAnswer)

  if (exercise.accepted_answers.some((a) => normalizeAnswer(a) === u)) {
    return {
      exercise_id: exercise.id,
      vocabulary_id: exercise.vocabulary_id,
      correct: true,
      score: 100,
      time_ms: 0,
      user_answer: userAnswer,
    }
  }

  const close = exercise.accepted_answers.find((a) => levenshtein(normalizeAnswer(a), u) <= 2)
  if (close) {
    return {
      exercise_id: exercise.id,
      vocabulary_id: exercise.vocabulary_id,
      correct: true,
      score: 80,
      time_ms: 0,
      user_answer: userAnswer,
      suggestion: close,
    }
  }

  return {
    exercise_id: exercise.id,
    vocabulary_id: exercise.vocabulary_id,
    correct: false,
    score: 0,
    time_ms: 0,
    user_answer: userAnswer,
  }
}

export async function loadLessonExercises(
  supabase: SupabaseClient,
  lessonId: number,
  difficulty: 1 | 2 | 3 = 1,
  count = 10
): Promise<Exercise[]> {
  const { data } = await supabase
    .from('exercises')
    .select('*')
    .eq('lesson_id', lessonId)
    .eq('difficulty', difficulty)
    .eq('is_approved', true)
    .limit(count * 2)

  if (data && data.length >= count) {
    return shuffle(data).slice(0, count) as Exercise[]
  }

  return generateFallback(supabase, lessonId, count)
}

async function generateFallback(
  supabase: SupabaseClient,
  lessonId: number,
  count: number
): Promise<Exercise[]> {
  const { data: vocab } = await supabase
    .from('vocabulary')
    .select('*')
    .eq('lesson_id', lessonId)
    .limit(count * 2)

  if (!vocab?.length) return []

  return shuffle(vocab)
    .slice(0, count)
    .map((word) => buildQCM(word, vocab))
}

function buildQCM(word: Record<string, unknown>, pool: Record<string, unknown>[]): Exercise {
  const shimaore = (word['shimaoré'] as string[]) ?? [word['shimaoré'] as string]
  const distractors = pool
    .filter((w) => w['id'] !== word['id'])
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => ((w['shimaoré'] as string[]) ?? [w['shimaoré'] as string])[0])

  return {
    id: crypto.randomUUID(),
    type: 'multiple_choice',
    lesson_id: word['lesson_id'] as number,
    vocabulary_id: word['id'] as string,
    difficulty: 1,
    question: {
      type: 'multiple_choice',
      prompt: `Comment dit-on "${word['french']}" en shimaoré ?`,
      choices: shuffle([shimaore[0], ...distractors]),
    },
    correct_answer: shimaore[0],
    accepted_answers: shimaore,
    hint: `${shimaore[0].length} lettre${shimaore[0].length > 1 ? 's' : ''}`,
    generated_by: 'human',
    is_approved: true,
  }
}

export async function loadReviewSession(
  supabase: SupabaseClient,
  userId: string,
  count = 20
): Promise<Exercise[]> {
  const { data } = await supabase
    .from('user_vocabulary')
    .select('vocabulary(*)')
    .eq('user_id', userId)
    .neq('status', 'mastered')
    .lte('next_review_at', new Date().toISOString())
    .order('strength', { ascending: true })
    .limit(count)

  const words = (data?.map((w: Record<string, unknown>) => w['vocabulary']).filter(Boolean) ?? []) as Record<string, unknown>[]
  return words.map((w) => buildQCM(w, words))
}
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `pnpm test engine`
Expected: all 6 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/lib/exercises/engine.ts src/lib/exercises/engine.test.ts
git commit -m "feat: exercise engine with validateAnswer, loadLessonExercises, and QCM fallback"
```

---

### Task 4: Feedback Animation Component

**Files:**
- Create: `src/components/exercises/FeedbackAnimation.tsx`

- [ ] **Step 1: Create the component**

```typescript
// src/components/exercises/FeedbackAnimation.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface FeedbackAnimationProps {
  isCorrect: boolean
  score: number
  suggestion?: string
  correctAnswer: string
  onContinue: () => void
}

export function FeedbackAnimation({
  isCorrect,
  score,
  suggestion,
  correctAnswer,
  onContinue,
}: FeedbackAnimationProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-0 left-0 right-0 p-6 rounded-t-3xl shadow-2xl z-50"
        style={{ background: isCorrect ? '#22a722' : '#e84848' }}
      >
        {isCorrect ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <p className="text-white font-bold text-xl">
              {score === 100 ? '🎉 Ndjema kabisa! (Parfait!)' : '✅ Karibu sana! (Presque parfait!)'}
            </p>
            {suggestion && (
              <p className="text-white/80 text-sm mt-1">
                Forme exacte : <strong>{suggestion}</strong>
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            animate={{ x: [0, -12, 12, -8, 8, -4, 4, 0] }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-white font-bold text-xl">❌ Usikatishwe tamaa! (Ne te décourage pas!)</p>
            <p className="text-white/80 text-sm mt-1">
              La réponse était : <strong>{correctAnswer}</strong>
            </p>
          </motion.div>
        )}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl transition-colors"
        >
          Continuer →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/exercises/FeedbackAnimation.tsx
git commit -m "feat: visceral feedback animation component (Brilliant-style)"
```

---

### Task 5: Multiple Choice Exercise Component

**Files:**
- Create: `src/components/exercises/MultipleChoiceExercise.tsx`

- [ ] **Step 1: Create the component**

```typescript
// src/components/exercises/MultipleChoiceExercise.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Exercise, ExerciseResult } from '@/lib/exercises/types'
import { validateAnswer } from '@/lib/exercises/engine'
import { STAGGER_DELAY, FADE_DURATION, EASE_OUT } from '@/lib/animations/timings'

interface Props {
  exercise: Exercise
  onResult: (result: ExerciseResult) => void
}

export function MultipleChoiceExercise({ exercise, onResult }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  if (exercise.question.type !== 'multiple_choice') return null
  const { prompt, choices } = exercise.question

  function handleChoice(choice: string) {
    if (selected) return
    setSelected(choice)
    const result = validateAnswer(choice, exercise)
    setTimeout(() => onResult(result), 150)
  }

  return (
    <div className="space-y-6">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: FADE_DURATION.normal }}
        className="text-xl font-semibold text-center"
        style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}
      >
        {prompt}
      </motion.p>

      <div className="grid grid-cols-2 gap-3">
        {choices.map((choice, i) => {
          const isSelected = selected === choice
          const isCorrect = exercise.accepted_answers.includes(choice)
          const showResult = selected !== null

          let bg = 'var(--bg-light-2)'
          let border = 'rgba(0,0,0,0.1)'
          let color = 'var(--text-dark)'

          if (showResult && isSelected && isCorrect)  { bg = 'rgba(34,167,34,0.12)';  border = '#22a722'; color = '#22a722' }
          if (showResult && isSelected && !isCorrect) { bg = 'rgba(232,72,72,0.1)';   border = '#e84848'; color = '#e84848' }
          if (showResult && !isSelected && isCorrect) { bg = 'rgba(34,167,34,0.08)';  border = 'rgba(34,167,34,0.4)' }

          return (
            <motion.button
              key={choice}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: FADE_DURATION.fast, delay: i * STAGGER_DELAY.card, ease: EASE_OUT }}
              whileTap={selected ? {} : { scale: 0.97 }}
              onClick={() => handleChoice(choice)}
              disabled={!!selected}
              className="relative grain grain-light rounded-xl p-4 text-sm font-semibold text-left transition-colors"
              style={{ background: bg, border: `1.5px solid ${border}`, color }}
            >
              {choice}
            </motion.button>
          )
        })}
      </div>

      {exercise.hint && !selected && (
        <p className="text-center text-xs" style={{ color: 'var(--text-gray)', fontFamily: 'var(--font-mono)' }}>
          💡 {exercise.hint}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/exercises/MultipleChoiceExercise.tsx
git commit -m "feat: multiple choice exercise component with animated result states"
```

---

### Task 6: Exercises API Route

**Files:**
- Create: `src/app/api/exercises/[lessonId]/route.ts`

- [ ] **Step 1: Create the route handler**

```typescript
// src/app/api/exercises/[lessonId]/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { loadLessonExercises } from '@/lib/exercises/engine'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lessonId } = await params
  const id = Number(lessonId)

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid lessonId' }, { status: 400 })
  }

  const exercises = await loadLessonExercises(supabase, id)
  return NextResponse.json({ exercises })
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/exercises/\[lessonId\]/route.ts
git commit -m "feat: GET /api/exercises/[lessonId] returns approved or generated exercises"
```

---

### Task 7: Exercise Session Component

**Files:**
- Create: `src/components/exercises/ExerciseSession.tsx`

- [ ] **Step 1: Create the session state machine**

```typescript
// src/components/exercises/ExerciseSession.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { Exercise, ExerciseResult } from '@/lib/exercises/types'
import { MultipleChoiceExercise } from './MultipleChoiceExercise'
import { FeedbackAnimation } from './FeedbackAnimation'
import { FADE_DURATION } from '@/lib/animations/timings'

type SessionState = 'loading' | 'question' | 'feedback' | 'summary' | 'error'

interface Props {
  lessonId: number
}

export function ExerciseSession({ lessonId }: Props) {
  const router = useRouter()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [current, setCurrent] = useState(0)
  const [lastResult, setLastResult] = useState<ExerciseResult | null>(null)
  const [results, setResults] = useState<ExerciseResult[]>([])
  const [state, setState] = useState<SessionState>('loading')

  useEffect(() => {
    fetch(`/api/exercises/${lessonId}`)
      .then((r) => r.json())
      .then(({ exercises: ex }: { exercises: Exercise[] }) => {
        if (!ex?.length) {
          setState('error')
          return
        }
        setExercises(ex)
        setState('question')
      })
      .catch(() => setState('error'))
  }, [lessonId])

  function handleResult(result: ExerciseResult) {
    setLastResult(result)
    setResults((prev) => [...prev, result])
    setState('feedback')
  }

  function handleContinue() {
    if (current + 1 >= exercises.length) {
      setState('summary')
    } else {
      setCurrent((c) => c + 1)
      setLastResult(null)
      setState('question')
    }
  }

  const exercise = exercises[current]
  const score = results.length > 0
    ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length)
    : 0

  if (state === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-40">
        <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--accent-blue)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="text-center py-12 space-y-3">
        <p className="text-sm" style={{ color: 'var(--text-gray)' }}>
          Aucun exercice disponible pour cette leçon.
        </p>
        <button
          onClick={() => router.back()}
          className="text-sm font-medium"
          style={{ color: 'var(--accent-blue)' }}
        >
          ← Retour à la leçon
        </button>
      </div>
    )
  }

  if (state === 'summary') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: FADE_DURATION.normal }}
        className="text-center space-y-6 py-8"
      >
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl"
          style={{ background: score >= 80 ? 'rgba(34,167,34,0.12)' : 'rgba(232,72,72,0.1)' }}
        >
          {score >= 80 ? '🎉' : '💪'}
        </div>
        <div>
          <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-dark)' }}>
            {score}%
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-dark-gray)' }}>
            {results.filter((r) => r.correct).length} / {results.length} bonnes réponses
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push(`/learn/${lessonId}`)}
            className="px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--bg-light-2)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-dark)' }}
          >
            Retour à la leçon
          </button>
          <button
            onClick={() => { setCurrent(0); setResults([]); setLastResult(null); setState('question'); }}
            className="px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--accent-blue)', color: 'white' }}
          >
            Recommencer
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="mb-6 space-y-1">
        <div className="flex justify-between text-xs" style={{ color: 'var(--text-gray)', fontFamily: 'var(--font-mono)' }}>
          <span>EXERCICE {current + 1}/{exercises.length}</span>
          <span style={{ color: 'var(--accent-blue)' }}>
            {results.filter((r) => r.correct).length} ✓
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--accent-blue)' }}
            animate={{ width: `${((current) / exercises.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state === 'question' && exercise && (
          <motion.div
            key={`q-${current}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: FADE_DURATION.fast }}
          >
            {exercise.question.type === 'multiple_choice' && (
              <MultipleChoiceExercise exercise={exercise} onResult={handleResult} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {state === 'feedback' && lastResult && exercise && (
        <FeedbackAnimation
          isCorrect={lastResult.correct}
          score={lastResult.score}
          suggestion={lastResult.suggestion}
          correctAnswer={exercise.correct_answer}
          onContinue={handleContinue}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/exercises/ExerciseSession.tsx
git commit -m "feat: ExerciseSession state machine with progress bar and summary screen"
```

---

### Task 8: Practice Page

**Files:**
- Create: `src/app/(app)/learn/[lessonId]/practice/page.tsx`

- [ ] **Step 1: Create the page**

```typescript
// src/app/(app)/learn/[lessonId]/practice/page.tsx
import { notFound } from 'next/navigation'
import { getLessonById } from '@/lib/lessons/repository'
import { ExerciseSession } from '@/components/exercises/ExerciseSession'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ lessonId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId } = await params
  const lesson = getLessonById(Number(lessonId))
  if (!lesson) return {}
  return { title: `Exercices — ${lesson.title} — Luha` }
}

export default async function PracticePage({ params }: Props) {
  const { lessonId } = await params
  const id = Number(lessonId)
  const lesson = getLessonById(id)
  if (!lesson) notFound()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link
          href={`/learn/${id}`}
          className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: 'var(--text-dark-gray)' }}
        >
          <ArrowLeft size={13} />
          {lesson.title.replace(/^\d+\s*-\s*/, '')}
        </Link>
      </div>

      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(75,123,245,0.06)', border: '1px solid rgba(75,123,245,0.15)' }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
          style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}
        >
          Pratique
        </p>
        <h1
          className="text-2xl"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-dark)', letterSpacing: '0.04em' }}
        >
          {lesson.title.replace(/^\d+\s*-\s*/, '').toUpperCase()}
        </h1>
      </div>

      <ExerciseSession lessonId={id} />
    </div>
  )
}
```

- [ ] **Step 2: Add Practice button to LessonViewer**

In `src/components/learn/LessonViewer.tsx`, add a practice link below the navigation footer. Add after the navigation `motion.div`:

```typescript
{/* Practice CTA */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="text-center"
>
  <Link
    href={`/learn/${lesson.id}/practice`}
    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
    style={{ background: 'rgba(75,123,245,0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(75,123,245,0.2)' }}
  >
    ⚡ S'entraîner sur cette leçon
  </Link>
</motion.div>
```

- [ ] **Step 3: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add "src/app/(app)/learn/[lessonId]/practice/page.tsx" src/components/learn/LessonViewer.tsx
git commit -m "feat: add /learn/[lessonId]/practice page wired to ExerciseSession"
```
