import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { CTALink } from '@/components/cta-button'
import { BusinessTypes } from '@/components/business-types'
import { SolutionsGrid } from '@/components/solutions-grid'
import { FinalCTA } from '@/components/final-cta'

export const metadata: Metadata = {
  title: 'Automatización por tipo de negocio',
  description:
    'Inmobiliarias, clínicas, gestorías, autónomos y pequeños negocios. Ejemplos de automatización con IA adaptados a cada sector.',
  alternates: { canonical: '/para-negocios' },
}

export default function ParaNegociosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Para negocios"
        title={
          <>
            Automatización adaptada a <span className="text-gradient">tu sector</span>
          </>
        }
        description="Cada negocio tiene tareas repetitivas distintas. Mira ejemplos concretos según tu tipo de actividad y descubre por dónde empezar."
      >
        <CTALink href="/diagnostico" size="lg">
          Ver qué puedo automatizar
          <ArrowRight className="h-4 w-4" />
        </CTALink>
      </PageHero>
      <BusinessTypes />
      <SolutionsGrid withHeading />
      <FinalCTA />
    </SiteShell>
  )
}
