import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { CTALink } from '@/components/cta-button'

export default function NotFound() {
  return (
    <SiteShell>
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6 px-5 py-32 text-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] opacity-60"
          style={{
            background:
              'radial-gradient(60% 100% at 50% 0%, rgba(0,212,255,0.12) 0%, rgba(124,58,237,0.10) 45%, transparent 75%)',
          }}
          aria-hidden
        />
        <Image
          src="/automia-logo-circle.png"
          alt="Automia Labs"
          width={96}
          height={96}
          className="h-20 w-20 rounded-full"
        />
        <p className="font-display text-6xl font-extrabold text-gradient">404</p>
        <h1 className="font-display text-2xl font-bold">Esta página no existe</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Puede que el enlace haya cambiado. Vuelve al inicio o pide tu diagnóstico gratuito.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <CTALink href="/" size="lg">
            Volver al inicio
            <ArrowRight className="h-4 w-4" />
          </CTALink>
          <CTALink href="/diagnostico" size="lg" variant="secondary">
            Diagnóstico gratuito
          </CTALink>
        </div>
      </section>
    </SiteShell>
  )
}
