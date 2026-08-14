import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { CTALink } from '@/components/cta-button'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Ideas, guías y casos sobre automatización con IA para autónomos y pequeñas empresas. Próximamente en Automia Labs.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Contenido sobre <span className="text-gradient">automatización</span>
          </>
        }
        description="Estamos preparando artículos prácticos sobre IA y automatización para tu negocio. Mientras tanto, puedes descargar nuestra guía gratuita o pedir tu diagnóstico."
      >
        <CTALink href="/recursos" size="lg">
          Ir a recursos
          <ArrowRight className="h-4 w-4" />
        </CTALink>
        <CTALink href="/diagnostico" size="lg" variant="secondary">
          Diagnóstico gratuito
        </CTALink>
      </PageHero>
    </SiteShell>
  )
}
