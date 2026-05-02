'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface Entry {
  french: string
  shimaoré: string[]
}

interface DictionarySearchProps {
  entries: Entry[]
}

export default function DictionarySearch({ entries }: DictionarySearchProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return entries.slice(0, 50)
    return entries.filter(
      (e) =>
        e.french.toLowerCase().includes(q) ||
        e.shimaoré.some((s) => s.toLowerCase().includes(q))
    ).slice(0, 100)
  }, [query, entries])

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--text-dark-gray)' }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher en français ou shimaoré…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{
            background: 'var(--bg-light-2)',
            border: '1px solid rgba(0,0,0,0.08)',
            color: 'var(--text-dark)',
          }}
        />
      </div>

      {/* Count */}
      <p className="text-xs" style={{ color: 'var(--text-dark-gray)', fontFamily: 'var(--font-mono)' }}>
        {query
          ? `${filtered.length} résultat${filtered.length !== 1 ? 's' : ''}`
          : `${entries.length} mots — affichage des 50 premiers`}
      </p>

      {/* Results */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(0,0,0,0.08)' }}
      >
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: 'var(--text-dark-gray)' }}>
            Aucun résultat pour « {query} »
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'rgba(75,123,245,0.07)' }}>
                <th
                  className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest w-1/2"
                  style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}
                >
                  Français
                </th>
                <th
                  className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest w-1/2"
                  style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}
                >
                  Shimaoré
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, i) => (
                <motion.tr
                  key={entry.french}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i < 10 ? i * 0.02 : 0 }}
                  className="border-t transition-colors hover:bg-black/[0.02]"
                  style={{ borderColor: 'rgba(0,0,0,0.06)' }}
                >
                  <td
                    className="px-4 py-2.5 text-[13px]"
                    style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-body)' }}
                  >
                    {entry.french}
                  </td>
                  <td
                    className="px-4 py-2.5 text-[13px]"
                    style={{ color: 'var(--text-dark-gray)', fontFamily: 'var(--font-mono)' }}
                  >
                    {entry.shimaoré.join(' · ')}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
