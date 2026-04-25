import { supabaseAdmin as supabase } from '../src/supabase-client'
import translationsData from '../src/data/structured_translations.json'

function inferCategory(word: string): string {
  const patterns: [RegExp, string][] = [
    [/\(u-\)$/i, 'verbes'],
    [/^(bonjour|salut|au revoir|merci|s'il|excuse|pardon)/i, 'salutations'],
    [/^(zéro|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|\d)/i, 'nombres'],
    [/^(à|dans|sur|sous|entre|avec|sans|pour|par|vers|chez)\s/i, 'prepositions'],
    [/^(quand|comment|pourquoi|où|qui|que|quoi|combien)/i, 'interrogatifs'],
    [/religion|prière|mosquée|ramadan|dieu|allah/i, 'religion'],
    [/famille|père|mère|enfant|frère|sœur|mari|femme/i, 'famille'],
    [/marché|acheter|vendre|prix|argent|payer/i, 'marche'],
  ]
  for (const [pattern, cat] of patterns) {
    if (pattern.test(word)) return cat
  }
  return 'general'
}

async function seedVocabulary() {
  const entries = Object.entries(translationsData as Record<string, string[]>)
  console.log(`📚 Seeding ${entries.length} vocabulary entries...`)

  const rows = entries.map(([french, shimaore_variants]) => ({
    french,
    shimaoré: shimaore_variants,
    category: inferCategory(french),
  }))

  const chunkSize = 500
  let seeded = 0

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize)
    const { error } = await supabase
      .from('vocabulary')
      .upsert(chunk, { onConflict: 'french' })

    if (error) {
      console.error(`❌ Error at chunk ${i}:`, error.message)
    } else {
      seeded += chunk.length
      console.log(`✅ ${seeded}/${rows.length}`)
    }
  }

  console.log('🎉 Vocabulary seed complete!')
}

seedVocabulary().catch(console.error)
