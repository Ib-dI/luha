# Features — Scénarios, TTS, Dictionnaire — Luha

## Scénarios Conversationnels (5)

```typescript
// src/lib/scenarios/catalog.ts
export const SCENARIOS = [
  { id: 'salutations', title_fr: 'Les salutations', title_shi: 'Usalamu',
    emoji: '👋', difficulty: 1, categories: ['salutations','general'],
    key_phrases: [
      { shimaoré: 'Jeje !', french: 'Bonjour ! Ça va ?' },
      { shimaoré: 'Ndjema !', french: 'Bien !' },
      { shimaoré: 'Kwezi !', french: 'Bonjour (à un aîné)' },
      { shimaoré: 'Salaam aleikum !', french: 'Paix sur vous' },
    ] },
  { id: 'marche', title_fr: 'Au marché', title_shi: 'Maroni',
    emoji: '🛒', difficulty: 1, categories: ['marche','nombres','general'],
    key_phrases: [
      { shimaoré: 'Ngapi kisaje ?', french: 'Combien ça coûte ?' },
      { shimaoré: 'Punya sana', french: 'C\'est trop cher' },
      { shimaoré: 'Ndjema !', french: 'D\'accord !' },
    ] },
  { id: 'famille', title_fr: 'La famille', title_shi: 'Familia',
    emoji: '👨‍👩‍👧', difficulty: 2, categories: ['famille','salutations'],
    key_phrases: [
      { shimaoré: 'Mama', french: 'Mère' },
      { shimaoré: 'Ɓaɓa', french: 'Père' },
      { shimaoré: 'Mwana', french: 'Enfant' },
    ] },
  { id: 'religion', title_fr: 'La religion', title_shi: 'Dini',
    emoji: '🕌', difficulty: 2, categories: ['religion','salutations'],
    key_phrases: [
      { shimaoré: 'Salaam aleikum', french: 'Paix sur vous' },
      { shimaoré: 'Alhamdulillahi', french: 'Dieu merci' },
    ] },
  { id: 'quotidien', title_fr: 'Vie quotidienne', title_shi: 'Maisha ya kila suku',
    emoji: '🌅', difficulty: 2, categories: ['general','verbes'],
    key_phrases: [
      { shimaoré: 'Uenda wapi ?', french: 'Tu vas où ?' },
      { shimaoré: 'Ndaenda ɗagoni', french: 'Je rentre à la maison' },
    ] },
]
```

---

## TTS (Text-to-Speech)

```typescript
// src/app/api/tts/route.ts
export async function POST(req: Request) {
  const { text, provider = 'google' } = await req.json()
  if (!text) return Response.json({ error: 'No text' }, { status: 400 })

  if (provider === 'elevenlabs') {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
      { method: 'POST',
        headers: { 'Content-Type': 'application/json', 'xi-api-key': process.env.ELEVENLABS_API_KEY! },
        body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 } }) }
    )
    return new Response(await res.arrayBuffer(), { headers: { 'Content-Type': 'audio/mpeg' } })
  }

  // Fallback gratuit — Google TTS (Swahili comme approximation phonétique)
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=sw&client=tw-ob`
  return new Response(await (await fetch(url)).arrayBuffer(), { headers: { 'Content-Type': 'audio/mpeg' } })
}
```

```typescript
// src/hooks/useTTS.ts
import { useState, useCallback } from 'react'

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false)

  const speak = useCallback(async (text: string) => {
    if (isPlaying) return
    try {
      const res = await fetch('/api/tts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const url = URL.createObjectURL(await res.blob())
      const audio = new Audio(url)
      setIsPlaying(true)
      audio.onended = () => { setIsPlaying(false); URL.revokeObjectURL(url) }
      await audio.play()
    } catch { setIsPlaying(false) }
  }, [isPlaying])

  return { speak, isPlaying }
}
```

---

## Dictionnaire (Recherche Floue)

```typescript
// src/app/api/dictionary/search/route.ts
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q') ?? ''
  if (q.length < 2) return Response.json({ results: [] })

  const { data } = await supabase.rpc('search_vocabulary_fr', {
    search_term: q, result_limit: 20
  })
  return Response.json({ results: data ?? [] })
}
```

> Voir `docs/db.md` pour la fonction SQL `search_vocabulary_fr` (pg_trgm).
