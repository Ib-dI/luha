export type ExerciseType = 'qcm' | 'fill' | 'translation' | 'matching'

export type QuestionData =
  | { type: 'qcm'; question: string; choices: string[]; correct: number }
  | { type: 'fill'; sentence: string; blank: string }
  | { type: 'translation'; source: string; direction: 'fr_to_sh' | 'sh_to_fr' }
  | { type: 'matching'; pairs: Array<{ fr: string; sh: string }> }

export interface Exercise {
  id: string
  lessonId: number
  vocabularyId?: number
  question: QuestionData
  is_approved: boolean
}

export interface ExerciseResult {
  exerciseId: string
  correct: boolean
  score: number       // 0–100
  userAnswer: string
  correctAnswer: string
  timeTakenMs?: number
}
