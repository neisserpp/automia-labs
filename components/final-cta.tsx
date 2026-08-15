import { ArrowRight } from 'lucide-react'
import { CTALink } from '@/components/cta-button'
import { LogoMark } from '@/components/logo'
import { Reveal } from '@/components/reveal'

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface/70 px-6 py-16 text-center md:px-12 md:py-24">
            <div className="pointer-events-none absolute inset-0 tech-grid opacity-20" aria-hidden />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25),transparent_65%)] blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute left-1/4 top-1/3 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.2),transparent_65%)] blur-3xl" aria-hidden />

            <div className="relative flex flex-col items-center gap-6">
              <LogoMark className="h-12 w-12 animate-float-slow" />
              <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-balance md:text-5xl">
                Deja de hacer manualmente lo que una máquina{' '}
                <span className="text-gradient">puede hacer por ti.</span>
              </h2>
              <p className="max-w-xl text-base text-muted-foreground text-pretty md:text-lg">
                Cuéntanos qué tarea te está haciendo perder tiempo.
              </p>
              <CTALink href="/diagnostico" size="lg" className="mt-2">
                Hablar con Automia Labs
                <ArrowRight className="h-4 w-4" />
              </CTALink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
