'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleComplete() {
    if (state !== 'idle') return
    setState('loading')
    setErrorMsg(null)

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      })

      if (!res.ok) {
        throw new Error(`Erreur serveur (${res.status})`)
      }

      const data: ProgressResult = await res.json()
      setResult(data)
      setState('done')

      setTimeout(() => {
        if (nextLessonId) {
          router.push(`/learn/${nextLessonId}`)
        } else {
          router.push('/learn')
        }
      }, 2000)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue')
      setState('idle')
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleComplete}
        disabled={state === 'loading' || state === 'done'}
        whileTap={{ scale: 0.97 }}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-60"
        style={{ background: 'var(--accent-blue)', color: 'white' }}
      >
        {state === 'loading' ? (
          <Loader2 size={14} className="animate-spin" />
        ) : state === 'done' ? (
          <CheckCircle2 size={14} />
        ) : errorMsg ? (
          <XCircle size={14} />
        ) : null}
        {state === 'done'
          ? nextLessonId
            ? 'Leçon suivante →'
            : 'Parcours terminé !'
          : errorMsg
            ? 'Réessayer'
            : 'Terminer la leçon'}
      </motion.button>

      <AnimatePresence>
        {errorMsg && state === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: -44 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
            style={{ background: '#dc2626', color: 'white', fontFamily: 'var(--font-mono)' }}
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state === 'done' && result && !result.alreadyCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: -44, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
            style={{ background: 'var(--accent-green)', color: 'white', fontFamily: 'var(--font-mono)' }}
          >
            +{result.xpGained} XP ⚡
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
