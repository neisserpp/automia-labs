import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { LeadMagnet } from '@/components/lead-magnet'
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
        description="Guías, ideas y respuestas para empezar a ahorrar tiempo con automatización e inteligencia artificial, aunque partas de cero."
      />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
    </SiteShell>
  )
}
