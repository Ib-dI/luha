'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'
import type { Lesson, LessonContent } from '@/data/lessonData'
import { STAGGER_DELAY, FADE_DURATION, EASE_OUT } from '@/lib/animations/timings'
import LessonCompleteButton from './LessonCompleteButton'

interface LessonViewerProps {
  lesson: Lesson
  prevLesson: Lesson | null
  nextLesson: Lesson | null
}

export default function LessonViewer({ lesson, prevLesson, nextLesson }: LessonViewerProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* ─── Breadcrumb ─── */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 text-sm"
      >
        <Link
          href="/learn"
          className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: 'var(--text-dark-gray)' }}
        >
          <ArrowLeft size={13} />
          Leçons
        </Link>
        <span style={{ color: 'rgba(0,0,0,0.2)' }}>/</span>
        <span className="font-medium" style={{ color: 'var(--text-dark)' }}>{lesson.title}</span>
      </motion.div>

      {/* ─── Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="ch-box ch-light grain grain-light relative rounded-2xl p-6 overflow-hidden"
        style={{ background: 'var(--bg-light-2)', border: '1px solid rgba(0,0,0,0.08)' }}
      >
        <span className="ch ch-tl" /><span className="ch ch-tr" />

        <span
          className="tube tube-cyan absolute opacity-20 pointer-events-none"
          style={{ width: 180, bottom: -4, right: -10, transform: 'rotate(5deg)' }}
        />

        <div className="relative z-10 flex items-start gap-4">
          <div
            className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(75,123,245,0.1)' }}
          >
            <BookOpen size={20} style={{ color: 'var(--accent-blue)' }} />
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.12em] mb-0.5"
              style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-mono)' }}
            >
              Leçon {lesson.id}
            </p>
            <h1
              className="text-2xl sm:text-3xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-dark)', letterSpacing: '0.04em' }}
            >
              {lesson.title.replace(/^\d+\s*-\s*/, '').toUpperCase()}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-dark-gray)' }}>
              {lesson.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── Contenu ─── */}
      <div className="space-y-4">
        {lesson.content.map((block, i) => (
          <ContentBlock key={i} block={block} index={i} />
        ))}
      </div>

      {/* ─── Navigation ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-between gap-3 pt-4 border-t"
        style={{ borderColor: 'rgba(0,0,0,0.08)' }}
      >
        {prevLesson ? (
          <Link href={`/learn/${prevLesson.id}`} className="flex-1">
            <motion.div
              whileHover={{ x: -2 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: 'var(--bg-light-2)',
                border: '1px solid rgba(0,0,0,0.08)',
                color: 'var(--text-dark-gray)',
              }}
            >
              <ArrowLeft size={13} />
              <span className="truncate">{prevLesson.title.replace(/^\d+\s*-\s*/, '')}</span>
            </motion.div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        <LessonCompleteButton
          lessonId={lesson.id}
          nextLessonId={nextLesson?.id ?? null}
        />
      </motion.div>

      {/* ─── Practice CTA ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Link
          href={`/learn/${lesson.id}/practice`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: 'rgba(75,123,245,0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(75,123,245,0.2)' }}
        >
          ⚡ S'entraîner sur cette leçon
        </Link>
      </motion.div>
    </div>
  )
}

// ─── Blocs de contenu ─────────────────────────────────────────────────────────

function ContentBlock({ block, index }: { block: LessonContent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: FADE_DURATION.fast, delay: 0.1 + index * STAGGER_DELAY.section, ease: EASE_OUT }}
    >
      {block.type === 'table' ? (
        <TableBlock header={block.value.header} rows={block.value.rows} />
      ) : (
        <TextBlock text={block.value} />
      )}
    </motion.div>
  )
}

function TextBlock({ text }: { text: string }) {
  const isTitle = /^\d+\.\s+[A-ZÀÂÉÈÊËÎÏÔÙÛÜ\s':().-]+$/.test(text.trim())

  if (isTitle) {
    return (
      <div className="flex items-center gap-3 py-1 my-2">
        <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,0.1)' }} />
        <p
          className="text-[10px] font-bold uppercase tracking-[0.12em] shrink-0"
          style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}
        >
          {text.trim()}
        </p>
        <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,0.1)' }} />
      </div>
    )
  }

  return (
    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dark-gray)' }}>
      {text}
    </p>
  )
}

function TableBlock({ header, rows }: { header: string[]; rows: string[][] }) {
  const hasHeader = header && header.length > 0

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid rgba(0,0,0,0.08)' }}
    >
      <table className="w-full text-sm">
        {hasHeader && (
          <thead>
            <tr style={{ background: 'rgba(75,123,245,0.07)' }}>
              {header.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => {
            if (!row || row.length === 0) return null
            return (
              <tr
                key={ri}
                className="border-t transition-colors hover:bg-black/[0.02]"
                style={{ borderColor: 'rgba(0,0,0,0.06)' }}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-3 text-[13px]"
                    style={{
                      color: ci % 2 === 0 ? 'var(--text-dark)' : 'var(--text-dark-gray)',
                      fontFamily: ci % 2 === 0 ? 'var(--font-mono)' : 'var(--font-body)',
                      fontWeight: ci % 2 === 0 ? 500 : 400,
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
