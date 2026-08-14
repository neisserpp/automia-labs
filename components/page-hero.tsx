import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/section-heading'

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-16 md:pt-40 md:pb-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] opacity-70"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, rgba(0,212,255,0.12) 0%, rgba(124,58,237,0.10) 45%, transparent 75%)',
        }}
        aria-hidden
      />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        {eyebrow && (
          <div className="mb-5 flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
      </div>
    </section>
  )
}
