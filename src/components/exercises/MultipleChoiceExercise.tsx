'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/animations/timings'
import type { Exercise } from '@/lib/exercises/types'

interface MultipleChoiceExerciseProps {
  exercise: Exercise
  onAnswer: (userAnswer: string) => void
  disabled?: boolean
}

export default function MultipleChoiceExercise({ exercise, onAnswer, disabled = false }: MultipleChoiceExerciseProps) {
  const [answered, setAnswered] = useState(false)

  if (exercise.question.type !== 'qcm') return null

  const { question, choices } = exercise.question

  function handleChoice(choice: string) {
    if (answered || disabled) return
    setAnswered(true)
    onAnswer(choice)
  }

  return (
    <div className="space-y-5">
      <motion.p
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="text-xl sm:text-2xl font-medium text-center"
        style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}
      >
        {question}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {choices.map((choice, i) => (
          <motion.button
            key={choice}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05, ease: EASE_OUT }}
            whileTap={answered || disabled ? {} : { scale: 0.98 }}
            onClick={() => handleChoice(choice)}
            disabled={answered || disabled}
            className="w-full px-4 py-3.5 rounded-xl text-sm font-medium text-left transition-opacity disabled:opacity-60"
            style={{
              background: 'var(--bg-light-2)',
              color: 'var(--text-dark)',
              border: '1px solid rgba(0,0,0,0.08)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {choice}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
