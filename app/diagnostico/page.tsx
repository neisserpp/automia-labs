import type { Metadata } from 'next'
import { Clock, Sparkles, Gauge, ShieldCheck } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { DiagnosticForm } from '@/components/diagnostic-form'

export const metadata: Metadata = {
  title: 'Diagnóstico gratuito de automatización',
  description:
    'Cuéntanos cómo trabajas y detectaremos qué tareas puedes automatizar con IA. Diagnóstico gratuito y sin compromiso para tu negocio.',
  alternates: { canonical: '/diagnostico' },
}

const perks = [
  { icon: Clock, title: 'Ahorra tiempo', text: 'Identificamos las tareas que más horas te consumen.' },
  { icon: Sparkles, title: 'IA práctica', text: 'Propuestas realistas y aplicables a tu negocio.' },
  { icon: Gauge, title: 'Prioridades claras', text: 'Sabrás qué automatizar primero y por qué.' },
  { icon: ShieldCheck, title: 'Sin compromiso', text: 'Es un análisis gratuito, tú decides después.' },
]

export default function DiagnosticoPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Diagnóstico gratuito"
        title={
          <>
            Descubre qué puedes <span className="text-gradient">automatizar</span>
          </>
        }
        description="Rellena el formulario con tu caso. Analizaremos tu negocio y te contactaremos con oportunidades concretas de automatización adaptadas a ti."
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-2xl font-bold">Qué obtienes</h2>
            <ul className="flex flex-col gap-4">
              {perks.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan/30 bg-gradient-brand/10">
                    <Icon className="h-5 w-5 text-cyan" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <DiagnosticForm />
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
