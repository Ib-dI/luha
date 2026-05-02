import type { SupabaseClient } from '@supabase/supabase-js'
import type { Exercise, ExerciseResult } from './types'
import { scoreAnswer, shuffle } from './utils'
import { lessons } from '@/data/lessonData'
import translationsRaw from '@/data/structured_translations.json'

// structured_translations.json shape: { [french: string]: string[] }
const translations = translationsRaw as Record<string, string[]>

// Flat array of { french, shimaoré } pairs for easy sampling
const translationEntries: { french: string; shimaoré: string[] }[] = Object.entries(
  translations
).map(([french, variants]) => ({ french, shimaoré: variants }))

// ---------------------------------------------------------------------------
// validateAnswer — pure function, no side-effects
// ---------------------------------------------------------------------------
export function validateAnswer(exercise: Exercise, userAnswer: string): ExerciseResult {
  const q = exercise.question

  switch (q.type) {
    case 'qcm': {
      const correctChoice = q.choices[q.correct]
      const correct = correctChoice === userAnswer
      return {
        exerciseId: exercise.id,
        correct,
        score: correct ? 100 : 0,
        userAnswer,
        correctAnswer: correctChoice,
      }
    }

    case 'fill': {
      const score = scoreAnswer(userAnswer, q.blank)
      return {
        exerciseId: exercise.id,
        correct: score >= 80,
        score,
        userAnswer,
        correctAnswer: q.blank,
      }
    }

    case 'translation': {
      const score = scoreAnswer(userAnswer, q.source)
      return {
        exerciseId: exercise.id,
        correct: score >= 80,
        score,
        userAnswer,
        correctAnswer: q.source,
      }
    }

    case 'matching': {
      let parsed: Array<{ fr: string; sh: string }>
      try {
        parsed = JSON.parse(userAnswer) as Array<{ fr: string; sh: string }>
      } catch {
        return {
          exerciseId: exercise.id,
          correct: false,
          score: 0,
          userAnswer,
          correctAnswer: JSON.stringify(q.pairs),
        }
      }

      const totalPairs = q.pairs.length
      if (totalPairs === 0) {
        return {
          exerciseId: exercise.id,
          correct: true,
          score: 100,
          userAnswer,
          correctAnswer: JSON.stringify(q.pairs),
        }
      }

      // Build a lookup map from the correct pairs
      const pairMap = new Map<string, string>(q.pairs.map((p) => [p.fr, p.sh]))
      let correctCount = 0
      for (const userPair of parsed) {
        if (pairMap.get(userPair.fr) === userPair.sh) correctCount++
      }

      const score = Math.round((correctCount / totalPairs) * 100)
      return {
        exerciseId: exercise.id,
        correct: score === 100,
        score,
        userAnswer,
        correctAnswer: JSON.stringify(q.pairs),
      }
    }

    default: {
      // Exhaustive check — TypeScript will error here if a new type is added
      const _exhaustive: never = q
      void _exhaustive
      return {
        exerciseId: exercise.id,
        correct: false,
        score: 0,
        userAnswer,
        correctAnswer: '',
      }
    }
  }
}

// ---------------------------------------------------------------------------
// generateFallbackQCM — build QCM exercises from static vocabulary
// ---------------------------------------------------------------------------
export function generateFallbackQCM(lessonId: number, count = 5): Exercise[] {
  // Verify lesson exists (silently proceed even if not found)
  const _lesson = lessons.find((l) => l.id === lessonId)
  void _lesson

  const entries = [...translationEntries]
  if (entries.length === 0) return []

  // We need at least 4 entries to form a QCM (1 correct + 3 distractors)
  const available = entries.slice(0, Math.max(count * 4, 20))
  const actualCount = Math.min(count, available.length)

  const exercises: Exercise[] = []

  for (let i = 0; i < actualCount; i++) {
    const correctEntry = available[i % available.length]

    // Pick 3 distractors: entries that are NOT the correct one
    const distractorPool = available.filter((_, idx) => idx !== i % available.length)
    // Shuffle distractors, take first 3
    const distractors = shuffle([...distractorPool]).slice(0, 3)

    const correctAnswer = correctEntry.shimaoré[0] ?? ''
    const distractorAnswers = distractors.map((d) => d.shimaoré[0] ?? '')

    // Build choices array and shuffle it; track correct index after shuffle
    const allChoices = [correctAnswer, ...distractorAnswers]
    const shuffledChoices = shuffle(allChoices)
    const correctIndex = shuffledChoices.indexOf(correctAnswer)

    exercises.push({
      id: `fallback-${lessonId}-${i}`,
      lessonId,
      is_approved: false,
      question: {
        type: 'qcm',
        question: `Comment dit-on "${correctEntry.french}" en shimaoré ?`,
        choices: shuffledChoices,
        correct: correctIndex,
      },
    })
  }

  return exercises
}

// ---------------------------------------------------------------------------
// loadLessonExercises — load from Supabase, supplement with fallback if needed
// ---------------------------------------------------------------------------
export async function loadLessonExercises(
  supabase: SupabaseClient,
  lessonId: number
): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('lesson_id', lessonId)
    .eq('is_approved', true)
    .limit(10)

  const dbRows = error || !data ? [] : data

  // Map DB rows to Exercise shape
  const dbExercises: Exercise[] = dbRows.map((row: Record<string, unknown>) => ({
    id: String(row.id),
    lessonId: Number(row.lesson_id),
    vocabularyId: row.vocabulary_id != null ? Number(row.vocabulary_id) : undefined,
    question: row.question as Exercise['question'],
    is_approved: Boolean(row.is_approved),
  }))

  if (dbExercises.length >= 5) {
    return shuffle(dbExercises)
  }

  const needed = 5 - dbExercises.length
  const fallback = generateFallbackQCM(lessonId, needed)

  return [...dbExercises, ...fallback]
}

// ---------------------------------------------------------------------------
// loadReviewSession — fetch words due for review, build translation exercises
// ---------------------------------------------------------------------------
export async function loadReviewSession(
  supabase: SupabaseClient,
  userId: string,
  limit = 10
): Promise<Exercise[]> {
  const { data: wordProgressRows, error: wpError } = await supabase
    .from('word_progress')
    .select('vocabulary_id, next_review_at')
    .eq('user_id', userId)
    .lte('next_review_at', new Date().toISOString())
    .order('next_review_at')
    .limit(limit)

  if (wpError || !wordProgressRows) return []

  const exercises: Exercise[] = []

  for (const row of wordProgressRows) {
    const vocabId = row.vocabulary_id as number | string

    // Select only 'french' to avoid TS parser issues with the accented 'shimaoré' column name
    const { data: vocabRaw, error: vocabError } = await supabase
      .from('vocabulary')
      .select('french')
      .eq('id', vocabId)
      .single()

    if (vocabError || !vocabRaw) continue

    const vocab = vocabRaw as Record<string, unknown>
    const french = String(vocab['french'] ?? '')

    exercises.push({
      id: `review-${vocabId}`,
      lessonId: 0,
      vocabularyId: Number(vocabId),
      is_approved: true,
      question: {
        type: 'translation',
        source: french,
        direction: 'fr_to_sh',
      },
    })
  }

  return exercises
}
