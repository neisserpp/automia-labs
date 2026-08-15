import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { ResourceAdvisor } from '@/components/resource-advisor'
import { FAQ } from '@/components/faq'
import { FinalCTA } from '@/components/final-cta'

export const metadata: Metadata = {
  title: 'Recursos y guías de automatización',
  description:
    'Guías prácticas y preguntas frecuentes sobre automatización con IA para autónomos y pequeñas empresas. Descarga la guía gratuita de Automia Labs.',
  alternates: { canonical: '/recursos' },
}

export default function RecursosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Recursos"
        title={
          <>
            Aprende a <span className="text-gradient">automatizar tu negocio</span>
          </>
        }
        description="Encuentra el recurso adecuado según el problema real de tu negocio y descubre por dónde empezar con automatización e inteligencia artificial."
      />
      <ResourceAdvisor />
      <FAQ />
      <FinalCTA />
    </SiteShell>
  )
}
