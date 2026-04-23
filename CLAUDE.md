# LUHA — Plateforme d'apprentissage du shimaoré

## RÈGLES ABSOLUES
- Package manager : **pnpm uniquement** — jamais npm ou yarn
- `pnpm-lock.yaml` : toujours commiter
- IA : **Mistral AI** (`mistral-small-latest`) — plan Experiment gratuit
- Langue : **shimaoré** (Mayotte) — ne jamais inventer de mots hors dataset
- Feedback UI : **viscéral et immédiat** (Framer Motion) — style Brilliant.org
- Exercices IA : `is_approved = false` par défaut — validation humaine obligatoire

## STACK
```
Next.js 14 App Router + TypeScript strict
Tailwind CSS + Framer Motion (animations obligatoires)
Supabase (PostgreSQL + Auth + RLS + Storage)
@mistralai/mistralai (gratuit — Experiment Plan)
@tanstack/react-query + zustand
pnpm (JAMAIS npm)
Vercel (déploiement)
```

## STRUCTURE PROJET
```
src/
├── app/
│   ├── (auth)/login  register
│   ├── (app)/
│   │   ├── learn/[lessonId]/practice
│   │   ├── practice/          ← spaced repetition
│   │   ├── conversation/[scenario]
│   │   ├── dictionary/
│   │   └── profile/
│   └── api/
│       ├── conversation/      ← Mistral chat
│       ├── exercises/generate ← Mistral generation
│       ├── tts/               ← Google TTS / ElevenLabs
│       └── progress/
├── components/exercises/  conversation/  gamification/  ui/
├── lib/exercises/  gamification/  scenarios/
├── hooks/  data/  types/
scripts/
├── seed-vocabulary.ts
├── seed-lessons.ts
└── generate-exercises.ts   ← Pipeline Mistral style Brilliant
supabase/migrations/001_initial_schema.sql
```

## COMMANDES ESSENTIELLES
```bash
pnpm install
pnpm dev / pnpm build / pnpm lint / pnpm type-check
pnpm db:push / pnpm db:types / pnpm db:reset
pnpm seed:all               # seed leçons + vocabulaire
pnpm generate:exercises 1   # générer exercices leçon 1 via Mistral
```

## DONNÉES LINGUISTIQUES
- `src/data/lessonData.ts` → 37 leçons structurées
- `src/data/structured_translations.json` → ~1500 entrées FR→Shimaoré
- Toutes les variantes d'un mot sont valides (`shimaoré: text[]`)
- Notation `(u-)` = verbe à l'infinitif
- Caractères spéciaux : ɓ ɗ v̄ ã — unicode NFC obligatoire

## VARIABLES D'ENVIRONNEMENT
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=          # serveur uniquement
MISTRAL_API_KEY=               # console.mistral.ai (gratuit)
MISTRAL_MODEL=mistral-small-latest
ELEVENLABS_API_KEY=            # optionnel
OPENAI_API_KEY=                # Phase 3 Whisper uniquement
```

## DOCS DÉTAILLÉES
Consulter selon le besoin — ne pas charger tous les fichiers à la fois :

| Besoin | Fichier |
|---|---|
| Schema DB, RLS, index SQL | `docs/db.md` |
| Mistral : conversation + génération exercices | `docs/ai.md` |
| Exercise Engine, types, feedback Brilliant | `docs/exercises.md` |
| XP, streak, gamification | `docs/gamification.md` |
| Roadmap, seed scripts, commandes complètes | `docs/roadmap.md` |
| Scénarios, TTS, structure détaillée | `docs/features.md` |
