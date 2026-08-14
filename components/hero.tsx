'use client'

import { motion } from 'motion/react'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { CTALink } from '@/components/cta-button'
import { HeroVisual } from '@/components/hero-visual'
import { trackEvent } from '@/lib/analytics'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 tech-grid radial-fade opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(22,139,255,0.16),transparent_70%)] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
            IA + Automatización para negocios
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[4.2rem]"
          >
            Automatizamos lo que te hace <span className="text-gradient">perder tiempo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg"
          >
            Transformamos tareas repetitivas en procesos inteligentes para que puedas dedicar más
            tiempo a lo que realmente hace crecer tu negocio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <CTALink
              href="/diagnostico"
              size="lg"
              onClick={() => trackEvent('cta_diagnostico_click', { location: 'hero' })}
            >
              Quiero mi diagnóstico gratuito
              <ArrowRight className="h-4 w-4" />
            </CTALink>
            <CTALink href="/como-funciona" size="lg" variant="secondary">
              <PlayCircle className="h-4 w-4" />
              Ver cómo funciona
            </CTALink>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-sm text-muted-foreground"
          >
            Sin compromiso · Orientado a tu negocio · 100% personalizado
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}
