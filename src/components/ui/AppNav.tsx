'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { BookOpen, Repeat2, BookMarked, User } from 'lucide-react'
import { logout } from '@/app/(auth)/actions'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface AppNavProps {
  user: SupabaseUser
  streak: number
  xp: number
}

const navLinks = [
  { href: '/learn',      label: 'Leçons',   icon: BookOpen   },
  { href: '/practice',   label: 'Pratique', icon: Repeat2    },
  { href: '/dictionary', label: 'Dico',     icon: BookMarked },
  { href: '/profile',    label: 'Profil',   icon: User       },
]

export default function AppNav({ user, streak, xp }: AppNavProps) {
  const pathname = usePathname()
  const initial = user.email?.[0]?.toUpperCase() ?? 'U'

  return (
    <>
      {/* ─── Top nav ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 py-3.5"
        style={{
          background: 'rgba(242,237,227,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <div className="container-custom flex items-center gap-6">

          {/* Logo */}
          <Link href="/learn" className="mr-auto flex items-center">
            <Image
              src="/logo/Logo desktop light theme.png"
              alt="Luha"
              width={68}
              height={38}
              priority
              className="hidden sm:block"
            />
            <Image
              src="/logo/Logo mobile light theme.png"
              alt="Luha"
              width={34}
              height={34}
              priority
              className="sm:hidden"
            />
          </Link>

          {/* Nav links — desktop */}
          <ul className="hidden md:flex items-center gap-1 list-none">
            {navLinks.slice(0, 3).map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      color:      active ? 'var(--accent-blue)' : 'var(--text-dark-gray)',
                      background: active ? 'rgba(75,123,245,0.08)' : 'transparent',
                    }}
                  >
                    <Icon size={14} strokeWidth={active ? 2.5 : 2} />
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">

            {/* Streak */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <span className="text-sm leading-none">🔥</span>
              <span
                className="text-sm font-semibold tabular-nums"
                style={{
                  color: streak > 0 ? 'var(--accent-red)' : 'var(--text-gray)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {streak}
              </span>
            </div>

            {/* XP */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(75,123,245,0.08)', border: '1px solid rgba(75,123,245,0.15)' }}
            >
              <span className="text-sm leading-none">⚡</span>
              <span
                className="text-sm font-semibold tabular-nums"
                style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}
              >
                {xp} XP
              </span>
            </div>

            {/* Avatar / logout */}
            <form action={logout}>
              <button
                type="submit"
                title={`Déconnexion (${user.email})`}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-opacity hover:opacity-75"
                style={{ background: 'var(--accent-blue)', color: 'white' }}
              >
                {initial}
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Spacer pour compenser le fixed nav */}
      <div className="h-[57px]" />

      {/* ─── Bottom nav mobile ─── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t"
        style={{
          background: 'rgba(242,237,227,0.95)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(0,0,0,0.08)',
        }}
      >
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-medium transition-all"
              style={{ color: active ? 'var(--accent-blue)' : 'var(--text-gray)' }}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[11px]">{label}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
