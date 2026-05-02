'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, CheckCircle2, ChevronRight } from 'lucide-react'
import type { Lesson } from '@/data/lessonData'
import { getLessonStatus, type LessonStatus } from '@/lib/lessons/progressionEngine'
import { STAGGER_DELAY, FADE_DURATION, EASE_OUT } from '@/lib/animations/timings'

// ─── Chapitres ────────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    id: 1,
    title: 'Premiers Pas',
    subtitle: 'Les bases de la communication',
    emoji: '🌱',
    color: '#22a722',
    bg: 'rgba(107,245,107,0.07)',
    border: 'rgba(34,167,34,0.2)',
    lessonIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    title: 'Grammaire Fondamentale',
    subtitle: 'Genre, pronoms et présent',
    emoji: '📐',
    color: 'var(--accent-blue)',
    bg: 'rgba(75,123,245,0.06)',
    border: 'rgba(75,123,245,0.2)',
    lessonIds: [5, 6, 7, 8, 9, 10],
  },
  {
    id: 3,
    title: 'Structure & Expression',
    subtitle: 'Adjectifs, accompli et verbes essentiels',
    emoji: '🏗️',
    color: '#C9840A',
    bg: 'rgba(245,225,53,0.07)',
    border: 'rgba(201,132,10,0.2)',
    lessonIds: [11, 12, 13, 14, 15, 16, 17, 18],
  },
  {
    id: 4,
    title: 'Vie Quotidienne',
    subtitle: 'Nombres, heure, lieux et questions',
    emoji: '🏪',
    color: 'var(--accent-red)',
    bg: 'rgba(232,72,72,0.05)',
    border: 'rgba(232,72,72,0.18)',
    lessonIds: [19, 20, 21, 22, 23, 24, 25, 26],
  },
  {
    id: 5,
    title: 'Maîtrise',
    subtitle: 'Tous les temps et formes avancées',
    emoji: '⚡',
    color: '#7C3AED',
    bg: 'rgba(168,85,247,0.06)',
    border: 'rgba(124,58,237,0.2)',
    lessonIds: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cleanTitle(title: string) {
  return title.replace(/^\d+\s*-\s*/, '')
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface LessonMapProps {
  lessons: Lesson[]
  completedIds: Set<number>
  userXP: number
  totalLessons: number
  completedCount: number
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function LessonMap({
  lessons,
  completedIds,
  userXP,
  totalLessons,
  completedCount,
}: LessonMapProps) {
  const lessonsById = new Map(lessons.map((l) => [l.id, l]))
  const globalProgress = Math.round((completedCount / totalLessons) * 100)

  return (
    <div className="space-y-10">

      {/* ─── Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ch-box ch-light grain grain-light relative rounded-2xl p-6 overflow-hidden"
        style={{ background: 'var(--bg-light-2)', border: '1px solid rgba(0,0,0,0.08)' }}
      >
        <span className="ch ch-tl" /><span className="ch ch-tr" />
        <span className="ch ch-bl" /><span className="ch ch-br" />

        {/* Tube déco */}
        <span
          className="tube tube-blue-pu absolute opacity-25 pointer-events-none"
          style={{ width: 260, top: -8, right: -20, transform: 'rotate(-6deg)' }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.12em] mb-1"
              style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-mono)' }}
            >
              Mon Parcours
            </p>
            <h1
              className="text-3xl sm:text-4xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-dark)', letterSpacing: '0.03em' }}
            >
              LEÇONS
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-dark-gray)' }}>
              {completedCount} sur {totalLessons} leçons terminées
            </p>
          </div>

          {/* Progression globale */}
          <div className="sm:w-48 space-y-1.5">
            <div
              className="flex justify-between text-[11px]"
              style={{ color: 'var(--text-gray)', fontFamily: 'var(--font-mono)' }}
            >
              <span>PROGRESSION</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{globalProgress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--accent-blue)' }}
                initial={{ width: 0 }}
                animate={{ width: `${globalProgress}%` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Chapitres ─── */}
      {CHAPTERS.map((chapter, chapterIndex) => {
        const chapterLessons = chapter.lessonIds
          .map((id) => lessonsById.get(id))
          .filter(Boolean) as Lesson[]

        const chapterCompleted = chapterLessons.filter((l) => completedIds.has(l.id)).length
        const chapterProgress = Math.round((chapterCompleted / chapterLessons.length) * 100)

        return (
          <motion.section
            key={chapter.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: FADE_DURATION.normal, delay: chapterIndex * STAGGER_DELAY.chapter }}
          >
            {/* Chapter header */}
            <div
              className="rounded-xl p-4 mb-4 flex items-center justify-between"
              style={{ background: chapter.bg, border: `1px solid ${chapter.border}` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{chapter.emoji}</span>
                <div>
                  <h2
                    className="text-base font-semibold leading-tight"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--text-dark)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {chapter.title.toUpperCase()}
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-dark-gray)' }}>
                    {chapter.subtitle}
                  </p>
                </div>
              </div>

              {/* Compteur + mini barre */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-xs font-bold tabular-nums"
                  style={{ color: chapter.color, fontFamily: 'var(--font-mono)' }}
                >
                  {chapterCompleted}/{chapterLessons.length}
                </span>
                <div
                  className="w-14 h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(0,0,0,0.1)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${chapterProgress}%`, background: chapter.color }}
                  />
                </div>
              </div>
            </div>

            {/* Grille de leçons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {chapterLessons.map((lesson, idx) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  status={getLessonStatus(lesson.id, completedIds, userXP)}
                  chapterColor={chapter.color}
                  animIndex={chapterIndex * 10 + idx}
                />
              ))}
            </div>
          </motion.section>
        )
      })}
    </div>
  )
}

// ─── LessonCard ───────────────────────────────────────────────────────────────

interface LessonCardProps {
  lesson: Lesson
  status: LessonStatus
  chapterColor: string
  animIndex: number
}

function LessonCard({ lesson, status, chapterColor, animIndex }: LessonCardProps) {
  const isLocked    = status === 'locked'
  const isCurrent   = status === 'current'
  const isCompleted = status === 'completed'

  const accentColor =
    isCompleted ? '#22a722' :
    isCurrent   ? chapterColor :
    isLocked    ? 'rgba(0,0,0,0.2)' :
                  chapterColor

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: FADE_DURATION.fast, delay: animIndex * STAGGER_DELAY.card, ease: EASE_OUT }}
      whileHover={isLocked ? {} : { y: -2, transition: { duration: 0.15 } }}
      className="relative grain grain-light rounded-xl p-4 flex items-start gap-3 overflow-hidden group"
      style={{
        background: isLocked ? 'rgba(0,0,0,0.03)' : 'var(--bg-light-2)',
        border: `1px solid ${isLocked ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.09)'}`,
        borderTop: `2.5px solid ${accentColor}`,
        opacity: isLocked ? 0.5 : 1,
        cursor: isLocked ? 'default' : 'pointer',
      }}
    >
      {/* Numéro / icône état */}
      <div
        className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
        style={{
          background: isLocked
            ? 'rgba(0,0,0,0.05)'
            : `color-mix(in srgb, ${accentColor} 12%, transparent)`,
          color: accentColor,
          fontFamily: 'var(--font-mono)',
        }}
      >
        {isCompleted ? (
          <CheckCircle2 size={16} />
        ) : isLocked ? (
          <Lock size={13} />
        ) : (
          String(lesson.id).padStart(2, '0')
        )}
      </div>

      {/* Texte */}
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-sm leading-snug"
          style={{ color: isLocked ? 'var(--text-gray)' : 'var(--text-dark)' }}
        >
          {cleanTitle(lesson.title)}
        </p>
        <p
          className="text-xs mt-0.5 line-clamp-2 leading-relaxed"
          style={{ color: 'var(--text-gray)' }}
        >
          {lesson.description}
        </p>
      </div>

      {/* Flèche hover */}
      {!isLocked && (
        <ChevronRight
          size={15}
          className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: accentColor }}
        />
      )}

      {/* Badge SUIVANTE */}
      {isCurrent && (
        <motion.span
          animate={{ opacity: [1, 0.55, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider"
          style={{ background: chapterColor, color: 'white', fontFamily: 'var(--font-mono)' }}
        >
          SUIVANTE
        </motion.span>
      )}
    </motion.div>
  )

  if (isLocked) return card
  return <Link href={`/learn/${lesson.id}`} className="block">{card}</Link>
}
