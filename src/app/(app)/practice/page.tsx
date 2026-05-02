import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { loadReviewSession } from '@/lib/exercises/engine'
import ExerciseSession from '@/components/exercises/ExerciseSession'
import Link from 'next/link'

export default async function PracticePage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const exercises = await loadReviewSession(supabase, user.id)

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-dark)', letterSpacing: '0.04em' }}
        >
          RÉVISION
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-dark-gray)' }}>
          Mots à réviser selon ta progression
        </p>
      </div>

      {exercises.length === 0 ? (
        <div
          className="rounded-2xl p-10 text-center"
          style={{ background: 'var(--bg-light-2)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <p className="text-3xl mb-3">🎉</p>
          <p className="font-semibold text-base mb-1" style={{ color: 'var(--text-dark)' }}>
            Tout est à jour !
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-dark-gray)' }}>
            Aucun mot à réviser pour l&apos;instant. Continue à apprendre de nouvelles leçons.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--accent-blue)', color: 'white' }}
          >
            Voir les leçons
          </Link>
        </div>
      ) : (
        <ExerciseSession exercises={exercises} lessonId={0} />
      )}
    </div>
  )
}
