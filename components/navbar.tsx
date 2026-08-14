'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { CTALink } from '@/components/cta-button'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Soluciones', href: '/soluciones' },
  { label: 'Cómo funciona', href: '/como-funciona' },
  { label: 'Para negocios', href: '/para-negocios' },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Nosotros', href: '/nosotros' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-18 md:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <CTALink
            href="/diagnostico"
            size="sm"
            onClick={() => trackEvent('cta_diagnostico_click', { location: 'navbar' })}
          >
            Diagnóstico gratuito
          </CTALink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CTALink
            href="/diagnostico"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => trackEvent('cta_diagnostico_click', { location: 'navbar_mobile' })}
          >
            Diagnóstico
          </CTALink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-xl transition-[max-height] duration-300 lg:hidden',
          open ? 'max-h-[80vh]' : 'max-h-0 border-t-transparent',
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <CTALink
              href="/diagnostico"
              size="lg"
              className="w-full"
              onClick={() => {
                setOpen(false)
                trackEvent('cta_diagnostico_click', { location: 'mobile_menu' })
              }}
            >
              Diagnóstico gratuito
            </CTALink>
          </li>
        </ul>
      </div>
    </header>
  )
}
