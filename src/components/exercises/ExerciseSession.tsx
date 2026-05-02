'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Exercise, ExerciseResult } from '@/lib/exercises/types'
import { validateAnswer } from '@/lib/exercises/engine'
import { XP_REWARDS } from '@/lib/gamification/xp'
import MultipleChoiceExercise from './MultipleChoiceExercise'
import FeedbackAnimation from './FeedbackAnimation'

interface ExerciseSessionProps {
  exercises: Exercise[]
  lessonId: number
  onComplete?: (score: number) => void
}

type Phase = 'question' | 'feedback' | 'complete'

function getCorrectAnswerLabel(exercise: Exercise): string {
  const q = exercise.question
  switch (q.type) {
    case 'qcm':
      return q.choices[q.correct] ?? ''
    case 'fill':
      return q.blank
    case 'translation':
      return q.source
    case 'matching':
      return q.pairs.map((p) => `${p.fr} → ${p.sh}`).join(', ')
  }
}

export default function ExerciseSession({ exercises, lessonId, onComplete }: ExerciseSessionProps) {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<Phase>(exercises.length === 0 ? 'complete' : 'question')
  const [results, setResults] = useState<ExerciseResult[]>([])
  const [xpGained, setXpGained] = useState(0)
  const [lastResult, setLastResult] = useState<ExerciseResult | null>(null)

  const totalExercises = exercises.length
  const correctCount = results.filter((r) => r.correct).length

  function handleAnswer(userAnswer: string) {
    const exercise = exercises[current]
    if (!exercise) return

    const result = validateAnswer(exercise, userAnswer)
    const earnedXp = result.correct ? XP_REWARDS.exercise_correct_100 : 0

    setResults((prev) => [...prev, result])
    setXpGained((prev) => prev + earnedXp)
    setLastResult(result)
    setPhase('feedback')
  }

  function advance() {
    const nextIndex = current + 1
    if (nextIndex < totalExercises) {
      setCurrent(nextIndex)
      setPhase('question')
      setLastResult(null)
    } else {
      setPhase('complete')
      onComplete?.(correctCount)
    }
  }

  // Completion screen
  if (phase === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div
          className="rounded-2xl p-8 w-full max-w-sm shadow-sm"
          style={{ background: 'var(--bg-light-2)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <p className="text-3xl mb-4">🎉</p>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-display)' }}
          >
            Session terminée !
          </h2>

          <p
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--text-dark)' }}
          >
            {correctCount} / {totalExercises} bonnes réponses
          </p>

          {xpGained > 0 && (
            <p
              className="text-base font-medium mb-6"
              style={{ color: 'var(--accent-green)' }}
            >
              +{xpGained} XP gagnés
            </p>
          )}

          <Link
            href={`/learn/${lessonId}`}
            className="inline-block mt-4 px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent-blue)', color: 'white' }}
          >
            Retour à la leçon
          </Link>
        </div>
      </div>
    )
  }

  const exercise = exercises[current]
  if (!exercise) return null

  return (
    <div className="relative">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        {exercises.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all"
            style={{
              background: i < current
                ? 'var(--accent-green)'
                : i === current
                  ? 'var(--accent-blue)'
                  : 'var(--bg-light-2)',
            }}
          />
        ))}
      </div>

      {/* Exercise */}
      {phase === 'question' && (
        exercise.question.type === 'qcm' ? (
          <MultipleChoiceExercise
            exercise={exercise}
            onAnswer={handleAnswer}
          />
        ) : (
          <div className="text-sm text-center py-8" style={{ color: 'var(--text-dark-gray)' }}>
            Type d&apos;exercice non supporté.{' '}
            <button onClick={() => advance()} className="underline">Passer</button>
          </div>
        )
      )}

      {/* Feedback overlay */}
      {phase === 'feedback' && lastResult && (
        <FeedbackAnimation
          result={lastResult}
          xpGained={lastResult.correct ? XP_REWARDS.exercise_correct_100 : 0}
          correctAnswerLabel={getCorrectAnswerLabel(exercise)}
          onContinue={advance}
        />
      )}
    </div>
  )
}
