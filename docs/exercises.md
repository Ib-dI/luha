# Exercises — Engine & Philosophie Brilliant — Luha

## Philosophie (Brilliant.org)
> "Tu tombes dans le gouffre et tu meurs. C'est un feedback que tu ressens."

- Chaque leçon = **interaction**, jamais un texte à lire
- Feedback **viscéral** : animation avant explication (Framer Motion)
- Exercices pré-générés par Mistral, **validés humainement** (`is_approved`)
- Courbe de difficulté : `difficulty: 1 → 2 → 3` dans chaque session

## Types d'Exercices (8)

| Type | Structure question | Exemple shimaoré |
|---|---|---|
| `multiple_choice` | `{ prompt, choices[4] }` | Choisir traduction de "bonjour" |
| `drag_drop` | `{ sentence_template, word_bank[4] }` | Compléter "Jeje = ___ !" |
| `word_builder` | `{ components[], instruction }` | U + ENDRA = uendra |
| `fill_gap` | `{ sentence, blank_position }` | "Haɓari za ___ ?" |
| `match_pairs` | `{ pairs[4] }` | Relier FR ↔ Shimaoré |
| `sentence_scramble` | `{ words[], instruction }` | Remettre une phrase en ordre |
| `audio_match` | `{ audio_url, choices[4] }` | Identifier le mot entendu |
| `tap_select` | `{ prompt, word_grid[10-12] }` | Trouver toutes les salutations |

## Types TypeScript

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
  accepted_answers: string[]  // TOUTES les variantes valides
  hint?: string
  generated_by: 'human' | 'ai'
  is_approved: boolean
}

export interface ExerciseResult {
  exercise_id: string
  vocabulary_id?: string
  correct: boolean
  score: 0 | 80 | 100   // 80 = approchant (Levenshtein ≤ 2)
  time_ms: number
  user_answer: string
  suggestion?: string   // forme exacte si score = 80
}
```

## Engine

```typescript
// src/lib/exercises/engine.ts
import { supabase } from '@/lib/supabase'
import { Exercise, ExerciseResult } from './types'
import { levenshtein } from './utils'

// Charger depuis DB (priorité exercices pré-approuvés)
export async function loadLessonExercises(
  lessonId: number, difficulty: 1|2|3 = 1, count = 10
): Promise<Exercise[]> {
  const { data } = await supabase
    .from('exercises').select('*')
    .eq('lesson_id', lessonId).eq('difficulty', difficulty)
    .eq('is_approved', true).limit(count * 2)

  if (data && data.length >= count) return shuffle(data).slice(0, count) as Exercise[]
  return generateFallback(lessonId, count)
}

// Fallback runtime (si DB insuffisante)
async function generateFallback(lessonId: number, count: number): Promise<Exercise[]> {
  const { data: vocab } = await supabase
    .from('vocabulary').select('*').eq('lesson_id', lessonId).limit(count * 2)
  if (!vocab?.length) return []
  return shuffle(vocab).slice(0, count).map(w => buildQCM(w, vocab))
}

function buildQCM(word: any, pool: any[]): Exercise {
  const distractors = pool.filter(w => w.id !== word.id)
    .sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.shimaoré[0])
  return {
    id: crypto.randomUUID(), type: 'multiple_choice',
    lesson_id: word.lesson_id, vocabulary_id: word.id, difficulty: 1,
    question: { type: 'multiple_choice',
      prompt: `Comment dit-on "${word.french}" en shimaoré ?`,
      choices: shuffle([word.shimaoré[0], ...distractors]) },
    correct_answer: word.shimaoré[0],
    accepted_answers: word.shimaoré,
    hint: `${word.shimaoré[0].length} lettres`,
    generated_by: 'human', is_approved: true,
  }
}

// Validation réponse
export function validateAnswer(userAnswer: string, exercise: Exercise): ExerciseResult {
  const norm = (s: string) => s.toLowerCase().trim().replace(/[.,!?;:]/g, '').normalize('NFC')
  const u = norm(userAnswer)

  if (exercise.accepted_answers.some(a => norm(a) === u))
    return { exercise_id: exercise.id, vocabulary_id: exercise.vocabulary_id,
      correct: true, score: 100, time_ms: 0, user_answer: userAnswer }

  const close = exercise.accepted_answers.find(a => levenshtein(norm(a), u) <= 2)
  if (close)
    return { exercise_id: exercise.id, vocabulary_id: exercise.vocabulary_id,
      correct: true, score: 80, time_ms: 0, user_answer: userAnswer, suggestion: close }

  return { exercise_id: exercise.id, vocabulary_id: exercise.vocabulary_id,
    correct: false, score: 0, time_ms: 0, user_answer: userAnswer }
}

// Session de révision (spaced repetition)
export async function loadReviewSession(userId: string, count = 20): Promise<Exercise[]> {
  const { data } = await supabase
    .from('user_vocabulary').select('vocabulary(*)')
    .eq('user_id', userId).neq('status', 'mastered')
    .lte('next_review_at', new Date().toISOString())
    .order('strength', { ascending: true }).limit(count)
  const words = data?.map((w: any) => w.vocabulary).filter(Boolean) ?? []
  return words.map(w => buildQCM(w, words))
}

function shuffle<T>(a: T[]): T[] {
  const arr = [...a]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
```

## Levenshtein

```typescript
// src/lib/exercises/utils.ts
export function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0))
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
  return dp[a.length][b.length]
}
```

## Feedback Animé (Framer Motion — OBLIGATOIRE)

```typescript
// src/components/exercises/FeedbackAnimation.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'

export function FeedbackAnimation({ isCorrect, score, suggestion, correctAnswer, onContinue }:
  { isCorrect: boolean; score: number; suggestion?: string; correctAnswer: string; onContinue: () => void }
) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.25 }}
        className={`fixed bottom-0 left-0 right-0 p-6 rounded-t-3xl shadow-2xl z-50
          ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
      >
        {isCorrect ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
            <p className="text-white font-bold text-xl">
              {score === 100 ? '🎉 Ndjema kabisa! (Parfait!)' : '✅ Karibu sana! (Presque parfait!)'}
            </p>
            {suggestion && <p className="text-white/80 text-sm mt-1">Forme exacte : <strong>{suggestion}</strong></p>}
          </motion.div>
        ) : (
          // Vibration "fall into the pit" — style Brilliant
          <motion.div animate={{ x: [0, -12, 12, -8, 8, -4, 4, 0] }} transition={{ duration: 0.4 }}>
            <p className="text-white font-bold text-xl">❌ Usikatishwe tamaa! (Ne te décourage pas!)</p>
            <p className="text-white/80 text-sm mt-1">La réponse était : <strong>{correctAnswer}</strong></p>
          </motion.div>
        )}
        <motion.button whileTap={{ scale: 0.95 }} onClick={onContinue}
          className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-xl">
          Continuer →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
```
