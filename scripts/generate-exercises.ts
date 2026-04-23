import { Mistral } from '@mistralai/mistralai'
import { createClient } from '@supabase/supabase-js'

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY! })
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const SYSTEM_PROMPT = `Tu es un expert en conception pédagogique pour l'apprentissage du shimaoré.

## RÈGLES CRITIQUES
1. N'utilise JAMAIS de mots shimaoré absents du vocabulaire fourni
2. Génère exactement le nombre d'exercices demandé
3. Varie les types : multiple_choice | drag_drop | fill_gap | match_pairs | sentence_scramble | tap_select
4. Format JSON strict — aucun texte en dehors, sans backticks
5. Pour match_pairs : exactement 4 paires
6. Pour tap_select : 10-12 mots dans la grille

## FORMAT DE SORTIE
[
  {
    "type": "multiple_choice|drag_drop|fill_gap|match_pairs|sentence_scramble|tap_select",
    "difficulty": 1,
    "question": { ... },
    "correct_answer": "...",
    "accepted_answers": ["...", "..."],
    "hint": "...",
    "vocabulary_id": "uuid-si-disponible"
  }
]`

async function generateExercisesForLesson(lessonId: number, count = 20) {
  const { data: vocab, error } = await supabase
    .from('vocabulary')
    .select('id, french, shimaoré')
    .eq('lesson_id', lessonId)

  if (error || !vocab || vocab.length === 0) {
    console.error(`No vocabulary for lesson ${lessonId}. Run pnpm seed:all first.`)
    process.exit(1)
  }

  const vocabContext = vocab
    .map((v: any) => `- "${v.french}" → ${(v.shimaoré as string[]).join(' / ')} (id: ${v.id})`)
    .join('\n')

  const response = await mistral.chat.complete({
    model: process.env.MISTRAL_MODEL ?? 'mistral-small-latest',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Génère ${count} exercices variés pour la leçon ${lessonId}.
Commence avec difficulty: 1 (facile), monte vers 2 (moyen), quelques-uns en 3 (difficile).

VOCABULAIRE DISPONIBLE :
${vocabContext}

Mix souhaité : 6× multiple_choice, 4× drag_drop, 3× fill_gap, 3× match_pairs, 2× sentence_scramble, 2× tap_select`,
      },
    ],
  })

  const rawContent =
    response.choices?.[0]?.message?.content ?? '[]'
  const content = typeof rawContent === 'string' ? rawContent : ''

  let exercises: any[]
  try {
    const clean = content.replace(/```json\n?|\n?```/g, '').trim()
    exercises = JSON.parse(clean)
  } catch (err) {
    console.error('❌ JSON parse error:', err)
    console.error('Raw content:', content.slice(0, 500))
    throw new Error('Failed to parse AI-generated exercises')
  }

  const rows = exercises.map((ex: any) => ({
    ...ex,
    lesson_id: lessonId,
    generated_by: 'ai',
    is_approved: false,
  }))

  const { error: insertError } = await supabase.from('exercises').insert(rows)
  if (insertError) throw insertError

  console.log(`✅ ${exercises.length} exercises inserted for lesson ${lessonId} (pending approval)`)
}

async function main() {
  const lessonId = parseInt(process.argv[2] ?? '1')
  console.log(`Generating exercises for lesson ${lessonId}...`)
  await generateExercisesForLesson(lessonId, 20)
}

main().catch(console.error)
