import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, ArrowLeft } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { CTALink } from '@/components/cta-button'
import { DynamicIcon } from '@/components/dynamic-icon'
import { FinalCTA } from '@/components/final-cta'
import { solutions } from '@/lib/site-data'

export function generateStaticParams() {
  return solutions.map((s) => ({ key: s.key }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>
}): Promise<Metadata> {
  const { key } = await params
  const sol = solutions.find((s) => s.key === key)
  if (!sol) return {}
  return {
    title: `${sol.title} · Automatización con IA`,
    description: sol.description,
    alternates: { canonical: `/soluciones/${sol.key}` },
  }
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ key: string }>
}) {
  const { key } = await params
  const sol = solutions.find((s) => s.key === key)
  if (!sol) notFound()

  const others = solutions.filter((s) => s.key !== sol.key).slice(0, 3)

  return (
    <SiteShell>
      <PageHero eyebrow="Solución" title={sol.title} description={sol.description}>
        <CTALink href="/diagnostico" size="lg">
          Automatizar esta área
          <ArrowRight className="h-4 w-4" />
        </CTALink>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Link
            href="/soluciones"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a soluciones
          </Link>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.02] p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-brand/10">
                <DynamicIcon name={sol.icon} className="h-6 w-6 text-cyan" />
              </span>
              <h2 className="font-display text-2xl font-bold">Qué incluye</h2>
              <ul className="flex flex-col gap-3">
                {sol.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.02] p-8">
              <h2 className="font-display text-2xl font-bold">Cómo lo aplicamos</h2>
              <ol className="flex flex-col gap-4">
                {[
                  'Analizamos tus tareas actuales y detectamos qué se puede automatizar.',
                  'Diseñamos un flujo a medida conectando tus herramientas e IA.',
                  'Lo implementamos, lo probamos contigo y lo dejamos funcionando.',
                  'Medimos resultados y ajustamos para exprimir cada hora ahorrada.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold">Otras soluciones</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.key}
                  href={`/soluciones/${o.key}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-cyan/30"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-brand/10">
                    <DynamicIcon name={o.icon} className="h-5 w-5 text-cyan" />
                  </span>
                  <h3 className="font-display text-lg font-bold">{o.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
                    Ver
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </SiteShell>
  )
}
