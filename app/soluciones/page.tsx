import type { Metadata } from 'next'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { CTALink } from '@/components/cta-button'
import { SolutionsGrid } from '@/components/solutions-grid'
import { BusinessTypes } from '@/components/business-types'
import { FinalCTA } from '@/components/final-cta'

export const metadata: Metadata = {
  title: 'Soluciones de automatización con IA',
  description:
    'Atención al cliente, captación, administración, contenido, ventas y operaciones. Descubre qué puede automatizar Automia Labs en tu negocio.',
  alternates: { canonical: '/soluciones' },
}

export default function SolucionesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Soluciones"
        title={
          <>
            Automatiza lo que te hace <span className="text-gradient">perder tiempo</span>
          </>
        }
        description="Agrupamos las automatizaciones más útiles para autónomos y pequeñas empresas. Elige por área o cuéntanos tu caso y te decimos por dónde empezar."
      >
        <CTALink href="/diagnostico" size="lg">
          Solicitar diagnóstico gratuito
          <ArrowRight className="h-4 w-4" />
        </CTALink>
        <CTALink href="/como-funciona" size="lg" variant="secondary">
          <PlayCircle className="h-4 w-4" />
          Ver cómo funciona
        </CTALink>
      </PageHero>
      <SolutionsGrid withHeading={false} />
      <BusinessTypes />
      <FinalCTA />
    </SiteShell>
  )
}
