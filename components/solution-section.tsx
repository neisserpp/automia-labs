import { Workflow, Brain, Plug, Gauge } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const pillars = [
  {
    n: '01',
    icon: Workflow,
    title: 'Automatización',
    text: 'Eliminamos los pasos manuales repetitivos que ralentizan tu día a día.',
  },
  {
    n: '02',
    icon: Brain,
    title: 'Inteligencia Artificial',
    text: 'Aplicamos IA donde aporta valor: clasificar, redactar, analizar y decidir.',
  },
  {
    n: '03',
    icon: Plug,
    title: 'Integración de herramientas',
    text: 'Conectamos las herramientas que ya usas para que trabajen juntas.',
  },
  {
    n: '04',
    icon: Gauge,
    title: 'Optimización de procesos',
    text: 'Rediseñamos flujos para que sean más rápidos, claros y medibles.',
  },
]

export function SolutionSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 tech-grid radial-fade opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="La solución"
          title={
            <>
              Tu negocio no necesita más trabajo.{' '}
              <span className="text-gradient">Necesita mejores procesos.</span>
            </>
          }
          description="En Automia Labs analizamos cómo funciona actualmente tu negocio y detectamos qué tareas pueden simplificarse, automatizarse o potenciarse mediante IA."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ n, icon: Icon, title, text }, i) => (
            <Reveal key={n} delay={i * 0.08}>
              <div className="group relative flex h-full flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-cyan/40">
                    <Icon className="h-5 w-5 text-cyan" />
                  </span>
                  <span className="font-display text-2xl font-extrabold text-white/10">{n}</span>
                </div>
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
