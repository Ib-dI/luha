import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AppNav from '@/components/ui/AppNav'
import XPBar from '@/components/ui/XPBar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Récupère ou initialise les stats
  let { data: stats } = await supabase
    .from('user_stats')
    .select('xp, level, streak_days')
    .eq('user_id', user.id)
    .single()

  if (!stats) {
    const { data: created } = await supabase
      .from('user_stats')
      .insert({ user_id: user.id })
      .select('xp, level, streak_days')
      .single()
    stats = created
  }

  const xp     = stats?.xp          ?? 0
  const level  = stats?.level       ?? 1
  const streak = stats?.streak_days ?? 0

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-light)' }}>
      <AppNav user={user} streak={streak} xp={xp} />
      <XPBar xp={xp} level={level} />

      {/* Padding bottom pour la bottom nav mobile */}
      <main className="container-custom py-6 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  )
}
