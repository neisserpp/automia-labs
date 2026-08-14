import type { Metadata } from 'next'
import { ArrowRight, Zap, Brain, Gauge, Target } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { CTALink } from '@/components/cta-button'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { FinalCTA } from '@/components/final-cta'

export const metadata: Metadata = {
  title: 'Sobre Automia Labs',
  description:
    'Ayudamos a autónomos y pequeñas empresas a ahorrar tiempo automatizando tareas repetitivas con inteligencia artificial. Soluciones prácticas, simples y efectivas.',
  alternates: { canonical: '/nosotros' },
}

const values = [
  { icon: Zap, title: 'Automatización', text: 'Convertimos procesos manuales en flujos que se ejecutan solos.' },
  { icon: Brain, title: 'IA práctica', text: 'Aplicamos inteligencia artificial donde realmente aporta valor.' },
  { icon: Gauge, title: 'Productividad', text: 'Liberamos tu tiempo para lo que hace crecer tu negocio.' },
  { icon: Target, title: 'Resultados', text: 'Nos centramos en el impacto medible, no en la tecnología por moda.' },
]

export default function NosotrosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Sobre la marca"
        title={
          <>
            Menos tareas repetitivas, <span className="text-gradient">más tiempo para crecer</span>
          </>
        }
        description="Automia Labs ayuda a autónomos y pequeñas empresas a ahorrar tiempo automatizando tareas repetitivas con inteligencia artificial. Soluciones prácticas, simples y efectivas."
      >
        <CTALink href="/diagnostico" size="lg">
          Habla con nosotros
          <ArrowRight className="h-4 w-4" />
        </CTALink>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-8">
              <h2 className="font-display text-xl font-bold text-gradient">Nuestra misión</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Democratizar la automatización y la IA para que cualquier negocio, por pequeño que
                sea, pueda dejar de perder horas en tareas repetitivas y dedicarlas a lo importante.
              </p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-8">
              <h2 className="font-display text-xl font-bold text-gradient">Cómo trabajamos</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Sin tecnicismos ni promesas vacías. Analizamos tu día a día, proponemos lo que de
                verdad te va a ahorrar tiempo y lo dejamos funcionando. Simple y efectivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Nuestros valores"
            title={
              <>
                Lo que nos <span className="text-gradient">mueve.</span>
              </>
            }
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 4) * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-brand/10">
                    <Icon className="h-5 w-5 text-cyan" />
                  </span>
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </SiteShell>
  )
}
