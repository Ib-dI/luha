'use client'

import { motion } from 'framer-motion'
import type { ExerciseResult } from '@/lib/exercises/types'

interface FeedbackAnimationProps {
  result: ExerciseResult
  xpGained: number
  correctAnswerLabel: string
  onContinue: () => void
}

export default function FeedbackAnimation({ result, xpGained, correctAnswerLabel, onContinue }: FeedbackAnimationProps) {
  const isCorrect = result.correct

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ background: isCorrect ? 'var(--accent-green)' : 'var(--accent-red)' }}
    >
      <div className="max-w-2xl mx-auto p-4 flex items-center justify-between gap-4">
        <div>
          <p className="font-bold text-white text-base">
            {isCorrect
              ? xpGained > 0
                ? `Bonne réponse ! +${xpGained} XP`
                : 'Bonne réponse !'
              : `Oops ! La réponse était : ${correctAnswerLabel}`}
          </p>
          {!isCorrect && (
            <p className="text-sm text-white/80 mt-0.5">
              Ta réponse : {result.userAnswer}
            </p>
          )}
        </div>

        <button
          onClick={onContinue}
          className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{
            background: 'white',
            color: isCorrect ? 'var(--accent-green)' : 'var(--accent-red)',
          }}
        >
          Continuer →
        </button>
      </div>
    </motion.div>
  )
}
