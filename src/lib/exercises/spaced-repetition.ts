import type { SupabaseClient } from '@supabase/supabase-js'

const INTERVALS = [1, 2, 4, 7, 14, 30] as const

type WordStatus = 'new' | 'learning' | 'reviewing' | 'mastered'

export function calculateNextReview(
  strength: number,
  score: number
): { newStrength: number; nextReviewAt: Date; newStatus: WordStatus } {
  let s = strength
  if (score === 0)   s = Math.max(0, s - 1)
  if (score === 100) s = Math.min(5, s + 1)

  const next = new Date()
  next.setDate(next.getDate() + INTERVALS[s])

  const newStatus: WordStatus =
    s >= 5 ? 'mastered' :
    s >= 3 ? 'reviewing' :
    s >= 1 ? 'learning' :
             'new'

  return { newStrength: s, nextReviewAt: next, newStatus }
}

export async function updateWordAfterAnswer(
  supabase: SupabaseClient,
  userId: string,
  vocabularyId: string,
  score: number
): Promise<void> {
  const { data: ex } = await supabase
    .from('user_vocabulary')
    .select('strength, mistake_count, correct_count')
    .eq('user_id', userId)
    .eq('vocabulary_id', vocabularyId)
    .single()

  const { newStrength, nextReviewAt, newStatus } = calculateNextReview(ex?.strength ?? 0, score)

  await supabase.from('user_vocabulary').upsert(
    {
      user_id: userId,
      vocabulary_id: vocabularyId,
      strength: newStrength,
      status: newStatus,
      next_review_at: nextReviewAt.toISOString(),
      last_reviewed_at: new Date().toISOString(),
      mistake_count: score === 0 ? (ex?.mistake_count ?? 0) + 1 : (ex?.mistake_count ?? 0),
      correct_count: score > 0  ? (ex?.correct_count ?? 0) + 1  : (ex?.correct_count ?? 0),
    },
    { onConflict: 'user_id,vocabulary_id' }
  )
}
