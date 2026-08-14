import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const demos = [
  {
    before: 'Cliente rellena formulario',
    after: ['Lead', 'Clasificación IA', 'CRM', 'Notificación', 'Seguimiento'],
  },
  {
    before: 'Email recibido manualmente',
    after: ['Email', 'IA analiza', 'Clasifica', 'Responde / deriva', 'Registra'],
  },
  {
    before: 'Documento manual',
    after: ['Documento', 'IA extrae info', 'Organiza', 'Guarda', 'Notifica'],
  },
]

export function DemoSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 tech-grid radial-fade opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Demostraciones"
          title={
            <>
              De tarea manual a <span className="text-gradient">proceso inteligente.</span>
            </>
          }
          description="Ejemplos ilustrativos de cómo transformamos un flujo. No representan casos reales de clientes."
        />

        <div className="mt-12 flex flex-col gap-6">
          {demos.map((demo, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="relative grid grid-cols-1 gap-6 rounded-3xl border border-white/8 bg-white/[0.02] p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8">
                <span className="absolute right-5 top-5 rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-cyan">
                  Demo
                </span>

                <div className="flex flex-col gap-2 md:w-64">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Antes
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-surface/60 px-4 py-4 text-sm font-medium text-foreground/80">
                    {demo.before}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                    Después
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {demo.after.map((step, j) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="rounded-xl border border-white/10 bg-gradient-brand/10 px-3 py-2 text-sm font-semibold text-foreground">
                          {step}
                        </span>
                        {j < demo.after.length - 1 && (
                          <ArrowRight className="h-4 w-4 shrink-0 text-cyan/60" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
