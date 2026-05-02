# Architecture Refactors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract business logic out of UI components into well-named library modules, clean up dead code, and establish the `lib/` seams that Plans B and C will build on.

**Architecture:** Five independent refactors — each can be committed separately. No new features. After this plan, all callers of Supabase, lesson progression, lesson data, and animations import from a single named-export instead of ad-hoc paths.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Vitest, pnpm.

**Run order:** Execute tasks 1–5 sequentially. Each task ends with a type-check gate.

---

## File Map

```
src/lib/supabase/
  index.ts              ← CREATE : named re-exports (createBrowserClient, createServerClient)

src/lib/lessons/
  progressionEngine.ts  ← CREATE : getLessonStatus, getRequiredXP, LessonStatus, XP_PER_LESSON
  progressionEngine.test.ts ← CREATE
  repository.ts         ← CREATE : getAllLessons, getLessonById, getAdjacentLessons
  repository.test.ts    ← CREATE

src/lib/animations/
  timings.ts            ← CREATE : STAGGER_DELAY, FADE_UP

src/components/learn/
  LessonMap.tsx         ← MODIFY : import from progressionEngine + timings
  LessonViewer.tsx      ← MODIFY : import from timings

src/app/(app)/learn/
  page.tsx              ← MODIFY : import from repository
  [lessonId]/page.tsx   ← MODIFY : import from repository

src/supabase-client.ts  ← DELETE (never imported)
src/lib/cn.ts           ← DELETE (never imported)
```

---

### Task 1: Supabase Named Exports

**Files:**
- Create: `src/lib/supabase/index.ts`
- Delete: `src/supabase-client.ts`

- [ ] **Step 1: Create the index with named exports**

```typescript
// src/lib/supabase/index.ts
export { createClient as createBrowserClient } from './client'
export { createClient as createServerClient } from './server'
```

- [ ] **Step 2: Verify no file imports from `src/supabase-client.ts`**

Run: `grep -r "supabase-client" src/`
Expected: no output (file is dead code)

- [ ] **Step 3: Delete the legacy file**

Delete `src/supabase-client.ts`.

- [ ] **Step 4: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase/index.ts
git rm src/supabase-client.ts
git commit -m "refactor: add named supabase exports, delete unused legacy client"
```

---

### Task 2: Progression Engine

**Files:**
- Create: `src/lib/lessons/progressionEngine.ts`
- Create: `src/lib/lessons/progressionEngine.test.ts`
- Modify: `src/components/learn/LessonMap.tsx`

- [ ] **Step 1: Write the failing tests**

```typescript
// src/lib/lessons/progressionEngine.test.ts
import { describe, it, expect } from 'vitest'
import { getRequiredXP, getLessonStatus, XP_PER_LESSON } from './progressionEngine'

describe('getRequiredXP', () => {
  it('lesson 1 requires 0 XP', () => {
    expect(getRequiredXP(1)).toBe(0)
  })
  it('lesson 2 requires one unit', () => {
    expect(getRequiredXP(2)).toBe(XP_PER_LESSON)
  })
  it('lesson 10 requires 9 units', () => {
    expect(getRequiredXP(10)).toBe(9 * XP_PER_LESSON)
  })
})

describe('getLessonStatus', () => {
  it('returns completed when lesson is in completedIds', () => {
    expect(getLessonStatus(3, new Set([1, 2, 3]), 0)).toBe('completed')
  })
  it('returns current when XP sufficient and previous done', () => {
    const status = getLessonStatus(2, new Set([1]), XP_PER_LESSON)
    expect(status).toBe('current')
  })
  it('returns available when XP sufficient but previous NOT done', () => {
    const status = getLessonStatus(3, new Set([1]), 2 * XP_PER_LESSON)
    expect(status).toBe('available')
  })
  it('returns locked when XP insufficient', () => {
    const status = getLessonStatus(5, new Set([]), 0)
    expect(status).toBe('locked')
  })
  it('lesson 1 is current with 0 XP and nothing completed', () => {
    expect(getLessonStatus(1, new Set([]), 0)).toBe('current')
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `pnpm test progressionEngine`
Expected: FAIL — "Cannot find module './progressionEngine'"

- [ ] **Step 3: Create the module**

```typescript
// src/lib/lessons/progressionEngine.ts
export type LessonStatus = 'completed' | 'current' | 'available' | 'locked'

export const XP_PER_LESSON = 50

export function getRequiredXP(lessonId: number): number {
  return (lessonId - 1) * XP_PER_LESSON
}

export function getLessonStatus(
  lessonId: number,
  completedIds: Set<number>,
  userXP: number
): LessonStatus {
  if (completedIds.has(lessonId)) return 'completed'
  const xpNeeded = getRequiredXP(lessonId)
  if (userXP >= xpNeeded) {
    const prevDone = lessonId === 1 || completedIds.has(lessonId - 1)
    return prevDone ? 'current' : 'available'
  }
  return 'locked'
}
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `pnpm test progressionEngine`
Expected: all 6 tests pass

- [ ] **Step 5: Update LessonMap.tsx — replace inline logic with import**

In `src/components/learn/LessonMap.tsx`:

Replace lines 69–83 (the `LessonStatus` type and `getStatus` function):
```typescript
// REMOVE these lines:
type LessonStatus = 'completed' | 'current' | 'available' | 'locked'

function getStatus(
  lessonId: number,
  completedIds: Set<number>,
  userXP: number
): LessonStatus {
  if (completedIds.has(lessonId)) return 'completed'
  const xpNeeded = (lessonId - 1) * 50
  if (userXP >= xpNeeded) {
    const prevDone = lessonId === 1 || completedIds.has(lessonId - 1)
    return prevDone ? 'current' : 'available'
  }
  return 'locked'
}
```

Add to the imports at the top of the file (after the existing imports):
```typescript
import { getLessonStatus, type LessonStatus } from '@/lib/lessons/progressionEngine'
```

Replace the call site at line 234:
```typescript
// BEFORE:
status={getStatus(lesson.id, completedIds, userXP)}

// AFTER:
status={getLessonStatus(lesson.id, completedIds, userXP)}
```

- [ ] **Step 6: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 7: Commit**

```bash
git add src/lib/lessons/progressionEngine.ts src/lib/lessons/progressionEngine.test.ts src/components/learn/LessonMap.tsx
git commit -m "refactor: extract lesson progression engine from LessonMap component"
```

---

### Task 3: Lesson Repository

**Files:**
- Create: `src/lib/lessons/repository.ts`
- Create: `src/lib/lessons/repository.test.ts`
- Modify: `src/app/(app)/learn/page.tsx`
- Modify: `src/app/(app)/learn/[lessonId]/page.tsx`

- [ ] **Step 1: Write the failing tests**

```typescript
// src/lib/lessons/repository.test.ts
import { describe, it, expect } from 'vitest'
import { getAllLessons, getLessonById, getAdjacentLessons } from './repository'

describe('getAllLessons', () => {
  it('returns all 37 lessons', () => {
    expect(getAllLessons()).toHaveLength(37)
  })
  it('first lesson has id 1', () => {
    expect(getAllLessons()[0].id).toBe(1)
  })
})

describe('getLessonById', () => {
  it('finds a lesson by id', () => {
    const lesson = getLessonById(5)
    expect(lesson).toBeDefined()
    expect(lesson!.id).toBe(5)
  })
  it('returns undefined for unknown id', () => {
    expect(getLessonById(999)).toBeUndefined()
  })
})

describe('getAdjacentLessons', () => {
  it('first lesson has no prev', () => {
    const { prev } = getAdjacentLessons(1)
    expect(prev).toBeNull()
  })
  it('last lesson has no next', () => {
    const { next } = getAdjacentLessons(37)
    expect(next).toBeNull()
  })
  it('middle lesson has both prev and next', () => {
    const { prev, next } = getAdjacentLessons(10)
    expect(prev!.id).toBe(9)
    expect(next!.id).toBe(11)
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `pnpm test repository`
Expected: FAIL — "Cannot find module './repository'"

- [ ] **Step 3: Create the module**

```typescript
// src/lib/lessons/repository.ts
import { lessons, type Lesson } from '@/data/lessonData'

export function getAllLessons(): Lesson[] {
  return lessons
}

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

export function getAdjacentLessons(id: number): { prev: Lesson | null; next: Lesson | null } {
  return {
    prev: lessons.find((l) => l.id === id - 1) ?? null,
    next: lessons.find((l) => l.id === id + 1) ?? null,
  }
}
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `pnpm test repository`
Expected: all 6 tests pass

- [ ] **Step 5: Update the learn page**

Replace the entirety of `src/app/(app)/learn/page.tsx`:

```typescript
import { createServerClient } from '@/lib/supabase'
import { getAllLessons } from '@/lib/lessons/repository'
import LessonMap from '@/components/learn/LessonMap'

export const metadata = { title: 'Leçons — Luha' }

export default async function LearnPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: progress }, { data: stats }] = await Promise.all([
    supabase
      .from('user_progress')
      .select('lesson_id, completed, score')
      .eq('user_id', user!.id),
    supabase
      .from('user_stats')
      .select('xp, level, streak_days')
      .eq('user_id', user!.id)
      .single(),
  ])

  const allLessons = getAllLessons()
  const completedIds = new Set(
    (progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id)
  )

  return (
    <LessonMap
      lessons={allLessons}
      completedIds={completedIds}
      userXP={stats?.xp ?? 0}
      totalLessons={allLessons.length}
      completedCount={completedIds.size}
    />
  )
}
```

- [ ] **Step 6: Update the lesson detail page**

Replace the entirety of `src/app/(app)/learn/[lessonId]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import { getLessonById, getAdjacentLessons } from '@/lib/lessons/repository'
import LessonViewer from '@/components/learn/LessonViewer'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ lessonId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId } = await params
  const lesson = getLessonById(Number(lessonId))
  if (!lesson) return {}
  return { title: `${lesson.title} — Luha` }
}

export default async function LessonPage({ params }: Props) {
  const { lessonId } = await params
  const id = Number(lessonId)
  const lesson = getLessonById(id)
  if (!lesson) notFound()

  const { prev, next } = getAdjacentLessons(id)
  return <LessonViewer lesson={lesson} prevLesson={prev} nextLesson={next} />
}
```

- [ ] **Step 7: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 8: Commit**

```bash
git add src/lib/lessons/repository.ts src/lib/lessons/repository.test.ts src/app/\(app\)/learn/page.tsx src/app/\(app\)/learn/\[lessonId\]/page.tsx
git commit -m "refactor: introduce lesson repository, remove direct lessonData imports from pages"
```

---

### Task 4: Animation Timings

**Files:**
- Create: `src/lib/animations/timings.ts`
- Modify: `src/components/learn/LessonMap.tsx`
- Modify: `src/components/learn/LessonViewer.tsx`

- [ ] **Step 1: Create the timings module**

```typescript
// src/lib/animations/timings.ts
export const STAGGER_DELAY = {
  chapter: 0.08,
  card: 0.025,
  section: 0.04,
} as const

export const FADE_DURATION = {
  fast: 0.3,
  normal: 0.45,
  slow: 0.5,
} as const

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
```

- [ ] **Step 2: Update LessonMap.tsx — chapter stagger**

In `src/components/learn/LessonMap.tsx`, add import after existing imports:
```typescript
import { STAGGER_DELAY, FADE_DURATION, EASE_OUT } from '@/lib/animations/timings'
```

Replace the chapter animation (around line 182):
```typescript
// BEFORE:
transition={{ duration: 0.45, delay: chapterIndex * 0.08 }}

// AFTER:
transition={{ duration: FADE_DURATION.normal, delay: chapterIndex * STAGGER_DELAY.chapter }}
```

Replace the card animation in `LessonCard` (around line 271):
```typescript
// BEFORE:
transition={{ duration: 0.35, delay: animIndex * 0.025, ease: [0.22, 1, 0.36, 1] }}

// AFTER:
transition={{ duration: FADE_DURATION.fast, delay: animIndex * STAGGER_DELAY.card, ease: EASE_OUT }}
```

- [ ] **Step 3: Update LessonViewer.tsx — content block stagger**

In `src/components/learn/LessonViewer.tsx`, add import:
```typescript
import { STAGGER_DELAY, FADE_DURATION, EASE_OUT } from '@/lib/animations/timings'
```

Replace the `ContentBlock` animation (around line 144):
```typescript
// BEFORE:
transition={{ duration: 0.3, delay: 0.1 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}

// AFTER:
transition={{ duration: FADE_DURATION.fast, delay: 0.1 + index * STAGGER_DELAY.section, ease: EASE_OUT }}
```

- [ ] **Step 4: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/lib/animations/timings.ts src/components/learn/LessonMap.tsx src/components/learn/LessonViewer.tsx
git commit -m "refactor: extract animation timing constants into shared lib"
```

---

### Task 5: Delete Pass-Through Modules

**Files:**
- Delete: `src/lib/cn.ts` (wraps clsx, never imported)

- [ ] **Step 1: Confirm cn.ts has zero importers**

Run: `grep -r "from '@/lib/cn'" src/`
Expected: no output

- [ ] **Step 2: Delete the file**

Delete `src/lib/cn.ts`.

- [ ] **Step 3: Type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git rm src/lib/cn.ts
git commit -m "chore: delete unused cn.ts pass-through"
```
