import { SectionHeading } from '@/components/section-heading'
import { DiagnosticForm } from '@/components/diagnostic-form'

export function DiagnosticSection() {
  return (
    <section id="diagnostico" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 tech-grid radial-fade opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Diagnóstico gratuito"
          title={
            <>
              ¿Quieres saber qué <span className="text-gradient">automatizar primero?</span>
            </>
          }
          description="Analizamos brevemente tu negocio y detectamos oportunidades concretas de automatización."
        />
        <div className="mt-10">
          <DiagnosticForm />
        </div>
      </div>
    </section>
  )
}
