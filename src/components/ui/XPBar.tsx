'use client'

import { motion } from 'framer-motion'

const XP_PER_LEVEL = 500

interface XPBarProps {
  xp: number
  level: number
}

export default function XPBar({ xp, level }: XPBarProps) {
  const xpInLevel = xp % XP_PER_LEVEL
  const progress = Math.min((xpInLevel / XP_PER_LEVEL) * 100, 100)

  return (
    <div
      className="w-full flex items-center gap-3 px-4 py-1.5"
      style={{
        background: 'var(--bg-light-2)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Niveau */}
      <span
        className="text-[10px] font-bold uppercase tracking-widest shrink-0"
        style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}
      >
        NIV.{level}
      </span>

      {/* Barre */}
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.08)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--accent-blue)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* XP */}
      <span
        className="text-[10px] shrink-0 tabular-nums"
        style={{ color: 'var(--text-gray)', fontFamily: 'var(--font-mono)' }}
      >
        {xpInLevel}
        <span style={{ color: 'rgba(0,0,0,0.2)' }}>/{XP_PER_LEVEL}</span>
      </span>
    </div>
  )
}
