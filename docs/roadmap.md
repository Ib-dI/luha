# Roadmap & Commandes — Luha

## Seed Scripts

### seed-vocabulary.ts
```typescript
// scripts/seed-vocabulary.ts
import { createClient } from '@supabase/supabase-js'
import translationsData from '../src/data/structured_translations.json'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

async function seedVocabulary() {
  const entries = Object.entries(translationsData as Record<string, string[]>)
  const rows = entries.map(([french, shimaoré]) => ({ french, shimaoré, category: inferCategory(french) }))

  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await supabase.from('vocabulary')
      .upsert(rows.slice(i, i + 500), { onConflict: 'french' })
    if (error) console.error(`❌ chunk ${i}:`, error.message)
    else console.log(`✅ ${Math.min(i+500, rows.length)}/${rows.length}`)
  }
}

function inferCategory(word: string): string {
  const p: [RegExp, string][] = [
    [/\(u-\)$/i, 'verbes'],
    [/^(bonjour|salut|au revoir|merci|s'il|excuse)/i, 'salutations'],
    [/^(zéro|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|\d)/i, 'nombres'],
    [/^(à|dans|sur|sous|entre|avec|sans|pour|par|vers|chez)\s/i, 'prepositions'],
    [/^(quand|comment|pourquoi|où|qui|que|quoi|combien)/i, 'interrogatifs'],
    [/religion|prière|mosquée|ramadan|allah/i, 'religion'],
    [/famille|père|mère|enfant|frère|sœur|mari|femme/i, 'famille'],
    [/marché|acheter|vendre|prix|argent|payer/i, 'marche'],
  ]
  for (const [r, c] of p) if (r.test(word)) return c
  return 'general'
}

seedVocabulary().catch(console.error)
```

### seed-lessons.ts
```typescript
// scripts/seed-lessons.ts
import { lessons } from '../src/data/lessonData'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

async function seedLessons() {
  const rows = lessons.map((l, i) => ({
    id: l.id, title: l.title, description: l.description,
    order_index: i + 1,
    difficulty_level: Math.ceil((i + 1) / 8),
    unlocked_at_xp: i * 50,
    is_published: true,
  }))
  const { error } = await supabase.from('lessons').upsert(rows, { onConflict: 'id' })
  if (error) console.error('❌', error)
  else console.log(`✅ ${rows.length} lessons seeded`)
}

seedLessons().catch(console.error)
```

---

## Roadmap

### Phase 1 — MVP (Semaines 1–4)

**S1 : Fondations**
- [ ] `corepack enable` → installer pnpm
- [ ] `pnpm create next-app@latest luha --typescript --tailwind --app --src-dir`
- [ ] Supabase : créer projet + exécuter SQL (`docs/db.md`)
- [ ] `pnpm seed:all`
- [ ] Tester clé Mistral : `pnpm tsx scripts/test-mistral.ts`

**S2 : Auth + Leçons**
- [ ] Supabase Auth (email/password)
- [ ] Layout : nav + XP bar + streak counter
- [ ] `/learn` : carte des leçons (style Brilliant — visuel, pas liste)
- [ ] `/learn/[lessonId]` : leçon interactive

**S3 : Exercices Tactiles**
- [ ] `pnpm generate:exercises 1` → 20 exercices leçon 1
- [ ] Valider dans Supabase Dashboard (`is_approved = true`)
- [ ] MultipleChoice + FeedbackAnimation (Framer Motion)
- [ ] Session complète + XP

**S4 : Gamification + Dictionnaire**
- [ ] Spaced Repetition + `/practice`
- [ ] Streak + bouclier
- [ ] `/dictionary` + `/profile`
- [ ] Déploiement Vercel

### Phase 2 — IA Conversationnelle (S5–S8)
- [ ] `/api/conversation` avec Mistral + RAG
- [ ] Chat Mariama (5 scénarios) + TTS
- [ ] `generate-exercises.ts` sur les 37 leçons
- [ ] DragDrop + MatchPairs + SentenceScramble

### Phase 3 — Speech (Mois 3)
- [ ] Whisper STT + bouton micro
- [ ] Crowdsourcing audio natif

### Phase 4 — IA Avancée (Mois 4+)
- [ ] Admin dashboard exercices
- [ ] Fine-tuning Mistral open-weight (Apache 2.0)
- [ ] Extension shindzuani / kibushi

### Phase 5 — Modèle Shimaoré Officiel (Mois 6 → An 2)
> Voir `docs/model-training.md` pour le guide complet

- [ ] **Phase A** : Construire le corpus (`python scripts/build_corpus.py`)
- [ ] **Phase A** : Valider les entrées en tant que natif (`python scripts/validate_corpus.py`)
- [ ] **Phase A** : Ajouter 50 phrases/jour (`python scripts/add_sentences.py`)
- [ ] **Phase B** : Fine-tuner `opus-mt-fr-swc` sur Google Colab (GPU T4 gratuit)
- [ ] **Phase C** : Publier le modèle sur HuggingFace Hub (`luha-shimaoré/opus-mt-fr-shi`)
- [ ] **Phase C** : Publier le dataset (`luha-shimaoré/shimaoré-fr-parallel-corpus`)
- [ ] **Phase C** : Intégrer `/api/translate` dans Luha (remplace RAG Mistral)
- [ ] **Phase D** : Contacter Masakhane + Common Voice Mozilla
- [ ] **Phase D** : Corpus 10 000+ phrases → modèle de langue shimaoré (mT5)
- [ ] **Phase E** : Partenariat INALCO / Conseil Départemental Mayotte
- [ ] **Phase E** : Premier LLM shimaoré open-source reconnu officiellement

---

## Toutes les Commandes pnpm

```bash
# Setup
corepack enable && corepack prepare pnpm@latest --activate
pnpm create next-app@latest luha \
  --typescript --tailwind --app --src-dir --import-alias "@/*"
cd luha

# Dépendances
pnpm add @supabase/supabase-js @supabase/ssr \
  @mistralai/mistralai @tanstack/react-query \
  zustand framer-motion lucide-react
pnpm add -D tsx supabase @types/node

# Supabase
pnpm db:push          # Appliquer le schema
pnpm db:reset         # Reset (dev uniquement)
pnpm db:types         # Générer types TypeScript

# Données
pnpm seed:all
pnpm seed:lessons
pnpm seed:vocab

# Génération exercices (Mistral)
pnpm generate:exercises 1
for i in $(seq 1 37); do pnpm generate:exercises $i; done

# Dev
pnpm dev
pnpm type-check
pnpm lint
pnpm build

# Déploiement
vercel deploy --prod
```
