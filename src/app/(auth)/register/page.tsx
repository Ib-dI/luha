'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { register, type AuthState } from '../actions'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(register, null)

  return (
    <motion.div className="w-full max-w-sm" initial="hidden" animate="visible">

      {/* Logo */}
      <motion.div className="flex justify-center mb-8" variants={fadeUp} custom={0}>
        <Link href="/">
          <Image
            src="/logo/Logo desktop light theme.png"
            alt="Luha"
            width={90}
            height={50}
            priority
          />
        </Link>
      </motion.div>

      {/* Card */}
      <motion.div
        className="ch-box ch-light grain grain-light relative rounded-2xl p-7 overflow-hidden"
        style={{
          background: 'var(--bg-light-2)',
          border: '1px solid rgba(0,0,0,0.1)',
        }}
        variants={fadeUp}
        custom={1}
      >
        <span className="ch ch-tl" /><span className="ch ch-tr" />
        <span className="ch ch-bl" /><span className="ch ch-br" />

        <span
          className="tube tube-green absolute opacity-20 pointer-events-none"
          style={{ width: 160, bottom: -4, right: -15, transform: 'rotate(-6deg)' }}
        />

        <div className="relative z-10">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(107,245,107,0.12)', color: '#22a722' }}
          >
            Inscription gratuite
          </span>

          <h1
            className="text-3xl mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-dark)', letterSpacing: '0.04em' }}
          >
            COMMENÇONS !
          </h1>
          <p className="text-xs mb-6" style={{ color: 'var(--text-gray)' }}>
            Aucune carte bancaire · Toujours gratuit
          </p>

          <form action={formAction} className="space-y-4">
            {/* Email */}
            <motion.div variants={fadeUp} custom={2}>
              <label
                className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                style={{ color: 'var(--text-dark-gray)' }}
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="ton@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1.5px solid rgba(0,0,0,0.12)',
                  color: 'var(--text-dark)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp} custom={3}>
              <label
                className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                style={{ color: 'var(--text-dark-gray)' }}
              >
                Mot de passe
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="8 caractères minimum"
                minLength={8}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1.5px solid rgba(0,0,0,0.12)',
                  color: 'var(--text-dark)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-blue)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')}
              />
            </motion.div>

            {/* Erreur */}
            {state?.error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="px-4 py-3 rounded-xl text-sm"
                style={{ background: 'rgba(232,72,72,0.1)', color: 'var(--accent-red)' }}
              >
                {state.error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={pending}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
              style={{ background: 'var(--accent-blue)', color: 'white', border: '1.5px solid var(--accent-blue)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={fadeUp}
              custom={4}
            >
              {pending ? 'Création du compte…' : 'Commencer gratuitement →'}
            </motion.button>
          </form>
        </div>
      </motion.div>

      <motion.p
        className="text-center text-sm mt-5"
        style={{ color: 'var(--text-dark-gray)' }}
        variants={fadeUp}
        custom={5}
      >
        Déjà un compte ?{' '}
        <Link href="/login" className="font-semibold" style={{ color: 'var(--accent-blue)' }}>
          Se connecter
        </Link>
      </motion.p>
    </motion.div>
  )
}
