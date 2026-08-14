'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: '¿Necesito conocimientos técnicos?',
    a: 'No. Nos encargamos de toda la parte técnica. Tú solo cuentas cómo trabajas hoy y nosotros diseñamos y ponemos en marcha las automatizaciones.',
  },
  {
    q: '¿Qué tipo de tareas puedo automatizar?',
    a: 'Atención al cliente, captación de leads, administración, generación de contenido, seguimiento de ventas y flujos internos entre tus herramientas, entre otras.',
  },
  {
    q: '¿Con qué herramientas trabajáis?',
    a: 'Conectamos las herramientas que ya usas (email, formularios, CRM, hojas de cálculo, mensajería) con IA y automatizaciones a medida.',
  },
  {
    q: '¿El diagnóstico tiene coste?',
    a: 'No. El diagnóstico inicial es gratuito y sin compromiso. Analizamos tu negocio y te proponemos oportunidades concretas de automatización.',
  },
  {
    q: '¿Cómo empezamos a trabajar juntos?',
    a: 'Rellenas el formulario de diagnóstico, revisamos tu caso y te contactamos para explicarte qué podemos automatizar y por dónde conviene empezar.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Preguntas <span className="text-gradient">frecuentes.</span>
            </>
          }
        />
        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                className={cn(
                  'rounded-2xl border transition-colors',
                  isOpen ? 'border-cyan/30 bg-white/[0.03]' : 'border-white/8 bg-white/[0.02]',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display font-bold">{f.q}</span>
                  <Plus
                    className={cn(
                      'h-5 w-5 shrink-0 text-cyan transition-transform duration-300',
                      isOpen && 'rotate-45',
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
