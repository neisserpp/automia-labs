import type { ReactNode } from 'react'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <SiteShell>
      <PageHero eyebrow="Legal" title={title} />
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Última actualización: {updated}
          </p>
          <div className="legal-prose flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-lg font-bold text-foreground">{heading}</h2>
      {children}
    </div>
  )
}
