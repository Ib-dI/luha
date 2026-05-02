/**
 * Standard dynamic programming Levenshtein distance between two strings.
 */
export function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length

  // Allocate a (m+1) x (n+1) matrix
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }

  return dp[m][n]
}

/**
 * Normalize an answer for loose comparison:
 * 1. Normalize to NFC
 * 2. Lowercase
 * 3. Strip accent marks (NFD decompose, remove combining chars, recompose NFC)
 * 4. Collapse multiple spaces and trim
 */
export function normalizeAnswer(s: string): string {
  // Step 1 – NFC first so shimaoré special chars stay intact before lowercasing
  let result = s.normalize('NFC')
  // Step 2 – lowercase
  result = result.toLowerCase()
  // Step 3 – strip accent marks (NFD + remove combining diacritical marks U+0300–U+036F)
  result = result.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC')
  // Step 4 – collapse whitespace and trim
  result = result.replace(/\s+/g, ' ').trim()
  return result
}

/**
 * Fisher-Yates in-place shuffle. Mutates and returns the array.
 */
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Score a user answer against the correct answer.
 * Returns 0–100:
 *   100  – exact match after normalization
 *   0    – levenshtein distance > 2
 *   else – Math.round((1 - distance / max(a.length, b.length, 1)) * 100) clamped to [0, 100]
 */
export function scoreAnswer(userAnswer: string, correctAnswer: string): number {
  const a = normalizeAnswer(userAnswer)
  const b = normalizeAnswer(correctAnswer)

  if (a === b) return 100

  const distance = levenshtein(a, b)
  if (distance > 2) return 0

  const maxLen = Math.max(a.length, b.length, 1)
  const raw = Math.round((1 - distance / maxLen) * 100)
  return Math.min(100, Math.max(0, raw))
}
