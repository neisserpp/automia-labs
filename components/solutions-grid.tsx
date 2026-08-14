import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { DynamicIcon } from '@/components/dynamic-icon'
import { solutions } from '@/lib/site-data'

export function SolutionsGrid({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section id="soluciones" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {withHeading && (
          <SectionHeading
            eyebrow="Soluciones"
            title={
              <>
                ¿Qué podemos <span className="text-gradient">automatizar?</span>
              </>
            }
            description="Áreas donde la automatización y la IA pueden ahorrarte horas cada semana."
          />
        )}

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol, i) => (
            <Reveal key={sol.key} delay={(i % 3) * 0.08}>
              <Link
                href={`/soluciones/${sol.key}`}
                className="group relative flex h-full flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:glow-cyan"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-brand/10 transition-colors group-hover:border-cyan/40">
                  <DynamicIcon name={sol.icon} className="h-5.5 w-5.5 text-cyan" />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl font-bold">{sol.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{sol.description}</p>
                </div>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {sol.points.map((p) => (
                    <li
                      key={p}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      <Check className="h-3 w-3 text-cyan" />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-cyan">
                  Ver solución
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
