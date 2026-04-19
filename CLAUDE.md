# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

**Luha** — application d'apprentissage du shimaoré (langue de Mayotte). Concept : Duolingo pour le shimaoré. Gratuit, sans pub, ancré dans la culture mahoraise.

Stack : Next.js 16 / React 19 / Tailwind CSS 4 / TypeScript. Gestionnaire de paquets : **pnpm**.

Mockups HTML/CSS de référence dans `../mockups/` — ne pas modifier, servir de source de vérité visuelle.

## Commands

```bash
pnpm dev        # dev server → localhost:3000
pnpm build      # production build
pnpm start      # start production server
pnpm lint       # ESLint
```

## Architecture

- `app/` — Next.js App Router
- `app/globals.css` — styles globaux, `@import "tailwindcss"` (syntaxe Tailwind v4)
- `app/layout.tsx` — root layout (actuellement Geist fonts — à remplacer par Bebas Neue + Inter)

## App Screens (from `../mockups/`)

| Route | Mockup | Thème |
|---|---|---|
| `/` | `landing.html` | Dark → sections alternées dark/light |
| `/dashboard` | `dashboard.html` | Light/Cream |
| `/lesson` | `lesson.html` | Dark |
| `/quiz` | `quiz.html` | Dark |

**Flow navigation :** Landing → Dashboard → Leçon → Quiz → Dashboard

### Landing Page — 7 sections

1. **Navbar** — fixed, `backdrop-blur`, logo LUHA (Bebas Neue), liens, CTA `btn-primary`
2. **Hero** — dark, `min-height: 100vh`, headline Bebas Neue `clamp(52px,7vw,80px)`, sous-titre accent yellow en Caveat, stats en IBM Plex Mono accent-red
3. **Social Proof** — light/cream, avatars empilés (overlap −10px), étoiles accent-yellow, quote en Bebas Neue, traduction en Caveat accent-blue
4. **Méthode** — dark, 3 cards côte à côte, numéro décoratif en arrière-plan (Bebas Neue 100px, accent-red, opacity 0.07)
5. **Modules** — light, grille 3 colonnes, cards avec accent-top-border red, items verrouillés à opacity 0.45
6. **Témoignages** — dark, cards avec `border-left: 3px solid accent-red` + hatch pattern coin supérieur droit
7. **Footer CTA** — dark, centré, formulaire email inline

### Dashboard — Light theme

- Header : greeting + streak badge + XP label (IBM Plex Mono)
- **Active module card** — fond dark (`#141414`) sur fond clair, accent-top-border rouge, progress bar bleue, `btn-blue` pill
- Stats : 3 cards (valeur en Bebas Neue accent-red, label gris)
- Grille modules 2 colonnes, locked items à opacity 0.4
- Note Caveat accent-blue en bas

### Leçon — Dark theme

- Step dots row : cercles 32px, états `done` (vert), `active` (bleu), default (gris)
- Header : compteur en Bebas Neue 48px accent-red + titre module
- **Content card** : mot en Bebas Neue 52px blanc, phonétique IBM Plex Mono accent-blue, français Inter 18px, exemple italic gris, bouton audio (outline pill, hover → bleu)
- **Note culturelle** : `border-left: 3px solid accent-yellow`, bg `rgba(F5E135, 0.05)`, texte Caveat 18px
- Nav : btn-ghost (← Précédent) + btn-blue pill (→ Suivant)

### Quiz — Dark theme

- **XP bar** : 6px barre bleue animée (`xpPulse`), label `+10 XP` en Caveat accent-yellow, vies ❤️
- Question : instruction IBM Plex Mono 11px uppercase, question Inter 700 22px
- **Options** : grille 2×2, bg `#1C1C1C`, border 1.5px, `rounded-xl`
  - `.correct` → border/text accent-green, bg `rgba(green, 0.12)`
  - `.wrong` → border/text `#FF5D5D`, bg `rgba(red, 0.12)`, animation `shake`
  - `.disabled` → opacity 0.3
- **Feedback panel** : `.correct` bg `rgba(green, 0.07)` border `rgba(green, 0.2)` / `.wrong` rouge — `fadeUp` animation

## Design System Tokens

### Couleurs

```css
--bg-dark:      #0D0D0D;   /* fond page dark */
--bg-dark-2:    #141414;   /* cards dark */
--bg-dark-3:    #1C1C1C;   /* options quiz, surfaces plus claires */
--bg-light:     #F2EDE3;   /* fond page cream */
--bg-light-2:   #EAE4D8;   /* cards cream */

--text-white:      #FFFFFF;
--text-off-white:  #C8C8C8;
--text-dark:       #1A1A1A;
--text-dark-gray:  #4A4A4A;
--text-gray:       #888888;

--accent-blue:    #4B7BF5;  /* boutons, actif, progress */
--accent-red:     #E84848;  /* numéros, labels, top-borders */
--accent-yellow:  #F5E135;  /* highlights, Caveat notes */
--accent-green:   #6BF56B;  /* succès, steps done */

--error:    #FF5D5D;
--success:  #6FD98F;
```

Jamais `#000000` — utiliser `#0D0D0D` ou `#1A1A1A`.

### Typographie — 4 familles max

| Variable | Police | Usage |
|---|---|---|
| `--font-display` | Bebas Neue, Impact | Titres hero, modules, compteurs |
| `--font-body` | Inter | Corps, boutons, labels |
| `--font-script` | Caveat | Notes culturelles, annotations, signatures |
| `--font-mono` | IBM Plex Mono | Labels uppercase, stats, phonétique, back-nav |

Chargement Google Fonts :
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;900&family=Caveat:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### Espacement (base 8px)

`4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 48 / 64 / 96px` — uniquement ces valeurs.

### Border Radius

| Usage | Valeur |
|---|---|
| Boutons pill, badges, back-nav | `999px` |
| Cards, modals, active-card | `16px` |
| Inputs, options quiz, btn landing | `12px` |
| Petits éléments | `8px` |

## Patterns Décoratifs (présents sur tous les écrans)

### Gradient Tubes

Éléments pill `position: fixed/absolute`, `height: 20–22px`, `border-radius: 999px`, rotatés et partiellement hors écran. Toujours `pointer-events: none; z-index: 0`.

```css
.tube-rainbow { background: linear-gradient(90deg, #FF4040, #FF8C00, #FFE135, #6BF56B, #4B7BF5, #A855F7); }
.tube-orange  { background: linear-gradient(135deg, #FF8C00, #FFE135); }
.tube-pink    { background: linear-gradient(135deg, #FF4EC7, #E84848); }
.tube-blue-pu { background: linear-gradient(135deg, #4B7BF5, #A855F7); }
.tube-green   { background: linear-gradient(135deg, #6BF56B, #B8F54E); }
.tube-cyan    { background: linear-gradient(135deg, #22D3EE, #4B7BF5); }
```

### Grid Background (40px)

```css
/* Dark */
background-image:
  linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
background-size: 40px 40px;

/* Light */
background-image:
  linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
background-size: 40px 40px;
```

### Crosshairs (coins de section)

```css
.ch { position: absolute; width: 14px; height: 14px; }
.ch-tl { top: 16px; left: 16px; border-top: 1.5px solid; border-left: 1.5px solid; }
.ch-tr { top: 16px; right: 16px; border-top: 1.5px solid; border-right: 1.5px solid; }
.ch-bl { bottom: 16px; left: 16px; border-bottom: 1.5px solid; border-left: 1.5px solid; }
.ch-br { bottom: 16px; right: 16px; border-bottom: 1.5px solid; border-right: 1.5px solid; }
/* Dark: opacity 0.3, border #fff | Light: opacity 0.25, border #000 */
```

### Grain Noise (sur les cards)

SVG feTurbulence via `::after`, `pointer-events: none; z-index: 1`. Les enfants directs de `.grain` doivent avoir `position: relative; z-index: 2`.

```css
.grain-dark::after  { opacity: 0.04; mix-blend-mode: screen; }
.grain-light::after { opacity: 0.07; mix-blend-mode: multiply; }
```

### Accent Top-Border (cards et modules)

```css
.card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 3px; /* ou 4px sur active-card */
  background: var(--accent-red); /* ou --accent-blue selon contexte */
  border-radius: 16px 16px 0 0;
}
```

### Section Label (pattern réutilisable)

```css
/* IBM Plex Mono, 11px, uppercase, letter-spacing 0.12em, accent-red */
```

### Animation d'entrée

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Appliqué sur .inner avec animation: fadeUp 0.5s ease forwards */
```

## Composants Clés

### Bouton primaire (`btn-primary` / `btn-blue`)

```
bg: #4B7BF5 | text: #fff | Inter 600 14px
border-radius: 999px | padding: 11px 24px
hover: #3B6BF0
```

### Bouton outline

```
bg: transparent | border: 1.5px solid rgba(255,255,255,0.5)
hover: bg rgba(255,255,255,0.06), border #fff
```

### Navbar (landing)

`position: fixed`, `backdrop-filter: blur(12px)`, `bg: rgba(13,13,13,0.85)`, `border-bottom: 1px solid rgba(255,255,255,0.05)`, max-width 1200px, padding `0 64px`.

### Back-nav (app screens)

`position: fixed top-left`, IBM Plex Mono 11px, pill avec backdrop-blur, fond semi-transparent selon thème.

### Module Card (locked state)

`opacity: 0.4` (dashboard) ou `0.45` (landing) sur les cards verrouillées.

## Content — Modules Shimaoré

8 modules dans l'ordre :
1. Alphabet & Sons — Débutant
2. Salutations — Débutant
3. La Famille — Débutant
4. Au Marché — Intermédiaire
5. Verbes du Quotidien — Intermédiaire
6. Culture & Traditions — Intermédiaire
7. *(à définir)* — Avancé
8. *(à définir)* — Avancé

Exemples de mots shimaoré utilisés dans les mockups : **Salama** (Bonjour/Paix, sa-LA-ma), **Oussi lindra tséna trini ?** (phrase hero), **Wawé u juwa luha wa shi-Maoré ?** (social proof).
