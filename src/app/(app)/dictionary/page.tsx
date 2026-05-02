import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import DictionarySearch from '@/components/dictionary/DictionarySearch'
import translationsRaw from '@/data/structured_translations.json'

const entries = Object.entries(translationsRaw as Record<string, string[]>).map(
  ([french, shimaoré]) => ({ french, shimaoré })
)

export default async function DictionaryPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-dark)', letterSpacing: '0.04em' }}
        >
          DICTIONNAIRE
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-dark-gray)' }}>
          Français ↔ Shimaoré · {entries.length} entrées
        </p>
      </div>

      <DictionarySearch entries={entries} />
    </div>
  )
}
