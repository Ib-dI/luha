'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface Props {
  lessonId: number
  nextLessonId: number | null
}

interface ProgressResult {
  xpGained: number
  streak: number
  alreadyCompleted: boolean
}

export default function LessonCompleteButton({ lessonId, nextLessonId }: Props) {
  const router = useRouter()
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  const [result, setResult] = useState<ProgressResult | null>(null)

  async function handleComplete() {
    if (state !== 'idle') return
    setState('loading')

    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'complete_lesson', lessonId }),
    })
    const data: ProgressResult = await res.json()
    setResult(data)
    setState('done')

    setTimeout(() => {
      if (nextLessonId) {
        router.push(`/learn/${nextLessonId}`)
      } else {
        router.push('/learn')
      }
      router.refresh()
    }, 2000)
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleComplete}
        disabled={state !== 'idle'}
        whileTap={{ scale: 0.97 }}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-60"
        style={{ background: 'var(--accent-blue)', color: 'white' }}
      >
        {state === 'loading' ? (
          <Loader2 size={14} className="animate-spin" />
        ) : state === 'done' ? (
          <CheckCircle2 size={14} />
        ) : null}
        {state === 'done'
          ? nextLessonId
            ? 'Leçon suivante →'
            : 'Parcours terminé !'
          : 'Terminer la leçon'}
      </motion.button>

      <AnimatePresence>
        {state === 'done' && result && !result.alreadyCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: -44, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
            style={{ background: '#22a722', color: 'white', fontFamily: 'var(--font-mono)' }}
          >
            +{result.xpGained} XP ⚡
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
