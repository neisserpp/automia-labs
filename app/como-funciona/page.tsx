import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { CTALink } from '@/components/cta-button'
import { ProcessSection } from '@/components/process-section'
import { DemoSection } from '@/components/demo-section'
import { FinalCTA } from '@/components/final-cta'

export const metadata: Metadata = {
  title: 'Cómo funciona',
  description:
    'Nuestro método en 4 pasos para automatizar tu negocio con IA: analizamos, detectamos, diseñamos y automatizamos. Sin complicaciones técnicas.',
  alternates: { canonical: '/como-funciona' },
}

export default function ComoFuncionaPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Cómo funciona"
        title={
          <>
            De la idea a un <span className="text-gradient">proceso funcionando</span>
          </>
        }
        description="Nos ocupamos de toda la parte técnica. Tú solo cuentas cómo trabajas hoy y nosotros lo convertimos en automatizaciones que funcionan."
      >
        <CTALink href="/diagnostico" size="lg">
          Empezar con un diagnóstico
          <ArrowRight className="h-4 w-4" />
        </CTALink>
      </PageHero>
      <ProcessSection />
      <DemoSection />
      <FinalCTA />
    </SiteShell>
  )
}
