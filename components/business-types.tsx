'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { DynamicIcon } from '@/components/dynamic-icon'
import { businessTypes } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function BusinessTypes() {
  const [active, setActive] = useState(0)
  const current = businessTypes[active]

  return (
    <section id="para-negocios" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Por tipo de negocio"
          title={
            <>
              Automatización <span className="text-gradient">adaptada a tu negocio.</span>
            </>
          }
          description="Cada sector tiene sus propias tareas repetitivas. Estas son posibilidades de automatización, no funcionalidades ya implementadas."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* tabs */}
          <div className="flex flex-col gap-3">
            {businessTypes.map((biz, i) => (
              <button
                key={biz.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  'flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300',
                  active === i
                    ? 'border-cyan/40 bg-white/[0.05] glow-cyan'
                    : 'border-white/8 bg-white/[0.02] hover:border-white/20',
                )}
              >
                <span
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors',
                    active === i ? 'border-cyan/40 bg-gradient-brand/10' : 'border-white/10 bg-white/5',
                  )}
                >
                  <DynamicIcon
                    name={biz.icon}
                    className={cn('h-5 w-5', active === i ? 'text-cyan' : 'text-muted-foreground')}
                  />
                </span>
                <span className="font-display font-bold">{biz.title}</span>
              </button>
            ))}
          </div>

          {/* panel */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-7 md:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] blur-2xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan/40 bg-gradient-brand/10">
                    <DynamicIcon name={current.icon} className="h-6 w-6 text-cyan" />
                  </span>
                  <h3 className="font-display text-2xl font-extrabold">{current.title}</h3>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Ejemplos de automatización
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {current.examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-brand/15">
                        <Check className="h-3.5 w-3.5 text-cyan" />
                      </span>
                      {ex}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
