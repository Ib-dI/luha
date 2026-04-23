# AI — Mistral (Gratuit) — Luha

## Modèle retenu : `mistral-small-latest`
- Plan **Experiment** gratuit → [console.mistral.ai](https://console.mistral.ai)
- 24B paramètres · 128k contexte · multilingue natif (français ✅)
- JSON mode natif (`responseFormat: { type: 'json_object' }`)
- ⚠️ Plan Experiment : requêtes utilisées pour entraîner Mistral (acceptable pour projet pédagogique)
- Migration Starter (payant, zero data retention) si données sensibles en production

## Installation
```bash
pnpm add @mistralai/mistralai
```

## Différences vs Claude API
| Aspect | Claude (ancien) | Mistral (actuel) |
|---|---|---|
| Instanciation | `new Anthropic({...})` | `new Mistral({...})` |
| Appel | `anthropic.messages.create()` | `mistral.chat.complete()` |
| System prompt | Paramètre `system:` séparé | `{ role: 'system', content: '...' }` dans messages |
| JSON mode | Via prompt | `responseFormat: { type: 'json_object' }` natif |
| Réponse | `response.content[0].text` | `response.choices?.[0]?.message?.content` |
| Variable env | `ANTHROPIC_API_KEY` | `MISTRAL_API_KEY` |
| Coût | Payant | **Gratuit** |

---

## 1. API Route — Conversation

```typescript
// src/app/api/conversation/route.ts
import { Mistral } from '@mistralai/mistralai'
import { supabase } from '@/lib/supabase'
import { updateStreak } from '@/lib/gamification/streak'

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY! })

const SYSTEM_PROMPT = `Tu es Mariama, une locutrice native du shimaoré de Mayotte.
Chaleureuse, patiente, encourageante.

## RÈGLES ABSOLUES
1. Répondre PRINCIPALEMENT en shimaoré
2. Adapter la complexité au niveau (beginner/intermediate/advanced)
3. Ne corriger qu'UNE chose par échange maximum
4. Rester dans le scénario choisi
5. N'inventer AUCUN mot shimaoré hors vocabulaire fourni
6. Mot manquant → français entre parenthèses : (voiture)

## FORMAT JSON STRICT (aucun texte en dehors)
{
  "response_shimaoré": "réponse principale",
  "response_french": "traduction discrète",
  "feedback": {
    "has_correction": false,
    "correction": "forme correcte si erreur grave uniquement",
    "explanation": "explication courte en français (max 1 phrase)",
    "new_word": { "shimaoré": "...", "french": "..." }
  },
  "detected_level": "beginner|intermediate|advanced"
}`

export async function POST(req: Request) {
  const { messages, scenario, mode = 'tutor', userId, userLevel = 'beginner', sessionId } =
    await req.json()

  if (!userId || !scenario) {
    return Response.json({ error: 'Missing userId or scenario' }, { status: 400 })
  }

  const vocabContext = await getScenarioVocab(scenario)
  const systemFull = `${SYSTEM_PROMPT}

## SCÉNARIO : ${scenario.toUpperCase()}
${SCENARIO_DESC[scenario] ?? ''}

## VOCABULAIRE DISPONIBLE
${vocabContext}

## NIVEAU : ${userLevel} | MODE : ${mode === 'tutor' ? 'TUTEUR' : 'LIBRE'}`

  try {
    const res = await mistral.chat.complete({
      model: process.env.MISTRAL_MODEL ?? 'mistral-small-latest',
      responseFormat: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemFull },
        ...messages.map((m: any) => ({ role: m.role, content: m.content }))
      ],
      maxTokens: 800,
      temperature: 0.7,
    })

    const raw = res.choices?.[0]?.message?.content ?? '{}'
    let parsed: any
    try {
      parsed = JSON.parse(typeof raw === 'string' ? raw : JSON.stringify(raw))
    } catch {
      parsed = { response_shimaoré: String(raw), response_french: '',
        feedback: { has_correction: false }, detected_level: userLevel }
    }

    if (sessionId) await saveTurn(sessionId, parsed)
    await updateStreak(userId)
    return Response.json(parsed)
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

async function getScenarioVocab(scenario: string): Promise<string> {
  const map: Record<string, string[]> = {
    marche: ['marche', 'general', 'nombres'],
    famille: ['famille', 'salutations', 'general'],
    religion: ['religion', 'salutations'],
    quotidien: ['general', 'verbes', 'salutations'],
    travail: ['general', 'verbes'],
  }
  const { data } = await supabase
    .from('vocabulary').select('french, shimaoré')
    .in('category', map[scenario] ?? ['general']).limit(40)
  return data?.map(v => `${v.french} → ${(v.shimaoré as string[]).join(' / ')}`).join('\n') ?? ''
}

async function saveTurn(sessionId: string, aiResponse: any) {
  const { data } = await supabase
    .from('conversation_sessions').select('messages').eq('id', sessionId).single()
  await supabase.from('conversation_sessions').update({
    messages: [...(data?.messages ?? []),
      { role: 'assistant', content: aiResponse.response_shimaoré,
        translation: aiResponse.response_french,
        feedback: aiResponse.feedback, timestamp: new Date().toISOString() }]
  }).eq('id', sessionId)
}

const SCENARIO_DESC: Record<string, string> = {
  marche: `Marché de Mamoudzou. Acheter, négocier. Clés : "Ngapi kisaje ?" (combien ?), "Punya sana" (trop cher).`,
  famille: `Conversation familiale. Clés : mama (mère), ɓaɓa (père), mwana (enfant).`,
  religion: `Contexte islamique. Clés : "Salaam aleikum" → "Wa aleikum salaam". Alhamdulillahi.`,
  quotidien: `Vie quotidienne. Clés : ɗago (maison), uendra (aller), shahula (repas).`,
  travail: `Professionnel. Clés : kazi (travail), mushahara (salaire), ufanya (faire).`,
}
```

---

## 2. Script — Génération d'Exercices

```typescript
// scripts/generate-exercises.ts
import { Mistral } from '@mistralai/mistralai'
import { createClient } from '@supabase/supabase-js'

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY! })
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

const GEN_SYSTEM = `Expert en conception pédagogique shimaoré (langue de Mayotte).

## RÈGLES
1. Uniquement les mots du vocabulaire fourni
2. Répondre UNIQUEMENT avec du JSON valide — zéro texte en dehors
3. Ne pas répéter le même type plus de 4 fois
4. match_pairs : exactement 4 paires
5. tap_select : 10-12 mots, 3-4 corrects

## STRUCTURES PAR TYPE
multiple_choice: { "type":"multiple_choice","prompt":"...","choices":["a","b","c","d"] }
drag_drop:       { "type":"drag_drop","sentence_template":"Bonjour = ___ !","word_bank":["Jeje","Ndjema","Kwezi","Mbona"] }
fill_gap:        { "type":"fill_gap","sentence":"Haɓari za ___ ?","blank_position":2 }
match_pairs:     { "type":"match_pairs","pairs":[{"left":"FR","right":"Shi"},...] }
sentence_scramble: { "type":"sentence_scramble","words":["mots","mélangés"],"instruction":"Remettez dans l'ordre" }
tap_select:      { "type":"tap_select","prompt":"Trouvez les salutations","word_grid":["Jeje","Meza",...] }

## SORTIE (tableau JSON direct, sans backticks)
[{"type":"...","difficulty":1,"question":{...},"correct_answer":"...","accepted_answers":["..."],"hint":"...","vocabulary_id":"uuid"}]`

export async function generateExercisesForLesson(
  lessonId: number,
  vocab: Array<{ id: string; french: string; shimaoré: string[] }>,
  count = 20
) {
  const vocabStr = vocab.map(v => `- "${v.french}" → ${v.shimaoré.join(' / ')} (id: ${v.id})`).join('\n')

  const res = await mistral.chat.complete({
    model: process.env.MISTRAL_MODEL ?? 'mistral-small-latest',
    responseFormat: { type: 'json_object' },
    messages: [
      { role: 'system', content: GEN_SYSTEM },
      { role: 'user', content:
        `Génère ${count} exercices pour la leçon ${lessonId}.\n\nVOCABULAIRE :\n${vocabStr}\n\n` +
        `Mix : 6× multiple_choice (diff 1) · 4× drag_drop (diff 1-2) · 3× fill_gap (diff 2) · ` +
        `3× match_pairs (diff 2) · 2× sentence_scramble (diff 2-3) · 2× tap_select (diff 3)` }
    ],
    maxTokens: 4096,
    temperature: 0.3,
  })

  const raw = res.choices?.[0]?.message?.content ?? '[]'
  let exercises: any[]
  try {
    const parsed = JSON.parse(typeof raw === 'string' ? raw : JSON.stringify(raw))
    exercises = Array.isArray(parsed) ? parsed : (parsed.exercises ?? parsed.data ?? [])
  } catch {
    throw new Error('Mistral returned invalid JSON')
  }

  const rows = exercises.map((ex: any) => ({
    ...ex, lesson_id: lessonId, generated_by: 'ai', is_approved: false
  }))

  const { error } = await supabase.from('exercises').insert(rows)
  if (error) throw error

  console.log(`✅ ${exercises.length} exercices insérés (leçon ${lessonId}) — en attente d'approbation`)
  return exercises
}

async function main() {
  const lessonId = parseInt(process.argv[2] ?? '1')
  const { data: vocab } = await supabase
    .from('vocabulary').select('id, french, shimaoré').eq('lesson_id', lessonId)

  if (!vocab?.length) {
    console.error(`Aucun vocabulaire pour la leçon ${lessonId}. Lance pnpm seed:all d'abord.`)
    process.exit(1)
  }
  await generateExercisesForLesson(lessonId, vocab, 20)
}

main().catch(console.error)
```

```bash
pnpm generate:exercises 1
# Puis : Supabase Dashboard → exercises → is_approved = true
```

## Paramètres Mistral : Quand utiliser quoi

| Usage | Temperature | Pourquoi |
|---|---|---|
| Génération exercices | `0.3` | Cohérence et précision — pas de variabilité indésirable |
| Conversation Mariama | `0.7` | Naturel et varié — évite les réponses répétitives |
| Test rapide | `0.0` | Reproductible — débogage |
