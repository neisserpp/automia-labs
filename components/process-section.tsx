import { Search, Radar, PencilRuler, Rocket } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const steps = [
  { n: '01', icon: Search, title: 'Analizamos', text: 'Entendemos cómo funciona actualmente tu negocio.' },
  { n: '02', icon: Radar, title: 'Detectamos', text: 'Encontramos tareas repetitivas y oportunidades de automatización.' },
  { n: '03', icon: PencilRuler, title: 'Diseñamos', text: 'Construimos un flujo adaptado a tus necesidades.' },
  { n: '04', icon: Rocket, title: 'Automatizamos', text: 'Ponemos el sistema en funcionamiento y medimos su utilidad.' },
]

export function ProcessSection() {
  return (
    <section id="como-funciona" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Cómo funciona"
          title={
            <>
              De la idea a un <span className="text-gradient">proceso funcionando.</span>
            </>
          }
          description="Un método claro en cuatro pasos, sin complicaciones técnicas para ti."
        />

        <div className="relative mt-14">
          {/* connecting line */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-cyan/0 via-cyan/40 to-[color:var(--brand-magenta)]/30 lg:block"
            aria-hidden
          />
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ n, icon: Icon, title, text }, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <li className="relative flex flex-col gap-4">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/30 bg-surface">
                    <Icon className="h-5 w-5 text-cyan" />
                  </div>
                  <div className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                    <span className="font-display text-sm font-bold tracking-[0.3em] text-gradient">
                      {n}
                    </span>
                    <h3 className="font-display text-lg font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
