'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { CTAButton } from '@/components/cta-button'

const STORAGE_KEY = 'automia-cookie-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function decide(choice: 'accepted' | 'rejected' | 'configured') {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      /* ignore */
    }
    // No se activan cookies no esenciales sin consentimiento explícito.
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-white/10 bg-popover/95 p-5 backdrop-blur-xl md:inset-x-auto md:right-6 md:bottom-6 md:left-auto"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Cookie className="h-4.5 w-4.5 text-cyan" />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Usamos cookies para mejorar tu experiencia. Puedes aceptarlas, rechazarlas o
            configurarlas. Consulta nuestra{' '}
            <Link href="/cookies" className="text-cyan underline-offset-2 hover:underline">
              política de cookies
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <CTAButton size="sm" variant="ghost" onClick={() => decide('configured')}>
            Configurar
          </CTAButton>
          <CTAButton size="sm" variant="secondary" onClick={() => decide('rejected')}>
            Rechazar
          </CTAButton>
          <CTAButton size="sm" onClick={() => decide('accepted')}>
            Aceptar
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
