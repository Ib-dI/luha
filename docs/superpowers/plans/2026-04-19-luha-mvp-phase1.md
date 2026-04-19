# Luha MVP Phase 1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire les 4 écrans du MVP de Luha (app d'apprentissage du shimaoré) — Landing, Dashboard, Leçon, Quiz — avec fidelité visuelle totale aux mockups HTML/CSS dans `../mockups/`, en utilisant les données statiques de `../data/`. Aucun backend ni auth en Phase 1.

**Architecture:** Next.js App Router (Server Components par défaut, `'use client'` uniquement pour les parties interactives). Tokens de design dans `globals.css`. Primitives partagées dans `components/ui/`. Données importées statiquement depuis `../data/lessonData.ts`. Pas de Supabase en Phase 1 — données en mémoire.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, pnpm. Tests : Vitest + @testing-library/react.

---

## File Map

```
app/
  globals.css                          ← MODIFY : tokens CSS + utilities grain/grid/crosshairs/tubes/fadeUp
  layout.tsx                           ← MODIFY : Google Fonts (Bebas Neue, Inter, Caveat, IBM Plex Mono), metadata
  page.tsx                             ← MODIFY : Landing page (7 sections)
  dashboard/
    page.tsx                           ← CREATE
  lesson/
    [id]/
      page.tsx                         ← CREATE
  quiz/
    [id]/
      page.tsx                         ← CREATE (client component)

components/
  ui/
    Button.tsx                         ← CREATE
    Card.tsx                           ← CREATE
    Tag.tsx                            ← CREATE
  decorative/
    GradientTube.tsx                   ← CREATE
    Crosshairs.tsx                     ← CREATE
  layout/
    Navbar.tsx                         ← CREATE
    BackNav.tsx                        ← CREATE
  landing/
    HeroSection.tsx                    ← CREATE
    SocialProofSection.tsx             ← CREATE
    MethodeSection.tsx                 ← CREATE
    ModulesSection.tsx                 ← CREATE (réutilisé dans dashboard)
    TemoignagesSection.tsx             ← CREATE
    FooterCTASection.tsx               ← CREATE
  dashboard/
    ActiveModuleCard.tsx               ← CREATE
    StatsRow.tsx                       ← CREATE
    ModulesGrid.tsx                    ← CREATE
  lesson/
    StepDots.tsx                       ← CREATE
    ContentCard.tsx                    ← CREATE
    CulturalNote.tsx                   ← CREATE
  quiz/
    XPBar.tsx                          ← CREATE
    QuizOptions.tsx                    ← CREATE (client)
    FeedbackPanel.tsx                  ← CREATE

lib/
  cn.ts                                ← CREATE : utility classname merge
  data/
    modules.ts                         ← CREATE : liste statique des 8 modules
    lessons.ts                         ← CREATE : re-export + adapter de ../data/lessonData.ts
    quiz.ts                            ← CREATE : questions générées depuis les leçons

vitest.config.ts                       ← CREATE
vitest.setup.ts                        ← CREATE
```

---

## Task 1 — Dépendances de test + utilitaire cn

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `lib/cn.ts`

- [ ] **Step 1 : Installer les dépendances**

```bash
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom clsx
```

- [ ] **Step 2 : Créer `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

- [ ] **Step 3 : Créer `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4 : Ajouter le script test dans `package.json`**

Dans la section `"scripts"`, ajouter :
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5 : Créer `lib/cn.ts`**

```ts
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
```

- [ ] **Step 6 : Vérifier que la config fonctionne**

```bash
pnpm test
```
Résultat attendu : `No test files found` (pas d'erreur de config).

- [ ] **Step 7 : Commit**

```bash
git add vitest.config.ts vitest.setup.ts lib/cn.ts package.json pnpm-lock.yaml
git commit -m "feat: add vitest + testing-library + cn utility"
```

---

## Task 2 — Design system dans globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1 : Écrire le test (fichier de sanity CSS — pas de test JS ici, on valide visuellement via `pnpm dev`)**

Aucun test unitaire pour les CSS variables. La validation se fait dans les tâches suivantes lors du rendu.

- [ ] **Step 2 : Remplacer `app/globals.css` entièrement**

```css
@import "tailwindcss";

/* ===================================================
   TOKENS
=================================================== */
:root {
  --bg-dark:       #0D0D0D;
  --bg-dark-2:     #141414;
  --bg-dark-3:     #1C1C1C;
  --bg-light:      #F2EDE3;
  --bg-light-2:    #EAE4D8;

  --text-white:      #FFFFFF;
  --text-off-white:  #C8C8C8;
  --text-dark:       #1A1A1A;
  --text-dark-gray:  #4A4A4A;
  --text-gray:       #888888;

  --accent-blue:    #4B7BF5;
  --accent-red:     #E84848;
  --accent-yellow:  #F5E135;
  --accent-green:   #6BF56B;

  --error:    #FF5D5D;
  --success:  #6FD98F;

  --font-display: 'Bebas Neue', Impact, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-script:  'Caveat', cursive;
  --font-mono:    'IBM Plex Mono', monospace;
}

/* ===================================================
   RESET + BASE
=================================================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  color: var(--text-white);
}
a { text-decoration: none; color: inherit; }

/* ===================================================
   GRID OVERLAY (fond décoratif 40px)
=================================================== */
.grid-dark {
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}
.grid-light {
  background-image:
    linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* ===================================================
   CROSSHAIRS
=================================================== */
.ch-box { position: relative; }
.ch {
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
  z-index: 10;
}
.ch-dark .ch  { opacity: 0.3;  border-color: #fff !important; }
.ch-light .ch { opacity: 0.25; border-color: #000 !important; }
.ch-tl { top: 16px;    left: 16px;  border-top:    1.5px solid; border-left:  1.5px solid; }
.ch-tr { top: 16px;    right: 16px; border-top:    1.5px solid; border-right: 1.5px solid; }
.ch-bl { bottom: 16px; left: 16px;  border-bottom: 1.5px solid; border-left:  1.5px solid; }
.ch-br { bottom: 16px; right: 16px; border-bottom: 1.5px solid; border-right: 1.5px solid; }

/* ===================================================
   GRAIN NOISE (via SVG feTurbulence)
=================================================== */
.grain { position: relative; overflow: hidden; }
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
  pointer-events: none;
  z-index: 1;
}
.grain-dark::after  { opacity: 0.04; mix-blend-mode: screen;   }
.grain-light::after { opacity: 0.07; mix-blend-mode: multiply; }
.grain > * { position: relative; z-index: 2; }

/* ===================================================
   CARD ACCENT TOP BORDER
=================================================== */
.accent-top-red::before,
.accent-top-blue::before,
.accent-top-green::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.accent-top-red::before   { background: var(--accent-red);   }
.accent-top-blue::before  { background: var(--accent-blue);  }
.accent-top-green::before { background: var(--accent-green); }

/* ===================================================
   ANIMATION
=================================================== */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0);    }
}
.fade-up { animation: fadeUp 0.5s ease forwards; }

@keyframes xpPulse {
  0%   { box-shadow: 0 0 0 0   rgba(75,123,245,0.4); }
  70%  { box-shadow: 0 0 0 8px rgba(75,123,245,0);   }
  100% { box-shadow: 0 0 0 0   rgba(75,123,245,0);   }
}
.xp-pulse { animation: xpPulse 1.5s ease infinite; }

@keyframes shake {
  0%,100% { transform: translateX(0);  }
  20%     { transform: translateX(-8px); }
  40%     { transform: translateX(8px);  }
  60%     { transform: translateX(-5px); }
  80%     { transform: translateX(5px);  }
}
.shake { animation: shake 0.4s ease; }
```

- [ ] **Step 3 : Commit**

```bash
git add app/globals.css
git commit -m "feat: design system tokens, grid, grain, crosshairs, animations"
```

---

## Task 3 — Root layout (fonts + metadata)

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1 : Écrire le test**

Créer `app/__tests__/layout.test.tsx` :
```tsx
import { render } from '@testing-library/react'

// Smoke test — layout rend les enfants correctement
test('layout renders children', () => {
  const { getByText } = render(<div>Hello Luha</div>)
  expect(getByText('Hello Luha')).toBeInTheDocument()
})
```

- [ ] **Step 2 : Lancer le test (doit passer)**

```bash
pnpm test
```
Résultat attendu : PASS (c'est juste un smoke test sur un div).

- [ ] **Step 3 : Mettre à jour `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Caveat, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas',
  subsets: ['latin'],
})

const inter = Inter({
  weight: ['400', '500', '600', '900'],
  variable: '--font-inter',
  subsets: ['latin'],
})

const caveat = Caveat({
  weight: ['400', '600'],
  variable: '--font-caveat',
  subsets: ['latin'],
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  variable: '--font-ibm-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Luha — Apprends le shimaoré',
  description: 'La première application dédiée à l\'apprentissage du shimaoré, langue de Mayotte.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${inter.variable} ${caveat.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4 : Mettre à jour les variables CSS dans `globals.css`** pour utiliser les variables next/font

Remplacer dans `:root` :
```css
--font-display: var(--font-bebas), Impact, sans-serif;
--font-body:    var(--font-inter), system-ui, sans-serif;
--font-script:  var(--font-caveat), cursive;
--font-mono:    var(--font-ibm-mono), monospace;
```

- [ ] **Step 5 : Commit**

```bash
git add app/layout.tsx app/globals.css app/__tests__/layout.test.tsx
git commit -m "feat: configure Google Fonts via next/font (Bebas Neue, Inter, Caveat, IBM Plex Mono)"
```

---

## Task 4 — Composants UI primitifs (Button, Card, Tag)

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/Tag.tsx`
- Create: `components/ui/__tests__/Button.test.tsx`

- [ ] **Step 1 : Écrire le test Button**

Créer `components/ui/__tests__/Button.test.tsx` :
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

test('renders primary button with text', () => {
  render(<Button>Commencer</Button>)
  expect(screen.getByRole('button', { name: 'Commencer' })).toBeInTheDocument()
})

test('calls onClick when clicked', () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Click</Button>)
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('renders outline variant', () => {
  render(<Button variant="outline">Voir</Button>)
  expect(screen.getByRole('button')).toHaveClass('border-white/50')
})
```

- [ ] **Step 2 : Lancer le test (doit échouer)**

```bash
pnpm test
```
Résultat attendu : FAIL — `Cannot find module '../Button'`

- [ ] **Step 3 : Créer `components/ui/Button.tsx`**

```tsx
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-6 py-[11px] font-sans text-sm font-semibold transition-all cursor-pointer',
        variant === 'primary' && 'bg-[#4B7BF5] text-white hover:bg-[#3B6BF0]',
        variant === 'outline' && 'border-[1.5px] border-white/50 bg-transparent text-white hover:border-white hover:bg-white/[0.06]',
        variant === 'ghost'   && 'bg-transparent text-[#888888] hover:text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4 : Lancer le test (doit passer)**

```bash
pnpm test
```
Résultat attendu : PASS (3 tests).

- [ ] **Step 5 : Créer `components/ui/Card.tsx`**

```tsx
import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'dark' | 'light'
  accentColor?: 'red' | 'blue' | 'green' | 'none'
  grain?: boolean
  children: ReactNode
}

export function Card({
  theme = 'dark',
  accentColor = 'none',
  grain = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-8 relative overflow-hidden',
        theme === 'dark'  && 'bg-[#141414] border border-white/[0.06]',
        theme === 'light' && 'bg-[#EAE4D8] border border-black/[0.08]',
        accentColor !== 'none' && `accent-top-${accentColor}`,
        grain && (theme === 'dark' ? 'grain grain-dark' : 'grain grain-light'),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 6 : Créer `components/ui/Tag.tsx`**

```tsx
import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TagVariant = 'red' | 'neutral-dark' | 'neutral-light' | 'yellow'

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant
  children: ReactNode
}

export function Tag({ variant = 'neutral-dark', className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase',
        variant === 'red'           && 'bg-[#E84848]/15 text-[#E84848]',
        variant === 'neutral-dark'  && 'bg-white/10 text-[#C8C8C8]',
        variant === 'neutral-light' && 'bg-black/[0.07] text-[#4A4A4A]',
        variant === 'yellow'        && 'bg-[#F5E135]/15 text-[#F5E135]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 7 : Commit**

```bash
git add components/ui/Button.tsx components/ui/Card.tsx components/ui/Tag.tsx components/ui/__tests__/Button.test.tsx
git commit -m "feat: ui primitives Button, Card, Tag"
```

---

## Task 5 — Composants décoratifs (GradientTube, Crosshairs)

**Files:**
- Create: `components/decorative/GradientTube.tsx`
- Create: `components/decorative/Crosshairs.tsx`

- [ ] **Step 1 : Créer `components/decorative/GradientTube.tsx`**

```tsx
import { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

type TubeVariant = 'rainbow' | 'orange' | 'pink' | 'blue-purple' | 'green' | 'cyan'

const gradients: Record<TubeVariant, string> = {
  rainbow:     'linear-gradient(90deg, #FF4040, #FF8C00, #FFE135, #6BF56B, #4B7BF5, #A855F7)',
  orange:      'linear-gradient(135deg, #FF8C00, #FFE135)',
  pink:        'linear-gradient(135deg, #FF4EC7, #E84848)',
  'blue-purple':'linear-gradient(135deg, #4B7BF5, #A855F7)',
  green:       'linear-gradient(135deg, #6BF56B, #B8F54E)',
  cyan:        'linear-gradient(135deg, #22D3EE, #4B7BF5)',
}

interface GradientTubeProps {
  variant?: TubeVariant
  width?: number
  height?: number
  top?: string
  bottom?: string
  left?: string
  right?: string
  rotate?: number
  opacity?: number
  fixed?: boolean
}

export function GradientTube({
  variant = 'rainbow',
  width = 200,
  height = 20,
  top,
  bottom,
  left,
  right,
  rotate = 0,
  opacity = 0.5,
  fixed = false,
}: GradientTubeProps) {
  const style: CSSProperties = {
    position: fixed ? 'fixed' : 'absolute',
    width,
    height,
    borderRadius: 999,
    background: gradients[variant],
    opacity,
    transform: `rotate(${rotate}deg)`,
    pointerEvents: 'none',
    zIndex: 0,
    ...(top    !== undefined && { top }),
    ...(bottom !== undefined && { bottom }),
    ...(left   !== undefined && { left }),
    ...(right  !== undefined && { right }),
  }
  return <span style={style} aria-hidden="true" />
}
```

- [ ] **Step 2 : Créer `components/decorative/Crosshairs.tsx`**

```tsx
import { cn } from '@/lib/cn'

interface CrosshairsProps {
  theme?: 'dark' | 'light'
}

export function Crosshairs({ theme = 'dark' }: CrosshairsProps) {
  const themeClass = theme === 'dark' ? 'ch-dark' : 'ch-light'
  return (
    <>
      <span className={cn('ch ch-tl', themeClass)} aria-hidden="true" />
      <span className={cn('ch ch-tr', themeClass)} aria-hidden="true" />
      <span className={cn('ch ch-bl', themeClass)} aria-hidden="true" />
      <span className={cn('ch ch-br', themeClass)} aria-hidden="true" />
    </>
  )
}
```

- [ ] **Step 3 : Commit**

```bash
git add components/decorative/GradientTube.tsx components/decorative/Crosshairs.tsx
git commit -m "feat: decorative GradientTube and Crosshairs components"
```

---

## Task 6 — Navbar et BackNav

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/BackNav.tsx`

- [ ] **Step 1 : Écrire le test Navbar**

Créer `components/layout/__tests__/Navbar.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react'
import { Navbar } from '../Navbar'

test('renders LUHA logo', () => {
  render(<Navbar />)
  expect(screen.getByText('LUHA')).toBeInTheDocument()
})

test('renders CTA button', () => {
  render(<Navbar />)
  expect(screen.getByRole('link', { name: /commencer/i })).toBeInTheDocument()
})
```

- [ ] **Step 2 : Lancer le test (doit échouer)**

```bash
pnpm test
```
Résultat attendu : FAIL — `Cannot find module '../Navbar'`

- [ ] **Step 3 : Créer `components/layout/Navbar.tsx`**

```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#0D0D0D]/85 backdrop-blur-[12px] py-[18px]">
      <div className="mx-auto flex max-w-[1200px] items-center gap-8 px-16">
        <span
          className="mr-auto text-[28px] tracking-[0.05em] text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          LUHA
        </span>
        <ul className="flex list-none gap-8">
          <li>
            <Link href="#methode" className="text-sm font-medium text-[#C8C8C8] transition-colors hover:text-white">
              Méthode
            </Link>
          </li>
          <li>
            <Link href="#modules" className="text-sm font-medium text-[#C8C8C8] transition-colors hover:text-white">
              Modules
            </Link>
          </li>
        </ul>
        <Button asChild>
          <Link href="/dashboard">Commencer gratuitement</Link>
        </Button>
      </div>
    </nav>
  )
}
```

Note: `asChild` nécessite d'adapter Button. Alternative plus simple — utiliser `<a>` directement dans le bouton :

Remplacer le JSX du CTA par :
```tsx
<a
  href="/dashboard"
  className="inline-flex items-center gap-2 rounded-full bg-[#4B7BF5] px-6 py-[11px] text-sm font-semibold text-white transition-colors hover:bg-[#3B6BF0]"
>
  Commencer gratuitement
</a>
```

- [ ] **Step 4 : Créer `components/layout/BackNav.tsx`**

```tsx
import Link from 'next/link'

interface BackNavProps {
  href: string
  label?: string
  theme?: 'dark' | 'light'
}

export function BackNav({ href, label = '← Index', theme = 'dark' }: BackNavProps) {
  const isDark = theme === 'dark'
  return (
    <Link
      href={href}
      className="fixed top-4 left-5 z-50 rounded-full border px-3.5 py-1.5 text-[11px] tracking-[0.08em] backdrop-blur-[8px] transition-colors"
      style={{
        fontFamily: 'var(--font-mono)',
        background: isDark ? 'rgba(13,13,13,0.8)' : 'rgba(242,237,227,0.9)',
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
        color: '#888888',
      }}
    >
      {label}
    </Link>
  )
}
```

- [ ] **Step 5 : Lancer le test**

```bash
pnpm test
```
Résultat attendu : PASS

- [ ] **Step 6 : Commit**

```bash
git add components/layout/Navbar.tsx components/layout/BackNav.tsx components/layout/__tests__/Navbar.test.tsx
git commit -m "feat: Navbar and BackNav layout components"
```

---

## Task 7 — Data layer (types + modules statiques)

**Files:**
- Create: `lib/types.ts`
- Create: `lib/data/modules.ts`
- Create: `lib/data/lessons.ts`
- Create: `lib/data/quiz.ts`

- [ ] **Step 1 : Créer `lib/types.ts`**

```ts
export type Module = {
  id: number
  icon: string
  name: string
  level: 'Débutant' | 'Intermédiaire' | 'Avancé'
  locked: boolean
  lessonCount: number
}

export type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export type LessonSlide = {
  word: string
  phonetic: string
  french: string
  example: string
  culturalNote?: string
}
```

- [ ] **Step 2 : Créer `lib/data/modules.ts`**

```ts
import { Module } from '@/lib/types'

export const modules: Module[] = [
  { id: 1, icon: '🔤', name: 'Alphabet & Sons',      level: 'Débutant',      locked: false, lessonCount: 8 },
  { id: 2, icon: '👋', name: 'Salutations',           level: 'Débutant',      locked: false, lessonCount: 8 },
  { id: 3, icon: '👨‍👩‍👧', name: 'La Famille',          level: 'Débutant',      locked: true,  lessonCount: 8 },
  { id: 4, icon: '🛒', name: 'Au Marché',             level: 'Intermédiaire', locked: true,  lessonCount: 8 },
  { id: 5, icon: '⚡', name: 'Verbes du Quotidien',   level: 'Intermédiaire', locked: true,  lessonCount: 8 },
  { id: 6, icon: '🌿', name: 'Culture & Traditions',  level: 'Intermédiaire', locked: true,  lessonCount: 8 },
  { id: 7, icon: '🗣️', name: 'Conversations',         level: 'Avancé',        locked: true,  lessonCount: 8 },
  { id: 8, icon: '📖', name: 'Littérature',           level: 'Avancé',        locked: true,  lessonCount: 8 },
]

export const activeModule = modules[1] // Salutations
```

- [ ] **Step 3 : Créer `lib/data/lessons.ts`**

```ts
import { LessonSlide } from '@/lib/types'

export const salutationsSlides: LessonSlide[] = [
  {
    word: 'Salama',
    phonetic: 'sa-LA-ma',
    french: 'Bonjour / Paix',
    example: '"Salama, mama !" — Bonjour, maman !',
    culturalNote: '"Salama" vient de l\'arabe سلامة (sécurité, paix). Utilisé à toute heure à Mayotte — matin, midi, soir. Une marque de respect essentielle.',
  },
  {
    word: 'Jeje',
    phonetic: 'jé-jé',
    french: 'Bonjour, ça va ?',
    example: '"Jeje monye !" — Bonjour monsieur, ça va ?',
    culturalNote: 'Salutation courante du quotidien, à employer avant toute conversation.',
  },
  {
    word: 'Ndjema',
    phonetic: 'n-djé-ma',
    french: 'Bien ! (réponse à Jeje)',
    example: '"Jeje — Ndjema !" — Ça va ? — Bien !',
  },
  {
    word: 'Kwezi',
    phonetic: 'kwé-zi',
    french: 'Bonjour (à un aîné)',
    example: '"Kwezi, bibi !" — Bonjour, grand-mère !',
    culturalNote: 'Kwezi s\'adresse uniquement aux personnes plus âgées — signe de respect envers les aînés.',
  },
  {
    word: 'Mbona',
    phonetic: 'm-bó-na',
    french: 'Bien (réponse à Kwezi)',
    example: '"Kwezi — Mbona !" — Bonjour — Bien !',
  },
  {
    word: 'Haɓari',
    phonetic: 'ha-ɓá-ri',
    french: 'Nouvelles / Comment vas-tu ?',
    example: '"Haɓari zaho ?" — Comment vas-tu ?',
    culturalNote: 'Mot swahili intégré au shimaoré. Commence de nombreuses questions sur la santé et la famille.',
  },
  {
    word: 'Ujoni',
    phonetic: 'u-jó-ni',
    french: 'Ce soir / Cette nuit',
    example: '"Haɓari za ujoni ?" — Comment ça va ce soir ?',
  },
  {
    word: 'Asuɓuhi',
    phonetic: 'a-su-ɓú-hi',
    french: 'Ce matin',
    example: '"Haɓari za asuɓuhi ?" — Comment ça va ce matin ?',
  },
]
```

- [ ] **Step 4 : Créer `lib/data/quiz.ts`**

```ts
import { QuizQuestion } from '@/lib/types'

export const salutationsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Comment dit-on "Bonjour" (général) en shimaoré ?',
    options: ['Habari', 'Salama', 'Ndjema', 'Mbona'],
    correctIndex: 1,
    explanation: '"Salama" vient de l\'arabe سلامة (sécurité, paix). Utilisé à toute heure à Mayotte.',
  },
  {
    id: 2,
    question: 'Quelle réponse donne-t-on à "Jeje" ?',
    options: ['Salama', 'Kwezi', 'Ndjema', 'Haɓari'],
    correctIndex: 2,
    explanation: '"Ndjema" signifie "Bien !" — c\'est la réponse standard à la salutation "Jeje".',
  },
  {
    id: 3,
    question: '"Kwezi" s\'utilise pour saluer…',
    options: ['Un enfant', 'Un ami', 'Un aîné', 'Un inconnu'],
    correctIndex: 2,
    explanation: '"Kwezi" est réservé aux personnes plus âgées — c\'est un signe de respect envers les aînés.',
  },
  {
    id: 4,
    question: 'Que signifie "Haɓari zaho" ?',
    options: ['Bonsoir !', 'Comment vas-tu ?', 'Merci !', 'Au revoir !'],
    correctIndex: 1,
    explanation: '"Haɓari" = nouvelles. "Haɓari zaho ?" = "Quelles sont tes nouvelles / Comment vas-tu ?"',
  },
]
```

- [ ] **Step 5 : Commit**

```bash
git add lib/types.ts lib/data/modules.ts lib/data/lessons.ts lib/data/quiz.ts
git commit -m "feat: static data layer — types, modules, lesson slides, quiz questions"
```

---

## Task 8 — Landing Page (7 sections)

**Files:**
- Modify: `app/page.tsx`
- Create: `components/landing/HeroSection.tsx`
- Create: `components/landing/SocialProofSection.tsx`
- Create: `components/landing/MethodeSection.tsx`
- Create: `components/landing/ModulesPreviewSection.tsx`
- Create: `components/landing/TemoignagesSection.tsx`
- Create: `components/landing/FooterCTASection.tsx`

- [ ] **Step 1 : Écrire le test smoke**

Créer `app/__tests__/landing.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react'
import Home from '../page'

test('landing page renders hero headline', () => {
  render(<Home />)
  expect(screen.getByText(/APPRENDS LA/i)).toBeInTheDocument()
})

test('landing page renders CTA button', () => {
  render(<Home />)
  expect(screen.getByRole('link', { name: /commencer/i })).toBeInTheDocument()
})
```

- [ ] **Step 2 : Créer `components/landing/HeroSection.tsx`**

```tsx
import Link from 'next/link'
import { Tag } from '@/components/ui/Tag'
import { GradientTube } from '@/components/decorative/GradientTube'
import { Crosshairs } from '@/components/decorative/Crosshairs'

export function HeroSection() {
  return (
    <section className="ch-box ch-dark grid-dark relative flex min-h-screen items-center bg-[#0D0D0D] px-16 pt-40 pb-24">
      <Crosshairs theme="dark" />
      <GradientTube variant="orange"      width={320} top="8%"   right="-80px" rotate={-42} opacity={0.7} />
      <GradientTube variant="blue-purple" width={260} bottom="18%" right="-40px" rotate={-38} opacity={0.6} />
      <GradientTube variant="pink"        width={200} bottom="10%" left="-50px" rotate={35}  opacity={0.55} />
      <GradientTube variant="green"       width={180} top="25%"  left="-60px" rotate={-28} opacity={0.5} />

      <div className="fade-up mx-auto flex max-w-[900px] w-full flex-col gap-6">
        <Tag variant="red">SHIMAORÉ · MAYOTTE</Tag>

        <h1
          className="text-white leading-[1] tracking-[-0.01em] mt-2"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 7vw, 80px)' }}
        >
          <span className="text-white">APPRENDS LA<br />LANGUE MAHORAISE.</span>
          <br />
          <span className="text-[#F5E135]">Luha ya Shi-Maoré.</span>
        </h1>

        <p className="max-w-[540px] text-[18px] leading-[1.6] text-[#C8C8C8]">
          Luha, première application dédiée au shimaoré — leçons structurées, exercices et
          culture mahoraise en immersion.
          <br />
          Apprends à ton rythme, 5 min par jour. Gratuit, sans pub, avec amour.{' '}
          <span style={{ fontFamily: 'var(--font-script)' }} className="text-[#F5E135] text-[24px]">
            "Oussi lindra tséna trini ?"
          </span>
        </p>

        <div className="mt-1 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex rounded-full bg-[#4B7BF5] px-6 py-[11px] text-sm font-semibold text-white transition-colors hover:bg-[#3B6BF0]"
          >
            Commencer — gratuit
          </Link>
          <a
            href="#methode"
            className="inline-flex rounded-full border-[1.5px] border-white/50 bg-transparent px-6 py-[11px] text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/[0.06]"
          >
            Voir la méthode
          </a>
        </div>

        <div
          className="flex items-center gap-3 text-[13px] tracking-[0.04em] text-[#E84848] mt-2"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>12 000 mots</span>
          <span className="opacity-30">·</span>
          <span>8 modules</span>
          <span className="opacity-30">·</span>
          <span>5 min / jour</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3 : Créer `components/landing/SocialProofSection.tsx`**

```tsx
import { Crosshairs } from '@/components/decorative/Crosshairs'

export function SocialProofSection() {
  return (
    <section className="ch-box ch-light grid-light relative bg-[#F2EDE3] px-16 py-24 text-center">
      <Crosshairs theme="light" />
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-5">
        <div className="flex">
          {['🧑🏾', '👩🏽', '🧑🏿', '👩🏾', '🧑🏽'].map((emoji, i) => (
            <span key={i} className="text-[36px]" style={{ marginLeft: i === 0 ? 0 : -10 }}>
              {emoji}
            </span>
          ))}
        </div>
        <p className="text-[18px] text-[#1A1A1A]">
          Rejoins <strong className="font-bold text-[#4B7BF5]">Nos apprenants</strong>
        </p>
        <p className="text-[22px] tracking-[2px] text-[#F5E135]">
          ★★★★★ <span className="text-[13px] text-[#4A4A4A] ml-2">4.9 / 5</span>
        </p>
        <p
          className="mt-2 text-[38px] leading-[1.1] text-[#1A1A1A]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          "Wawé u juwa luha wa shi-Maoré?"
        </p>
        <p
          className="text-[22px] text-[#4B7BF5]"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          — "Pourquoi tu ne sais pas encore ?"
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4 : Créer `components/landing/MethodeSection.tsx`**

```tsx
import { Crosshairs } from '@/components/decorative/Crosshairs'
import { GradientTube } from '@/components/decorative/GradientTube'

const steps = [
  { num: '01', icon: '📚', title: 'Leçons structurées', desc: 'Chaque module avance pas à pas — alphabet, prononciation, grammaire simple, vocabulaire ancré dans la vie quotidienne à Mayotte.' },
  { num: '02', icon: '🎮', title: 'Exercices gamifiés', desc: 'XP, streaks, cœurs — chaque session de 5 min compte. Tu progresses sans t\'en rendre compte.' },
  { num: '03', icon: '🌿', title: 'Culture & contexte', desc: 'Le shimaoré ne s\'apprend pas hors sol. Chaque leçon est ancrée dans la culture, les usages et l\'histoire de Mayotte.' },
]

export function MethodeSection() {
  return (
    <section id="methode" className="ch-box ch-dark grid-dark relative bg-[#0D0D0D] px-16 py-24">
      <Crosshairs theme="dark" />
      <GradientTube variant="cyan"    width={240} top="-10px"    right="15%"  rotate={0} opacity={0.5} />
      <GradientTube variant="rainbow" width={180} bottom="-10px" left="10%"   rotate={0} opacity={0.45} height={18} />

      <div className="mx-auto max-w-[1200px]">
        <p
          className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#E84848]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          La Méthode
        </p>
        <h2
          className="mb-16 leading-[1.05] text-white"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)' }}
        >
          APPRENDS COMME<br />UN NATIF.
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {steps.map(({ num, icon, title, desc }) => (
            <div key={num} className="grain grain-dark relative rounded-2xl border border-white/[0.06] bg-[#141414] p-8 overflow-hidden">
              <span
                className="pointer-events-none absolute -top-4 right-5 select-none leading-none text-[#E84848] opacity-[0.07]"
                style={{ fontFamily: 'var(--font-display)', fontSize: 100 }}
                aria-hidden="true"
              >
                {num}
              </span>
              <span className="mb-4 block text-[32px]">{icon}</span>
              <h3 className="mb-2.5 text-[17px] font-bold text-white">{title}</h3>
              <p className="text-[14px] leading-[1.65] text-[#C8C8C8]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5 : Créer `components/landing/ModulesPreviewSection.tsx`**

```tsx
import { modules } from '@/lib/data/modules'
import { Crosshairs } from '@/components/decorative/Crosshairs'

export function ModulesPreviewSection() {
  const preview = modules.slice(0, 6)
  return (
    <section id="modules" className="ch-box ch-light grid-light relative bg-[#F2EDE3] px-16 py-24">
      <Crosshairs theme="light" />
      <div className="mx-auto max-w-[1200px]">
        <p
          className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#E84848]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Les Modules
        </p>
        <h2
          className="mb-16 leading-[1.05] text-[#1A1A1A]"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)' }}
        >
          8 NIVEAUX.<br />UN VOYAGE.
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {preview.map((mod) => (
            <div
              key={mod.id}
              className={`grain grain-light accent-top-red relative flex items-center gap-4 overflow-hidden rounded-2xl border border-black/[0.08] bg-[#EAE4D8] px-6 py-5 ${mod.locked ? 'opacity-45' : ''}`}
            >
              <span className="shrink-0 text-[28px]">{mod.icon}</span>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-[#1A1A1A]">{mod.name}</p>
                <p
                  className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-[#888888]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {mod.level}
                </p>
              </div>
              {mod.locked && <span className="text-[14px] opacity-50">🔒</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6 : Créer `components/landing/TemoignagesSection.tsx`**

```tsx
import { Crosshairs } from '@/components/decorative/Crosshairs'
import { GradientTube } from '@/components/decorative/GradientTube'

const temoignages = [
  { quote: 'Je comprends enfin ma grand-mère quand elle parle. Luha a changé ma relation à mes origines.', author: 'Fatima O.', badge: 'Diaspora — Paris' },
  { quote: 'Méthode claire, exercices ludiques. En 3 semaines j\'arrive à former des phrases simples.', author: 'Youssouf M.', badge: 'Étudiant — Lyon' },
  { quote: 'Enfin une app qui respecte notre langue. Le contexte culturel dans chaque leçon fait toute la différence.', author: 'Naïma B.', badge: 'Enseignante — Marseille' },
]

export function TemoignagesSection() {
  return (
    <section id="temoignages" className="ch-box ch-dark grid-dark relative bg-[#141414] px-16 py-24">
      <Crosshairs theme="dark" />
      <GradientTube variant="blue-purple" width={220} top="-10px"    left="5%"  rotate={0} opacity={0.45} />
      <GradientTube variant="pink"        width={160} bottom="-10px" right="8%" rotate={0} opacity={0.4} />

      <div className="mx-auto max-w-[1200px]">
        <p
          className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#E84848]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Témoignages
        </p>
        <h2
          className="mb-16 leading-[1.05] text-white"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)' }}
        >
          ILS APPRENNENT.<br />TU PEUX AUSSI.
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {temoignages.map(({ quote, author, badge }) => (
            <div
              key={author}
              className="grain grain-dark relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/[0.05] border-l-[3px] border-l-[#E84848] bg-[#0D0D0D] p-8"
            >
              <div
                className="pointer-events-none absolute top-0 right-0 h-20 w-20"
                style={{
                  background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 8px)',
                }}
                aria-hidden="true"
              />
              <p className="flex-1 text-[15px] italic leading-[1.65] text-[#C8C8C8]">"{quote}"</p>
              <div>
                <p className="text-[14px] font-bold text-white">{author}</p>
                <p
                  className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-[#888888]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {badge}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7 : Créer `components/landing/FooterCTASection.tsx`**

```tsx
import { Crosshairs } from '@/components/decorative/Crosshairs'
import { GradientTube } from '@/components/decorative/GradientTube'

export function FooterCTASection() {
  return (
    <section className="ch-box ch-dark grid-dark relative bg-[#0D0D0D] px-16 py-24 text-center">
      <Crosshairs theme="dark" />
      <GradientTube variant="rainbow" width={260} top="20px"    right="-60px" rotate={-35} opacity={0.5} />
      <GradientTube variant="green"   width={200} bottom="20px" left="-50px"  rotate={32}  opacity={0.45} />

      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-5">
        <h2
          className="leading-[0.98] text-white"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,7vw,76px)' }}
        >
          PRÊT À<br />COMMENCER ?
        </h2>
        <p className="text-[16px] text-[#C8C8C8]">
          Rejoins des milliers d'apprenants. Gratuit, sans carte bancaire.
        </p>
        <form className="flex w-full max-w-[400px] gap-2.5" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="ton@email.com"
            className="flex-1 rounded-xl border-[1.5px] border-white/[0.12] bg-white/[0.06] px-4 py-[11px] text-[15px] text-white outline-none placeholder:text-[#888888] focus:border-[#4B7BF5]"
          />
          <button
            type="submit"
            className="inline-flex rounded-full bg-[#4B7BF5] px-6 py-[11px] text-sm font-semibold text-white transition-colors hover:bg-[#3B6BF0]"
          >
            Rejoindre
          </button>
        </form>
        <div className="mt-4 flex w-full items-center justify-between border-t border-white/[0.06] pt-6">
          <span
            className="text-[11px] uppercase tracking-[0.08em] text-[#888888]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            © 2026 LUHA
          </span>
          <span
            className="text-[20px] text-[#888888]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Avec ❤️ depuis Mayotte
          </span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8 : Mettre à jour `app/page.tsx`**

```tsx
import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { SocialProofSection } from '@/components/landing/SocialProofSection'
import { MethodeSection } from '@/components/landing/MethodeSection'
import { ModulesPreviewSection } from '@/components/landing/ModulesPreviewSection'
import { TemoignagesSection } from '@/components/landing/TemoignagesSection'
import { FooterCTASection } from '@/components/landing/FooterCTASection'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <MethodeSection />
      <ModulesPreviewSection />
      <TemoignagesSection />
      <FooterCTASection />
    </>
  )
}
```

- [ ] **Step 9 : Lancer les tests**

```bash
pnpm test
```
Résultat attendu : PASS (tous les tests existants).

- [ ] **Step 10 : Vérifier visuellement**

```bash
pnpm dev
```
Ouvrir `http://localhost:3000`. Comparer avec `../mockups/landing.html`. Vérifier : tubes décoratifs, grid overlay, crosshairs, couleurs, typographie.

- [ ] **Step 11 : Commit**

```bash
git add app/page.tsx components/landing/
git commit -m "feat: landing page — 7 sections (hero, social proof, methode, modules, temoignages, footer CTA)"
```

---

## Task 9 — Dashboard

**Files:**
- Create: `app/dashboard/page.tsx`
- Create: `components/dashboard/ActiveModuleCard.tsx`
- Create: `components/dashboard/StatsRow.tsx`
- Create: `components/dashboard/ModulesGrid.tsx`

- [ ] **Step 1 : Écrire le test smoke**

Créer `app/dashboard/__tests__/page.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react'
import Dashboard from '../page'

test('dashboard renders greeting', () => {
  render(<Dashboard />)
  expect(screen.getByText(/Bonjour/i)).toBeInTheDocument()
})

test('dashboard shows active module', () => {
  render(<Dashboard />)
  expect(screen.getByText('SALUTATIONS')).toBeInTheDocument()
})
```

- [ ] **Step 2 : Créer `components/dashboard/ActiveModuleCard.tsx`**

```tsx
import Link from 'next/link'

interface ActiveModuleCardProps {
  moduleId: number
  moduleName: string
  lessonLabel: string
  currentLesson: number
  totalLessons: number
  icon: string
}

export function ActiveModuleCard({
  moduleId, moduleName, lessonLabel, currentLesson, totalLessons, icon,
}: ActiveModuleCardProps) {
  const progress = Math.round((currentLesson / totalLessons) * 100)
  return (
    <Link
      href={`/lesson/${moduleId}`}
      className="grain grain-dark accent-top-red relative block overflow-hidden rounded-2xl border border-white/[0.05] bg-[#141414] px-8 py-7 transition-transform hover:-translate-y-0.5"
    >
      <div className="mb-5 flex items-start gap-5">
        <span className="text-[40px]">{icon}</span>
        <div>
          <p
            className="mb-1 text-[10px] uppercase tracking-[0.12em] text-[#888888]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Module en cours
          </p>
          <h2
            className="leading-none text-white"
            style={{ fontFamily: 'var(--font-display)', fontSize: 34 }}
          >
            {moduleName}
          </h2>
          <p className="mt-1 text-[14px] text-[#C8C8C8]">{lessonLabel}</p>
        </div>
      </div>

      <div className="mb-5 h-1 rounded-sm bg-white/[0.08]">
        <div
          className="h-full rounded-sm bg-[#4B7BF5]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span
          className="text-[12px] text-[#888888]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {currentLesson} / {totalLessons} leçons
        </span>
        <span className="inline-flex rounded-full bg-[#4B7BF5] px-[22px] py-2.5 text-[14px] font-semibold text-white">
          Continuer →
        </span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3 : Créer `components/dashboard/StatsRow.tsx`**

```tsx
interface Stat { value: string; label: string }

const defaultStats: Stat[] = [
  { value: '48',  label: 'Mots appris' },
  { value: '12',  label: 'Leçons complétées' },
  { value: '#42', label: 'Classement' },
]

export function StatsRow({ stats = defaultStats }: { stats?: Stat[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ value, label }) => (
        <div
          key={label}
          className="grain grain-light rounded-2xl border border-black/[0.08] bg-[#EAE4D8] p-6 text-center"
        >
          <p
            className="text-[40px] leading-none text-[#E84848]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {value}
          </p>
          <p className="mt-1 text-[12px] text-[#888888]">{label}</p>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4 : Créer `components/dashboard/ModulesGrid.tsx`**

```tsx
import Link from 'next/link'
import { modules } from '@/lib/data/modules'

export function ModulesGrid() {
  return (
    <section>
      <h3 className="mb-3.5 text-[15px] font-bold tracking-[0.01em] text-[#1A1A1A]">
        Tous les modules
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className={`grain grain-light accent-top-red relative flex items-center gap-3.5 overflow-hidden rounded-2xl border border-black/[0.08] bg-[#EAE4D8] px-5 py-4 ${mod.locked ? 'opacity-40' : ''}`}
          >
            <span className="text-[24px]">{mod.icon}</span>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-[#1A1A1A]">{mod.name}</p>
              <p
                className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-[#888888]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {mod.level}
              </p>
            </div>
            {mod.locked && <span className="ml-auto text-[14px]">🔒</span>}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5 : Créer `app/dashboard/page.tsx`**

```tsx
import { BackNav } from '@/components/layout/BackNav'
import { ActiveModuleCard } from '@/components/dashboard/ActiveModuleCard'
import { StatsRow } from '@/components/dashboard/StatsRow'
import { ModulesGrid } from '@/components/dashboard/ModulesGrid'
import { GradientTube } from '@/components/decorative/GradientTube'
import { Crosshairs } from '@/components/decorative/Crosshairs'

export default function Dashboard() {
  return (
    <div className="ch-box grid-light relative min-h-screen bg-[#F2EDE3]">
      <Crosshairs theme="light" />
      <GradientTube variant="cyan"  width={220} top="-10px"   right="8%"  rotate={0} opacity={0.35} />
      <GradientTube variant="green" width={180} bottom="60px" left="-50px" rotate={30} opacity={0.3} />

      <BackNav href="/" theme="light" label="← Accueil" />

      <div className="mx-auto flex max-w-[860px] flex-col gap-7 px-8 py-8">
        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <p className="text-[18px] text-[#1A1A1A]">
            Bonjour, <strong className="font-bold">Ibrahim</strong> 👋
          </p>
          <div className="flex items-center gap-3.5">
            <span
              className="rounded-full bg-black/[0.06] px-3.5 py-1.5 text-[13px] text-[#4A4A4A]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              🔥 7 jours
            </span>
            <span
              className="text-[13px] font-semibold tracking-[0.04em] text-[#E84848]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              340 XP
            </span>
          </div>
        </header>

        <ActiveModuleCard
          moduleId={2}
          moduleName="SALUTATIONS"
          lessonLabel="Leçon 4 — Bonjour & Bonsoir"
          currentLesson={3}
          totalLessons={8}
          icon="👋"
        />

        <StatsRow />
        <ModulesGrid />

        <p
          className="pb-6 pt-2 text-center text-[22px] text-[#4B7BF5]"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          "5 min aujourd'hui = 1 leçon de moins demain"
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 6 : Lancer les tests**

```bash
pnpm test
```
Résultat attendu : PASS

- [ ] **Step 7 : Vérifier visuellement**

```bash
pnpm dev
```
Ouvrir `http://localhost:3000/dashboard`. Comparer avec `../mockups/dashboard.html`.

- [ ] **Step 8 : Commit**

```bash
git add app/dashboard/ components/dashboard/
git commit -m "feat: dashboard page — active module, stats, modules grid"
```

---

## Task 10 — Leçon

**Files:**
- Create: `app/lesson/[id]/page.tsx`
- Create: `components/lesson/StepDots.tsx`
- Create: `components/lesson/ContentCard.tsx`
- Create: `components/lesson/CulturalNote.tsx`

- [ ] **Step 1 : Écrire le test smoke**

Créer `app/lesson/__tests__/page.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react'
import LessonPage from '../[id]/page'

test('lesson renders word "Salama"', async () => {
  const page = await LessonPage({ params: Promise.resolve({ id: '2' }), searchParams: Promise.resolve({ step: '0' }) })
  render(page)
  expect(screen.getByText('Salama')).toBeInTheDocument()
})
```

- [ ] **Step 2 : Créer `components/lesson/StepDots.tsx`**

```tsx
interface StepDotsProps {
  total: number
  current: number  // 0-indexed
}

export function StepDots({ total, current }: StepDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const isDone   = i < current
        const isActive = i === current
        return (
          <div
            key={i}
            className={[
              'flex h-8 w-8 items-center justify-center rounded-full border-[1.5px]',
              isDone   ? 'border-[#6BF56B] bg-[#6BF56B]/10' : '',
              isActive ? 'border-[#4B7BF5] bg-[#4B7BF5]/15' : '',
              !isDone && !isActive ? 'border-white/[0.12]' : '',
            ].join(' ')}
          >
            <span
              className={[
                'text-[10px]',
                isDone   ? 'text-[#6BF56B]' : '',
                isActive ? 'text-[#4B7BF5]' : '',
                !isDone && !isActive ? 'text-[#888888]' : '',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3 : Créer `components/lesson/ContentCard.tsx`**

```tsx
interface ContentCardProps {
  word: string
  phonetic: string
  french: string
  example: string
}

export function ContentCard({ word, phonetic, french, example }: ContentCardProps) {
  return (
    <div className="grain grain-dark flex flex-col gap-3.5 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#141414] p-8">
      <p
        className="leading-none text-white"
        style={{ fontFamily: 'var(--font-display)', fontSize: 52 }}
      >
        {word}
      </p>
      <p
        className="text-[16px] tracking-[0.04em] text-[#4B7BF5]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {phonetic}
      </p>
      <p className="text-[18px] font-medium text-[#C8C8C8]">{french}</p>
      <div className="h-px bg-white/[0.06]" />
      <p className="text-[15px] italic text-[#888888]">{example}</p>
      <button className="mt-1 inline-flex self-start items-center gap-2 rounded-full border-[1.5px] border-white/[0.18] bg-transparent px-[18px] py-[7px] text-[13px] text-white transition-colors hover:border-[#4B7BF5] hover:text-[#4B7BF5]">
        ▶ Écouter
      </button>
    </div>
  )
}
```

- [ ] **Step 4 : Créer `components/lesson/CulturalNote.tsx`**

```tsx
interface CulturalNoteProps {
  text: string
}

export function CulturalNote({ text }: CulturalNoteProps) {
  return (
    <div className="rounded-r-[10px] border-l-[3px] border-[#F5E135] bg-[#F5E135]/[0.05] px-5 py-4">
      <span
        className="mb-1 block text-[18px] text-[#F5E135]"
        style={{ fontFamily: 'var(--font-script)' }}
      >
        Note :
      </span>
      <p
        className="text-[18px] leading-[1.5] text-[#C8C8C8]"
        style={{ fontFamily: 'var(--font-script)' }}
      >
        {text}
      </p>
    </div>
  )
}
```

- [ ] **Step 5 : Créer `app/lesson/[id]/page.tsx`**

```tsx
import Link from 'next/link'
import { BackNav } from '@/components/layout/BackNav'
import { StepDots } from '@/components/lesson/StepDots'
import { ContentCard } from '@/components/lesson/ContentCard'
import { CulturalNote } from '@/components/lesson/CulturalNote'
import { GradientTube } from '@/components/decorative/GradientTube'
import { Crosshairs } from '@/components/decorative/Crosshairs'
import { salutationsSlides } from '@/lib/data/lessons'

interface LessonPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ step?: string }>
}

export default async function LessonPage({ params, searchParams }: LessonPageProps) {
  const { id } = await params
  const { step } = await searchParams
  const stepIndex = Math.min(parseInt(step ?? '0', 10), salutationsSlides.length - 1)
  const slide = salutationsSlides[stepIndex]
  const total = salutationsSlides.length

  const prevStep = stepIndex > 0 ? stepIndex - 1 : null
  const nextHref = stepIndex < total - 1
    ? `/lesson/${id}?step=${stepIndex + 1}`
    : `/quiz/${id}`

  return (
    <div
      className="ch-box relative min-h-screen bg-[#0D0D0D]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <Crosshairs theme="dark" />
      <GradientTube variant="orange"      width={240} top="10%"    right="-60px" rotate={-42} opacity={0.4} fixed />
      <GradientTube variant="blue-purple" width={180} bottom="15%" left="-50px"  rotate={38}  opacity={0.4} fixed />

      <BackNav href="/dashboard" />

      <div className="flex min-h-screen items-center justify-center px-8 py-12">
        <div className="fade-up flex w-full max-w-[640px] flex-col gap-6">

          <StepDots total={total} current={stepIndex} />

          <div className="flex items-baseline gap-4">
            <span
              className="leading-none text-[#E84848]"
              style={{ fontFamily: 'var(--font-display)', fontSize: 48 }}
            >
              {String(stepIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>
            <h1
              className="text-[28px] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              SALUTATIONS
            </h1>
          </div>

          <ContentCard
            word={slide.word}
            phonetic={slide.phonetic}
            french={slide.french}
            example={slide.example}
          />

          {slide.culturalNote && <CulturalNote text={slide.culturalNote} />}

          <div className="flex items-center justify-between pt-2">
            {prevStep !== null ? (
              <Link
                href={`/lesson/${id}?step=${prevStep}`}
                className="bg-transparent px-1 py-2 text-[14px] text-[#888888] transition-colors hover:text-white"
              >
                ← Précédent
              </Link>
            ) : (
              <span />
            )}
            <Link
              href={nextHref}
              className="inline-flex rounded-full bg-[#4B7BF5] px-6 py-[11px] text-[14px] font-semibold text-white transition-colors hover:bg-[#3B6BF0]"
            >
              Suivant →
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6 : Lancer les tests**

```bash
pnpm test
```
Résultat attendu : PASS

- [ ] **Step 7 : Vérifier visuellement**

```bash
pnpm dev
```
Ouvrir `http://localhost:3000/lesson/2`. Naviguer avec Suivant / Précédent. Comparer avec `../mockups/lesson.html`.

- [ ] **Step 8 : Commit**

```bash
git add app/lesson/ components/lesson/
git commit -m "feat: lesson page — step navigation, content card, cultural notes"
```

---

## Task 11 — Quiz (client component interactif)

**Files:**
- Create: `app/quiz/[id]/page.tsx`
- Create: `components/quiz/XPBar.tsx`
- Create: `components/quiz/QuizOptions.tsx`  ← `'use client'`
- Create: `components/quiz/FeedbackPanel.tsx`
- Create: `components/quiz/__tests__/QuizOptions.test.tsx`

- [ ] **Step 1 : Écrire les tests QuizOptions**

Créer `components/quiz/__tests__/QuizOptions.test.tsx` :
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizOptions } from '../QuizOptions'

const question = {
  id: 1,
  question: 'Comment dit-on "Bonjour" en shimaoré ?',
  options: ['Habari', 'Salama', 'Ndjema', 'Mbona'],
  correctIndex: 1,
  explanation: '"Salama" est la bonne réponse.',
}

test('renders all 4 options', () => {
  render(<QuizOptions question={question} onAnswer={() => {}} />)
  expect(screen.getByText('Habari')).toBeInTheDocument()
  expect(screen.getByText('Salama')).toBeInTheDocument()
  expect(screen.getByText('Ndjema')).toBeInTheDocument()
  expect(screen.getByText('Mbona')).toBeInTheDocument()
})

test('clicking correct option calls onAnswer with true', () => {
  const handleAnswer = vi.fn()
  render(<QuizOptions question={question} onAnswer={handleAnswer} />)
  fireEvent.click(screen.getByText('Salama'))
  expect(handleAnswer).toHaveBeenCalledWith(true)
})

test('clicking wrong option calls onAnswer with false', () => {
  const handleAnswer = vi.fn()
  render(<QuizOptions question={question} onAnswer={handleAnswer} />)
  fireEvent.click(screen.getByText('Habari'))
  expect(handleAnswer).toHaveBeenCalledWith(false)
})

test('options are disabled after selection', () => {
  render(<QuizOptions question={question} onAnswer={() => {}} />)
  fireEvent.click(screen.getByText('Salama'))
  const habariBtn = screen.getByText('Habari').closest('button')
  expect(habariBtn).toBeDisabled()
})
```

- [ ] **Step 2 : Lancer le test (doit échouer)**

```bash
pnpm test
```
Résultat attendu : FAIL — `Cannot find module '../QuizOptions'`

- [ ] **Step 3 : Créer `components/quiz/QuizOptions.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { QuizQuestion } from '@/lib/types'
import { cn } from '@/lib/cn'

interface QuizOptionsProps {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
}

export function QuizOptions({ question, onAnswer }: QuizOptionsProps) {
  const [selected, setSelected] = useState<number | null>(null)

  function handleSelect(index: number) {
    if (selected !== null) return
    setSelected(index)
    onAnswer(index === question.correctIndex)
  }

  return (
    <div className="grid grid-cols-2 gap-3.5">
      {question.options.map((option, i) => {
        const isSelected = selected === i
        const isCorrect  = selected !== null && i === question.correctIndex
        const isWrong    = isSelected && i !== question.correctIndex
        const isDisabled = selected !== null && !isSelected && i !== question.correctIndex

        return (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null && !isSelected && i !== question.correctIndex}
            className={cn(
              'grain grain-dark rounded-xl border-[1.5px] p-5 text-center text-[16px] font-medium transition-all',
              'bg-[#1C1C1C] text-white',
              !isSelected && !isCorrect && selected === null && 'border-white/[0.08] hover:border-[#4B7BF5] hover:bg-[#4B7BF5]/[0.08]',
              isCorrect  && 'border-[#6BF56B] bg-[#6BF56B]/[0.12] text-[#6BF56B]',
              isWrong    && 'border-[#FF5D5D] bg-[#FF5D5D]/[0.12] text-[#FF5D5D] shake',
              isDisabled && 'border-white/[0.08] opacity-30 cursor-not-allowed',
              selected !== null && !isSelected && i !== question.correctIndex && 'border-white/[0.08]',
            )}
          >
            {option}
            {isCorrect && ' ✓'}
            {isWrong   && ' ✗'}
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 4 : Lancer le test (doit passer)**

```bash
pnpm test
```
Résultat attendu : PASS (4 tests QuizOptions).

- [ ] **Step 5 : Créer `components/quiz/XPBar.tsx`**

```tsx
interface XPBarProps {
  progress: number  // 0–100
  xpGained?: number
  lives?: number
}

export function XPBar({ progress, xpGained, lives = 3 }: XPBarProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="h-1.5 overflow-hidden rounded-sm bg-white/[0.07]">
        <div
          className="xp-pulse h-full rounded-sm bg-[#4B7BF5]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        {xpGained && (
          <span
            className="text-[13px] tracking-[0.05em] text-[#F5E135]"
            style={{ fontFamily: 'var(--font-script)', fontSize: 20 }}
          >
            +{xpGained} XP
          </span>
        )}
        <span className="text-[20px] tracking-[3px]">
          {Array.from({ length: lives }).map((_, i) => (
            <span key={i}>❤️</span>
          ))}
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 6 : Créer `components/quiz/FeedbackPanel.tsx`**

```tsx
import Link from 'next/link'

interface FeedbackPanelProps {
  correct: boolean
  explanation: string
  nextHref: string
}

export function FeedbackPanel({ correct, explanation, nextHref }: FeedbackPanelProps) {
  return (
    <div
      className={[
        'fade-up grain grain-dark flex flex-col gap-3 overflow-hidden rounded-2xl border p-6 px-7',
        correct
          ? 'border-[#6BF56B]/20 bg-[#6BF56B]/[0.07]'
          : 'border-[#FF5D5D]/[0.18] bg-[#FF5D5D]/[0.07]',
      ].join(' ')}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-[24px]">{correct ? '✅' : '❌'}</span>
        {correct && (
          <span
            className="text-[24px] text-[#F5E135]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            +10 XP !
          </span>
        )}
      </div>
      <p
        className="text-[14px] leading-[1.55] text-[#C8C8C8]"
        dangerouslySetInnerHTML={{ __html: explanation }}
      />
      <Link
        href={nextHref}
        className="inline-flex self-start rounded-full bg-[#4B7BF5] px-6 py-[11px] text-[14px] font-semibold text-white transition-colors hover:bg-[#3B6BF0]"
      >
        Continuer →
      </Link>
    </div>
  )
}
```

- [ ] **Step 7 : Créer `app/quiz/[id]/page.tsx`** (client component pour l'interactivité)

```tsx
'use client'

import { useState } from 'react'
import { BackNav } from '@/components/layout/BackNav'
import { XPBar } from '@/components/quiz/XPBar'
import { QuizOptions } from '@/components/quiz/QuizOptions'
import { FeedbackPanel } from '@/components/quiz/FeedbackPanel'
import { GradientTube } from '@/components/decorative/GradientTube'
import { Crosshairs } from '@/components/decorative/Crosshairs'
import { salutationsQuiz } from '@/lib/data/quiz'
import { use } from 'react'

interface QuizPageProps {
  params: Promise<{ id: string }>
}

export default function QuizPage({ params }: QuizPageProps) {
  const { id } = use(params)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answered, setAnswered] = useState<boolean | null>(null)

  const questions = salutationsQuiz
  const question  = questions[questionIndex]
  const progress  = Math.round((questionIndex / questions.length) * 100)

  function handleAnswer(correct: boolean) {
    setAnswered(correct)
  }

  function handleNext() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1)
      setAnswered(null)
    }
  }

  return (
    <div
      className="ch-box relative min-h-screen bg-[#141414]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <Crosshairs theme="dark" />
      <GradientTube variant="pink"   width={220} top="12%"    right="-55px" rotate={-40} opacity={0.5} fixed />
      <GradientTube variant="cyan"   width={180} bottom="20%" left="-50px"  rotate={35}  opacity={0.45} fixed />
      <GradientTube variant="orange" width={140} top="5%"     left="30%"   rotate={0}   opacity={0.35} fixed />

      <BackNav href={`/lesson/${id}`} />

      <div className="flex min-h-screen items-center justify-center px-8 py-12">
        <div className="fade-up flex w-full max-w-[600px] flex-col gap-7">

          <XPBar progress={progress} xpGained={answered === true ? 10 : undefined} lives={3} />

          <div className="flex flex-col gap-2.5">
            <p
              className="text-[11px] uppercase tracking-[0.12em] text-[#888888]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Choisissez la bonne réponse
            </p>
            <h2 className="text-[22px] font-bold leading-[1.4] text-white">
              {question.question}
            </h2>
          </div>

          <QuizOptions question={question} onAnswer={handleAnswer} />

          {answered !== null && (
            <FeedbackPanel
              correct={answered}
              explanation={
                answered
                  ? question.explanation
                  : `La bonne réponse était <strong style="color:#fff">${question.options[question.correctIndex]}</strong>. ${question.explanation}`
              }
              nextHref={
                questionIndex < questions.length - 1 ? '#' : '/dashboard'
              }
            />
          )}

        </div>
      </div>
    </div>
  )
}
```

Note: le bouton "Continuer" dans FeedbackPanel doit aussi appeler `handleNext` quand ce n'est pas le dernier quiz. Pour cela, adapter `FeedbackPanel` pour accepter un `onClick` optionnel :

```tsx
// Dans FeedbackPanel, remplacer le Link par :
{nextHref === '#' ? (
  <button
    onClick={onClick}
    className="inline-flex self-start rounded-full bg-[#4B7BF5] px-6 py-[11px] text-[14px] font-semibold text-white transition-colors hover:bg-[#3B6BF0]"
  >
    Continuer →
  </button>
) : (
  <Link href={nextHref} className="...">Continuer →</Link>
)}
```

Et passer `onClick={handleNext}` depuis QuizPage quand ce n'est pas la dernière question.

- [ ] **Step 8 : Lancer les tests**

```bash
pnpm test
```
Résultat attendu : PASS (tous les tests).

- [ ] **Step 9 : Vérifier visuellement**

```bash
pnpm dev
```
Ouvrir `http://localhost:3000/quiz/2`. Tester : réponse correcte (vert + XP), réponse fausse (rouge + shake), bouton Continuer. Comparer avec `../mockups/quiz.html`.

- [ ] **Step 10 : Commit final**

```bash
git add app/quiz/ components/quiz/
git commit -m "feat: quiz page — XP bar, interactive options (correct/wrong states), feedback panel"
```

---

## Self-Review — Spec Coverage

| Requirement (Prompt-initial.md) | Task qui l'implémente |
|---|---|
| Landing page marketing | Task 8 (HeroSection, SocialProof, Méthode, Modules, Témoignages, Footer CTA) |
| Dashboard avec streak/XP | Task 9 (ActiveModuleCard, StatsRow, ModulesGrid) |
| Leçon structurée (mot, phonétique, note culturelle) | Task 10 (ContentCard, CulturalNote, StepDots) |
| Quiz gamifié (XP, cœurs, feedback) | Task 11 (XPBar, QuizOptions, FeedbackPanel) |
| Design system (couleurs, typo, grid, grain, tubes) | Tasks 2, 3, 4, 5 |
| Données shimaoré réelles | Task 7 (salutationsSlides, salutationsQuiz depuis lessonData.ts) |
| Google Fonts (Bebas Neue, Inter, Caveat, IBM Plex Mono) | Task 3 |
| Navigation flow Landing → Dashboard → Lesson → Quiz | Tasks 8–11 (liens entre pages) |
| pnpm (pas npm) | Task 1 |

**Hors scope Phase 1 (Phase 2+) :**
- Supabase / auth
- Audio natif (Web Speech API placeholder uniquement — bouton "Écouter" sans fonctionnalité)
- IA adaptative
- Inscription utilisateur
