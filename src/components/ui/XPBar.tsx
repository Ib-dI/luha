'use client'

import { motion } from 'framer-motion'
import { getXPProgress } from '@/lib/gamification/xp'

interface XPBarProps {
  xp: number
  level: number
}

export default function XPBar({ xp, level }: XPBarProps) {
  const { current, required, percent } = getXPProgress(xp)

  return (
    <div
      className="w-full flex items-center gap-3 px-5 py-1.5"
      style={{
        background: 'var(--bg-light-2)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <span
        className="text-[11px] font-bold uppercase tracking-widest shrink-0"
        style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}
      >
        NIV.{level}
      </span>

      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.08)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--accent-blue)' }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        />
      </div>

      <span
        className="text-[11px] shrink-0 tabular-nums"
        style={{ color: 'var(--text-gray)', fontFamily: 'var(--font-mono)' }}
      >
        {current}
        <span style={{ color: 'rgba(0,0,0,0.2)' }}>/{required}</span>
      </span>
    </div>
  )
}
