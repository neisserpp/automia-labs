'use client'

import { motion } from 'motion/react'
import { Bot, Mail, FileText, Zap, CheckCircle2, ArrowRight } from 'lucide-react'

const flowCards = [
  { icon: Mail, label: 'Email entrante', sub: 'Clasificado por IA', accent: 'text-cyan' },
  { icon: Bot, label: 'Agente IA', sub: 'Analiza y decide', accent: 'text-[color:var(--brand-purple)]' },
  { icon: FileText, label: 'Documento', sub: 'Datos extraídos', accent: 'text-blue' },
  { icon: CheckCircle2, label: 'Seguimiento', sub: 'Automático', accent: 'text-[color:var(--brand-magenta)]' },
]

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      {/* glow */}
      <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(0,212,255,0.18),transparent_60%)] blur-2xl" />
      <div className="absolute inset-10 rounded-full bg-[radial-gradient(circle_at_60%_70%,rgba(124,58,237,0.18),transparent_60%)] blur-2xl" />

      {/* connection lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden>
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="400" y2="400">
            <stop stopColor="#00D4FF" />
            <stop offset="1" stopColor="#C026FF" />
          </linearGradient>
        </defs>
        {[
          'M80 120 C 160 120, 200 200, 200 200',
          'M320 100 C 240 140, 200 200, 200 200',
          'M90 300 C 170 260, 200 200, 200 200',
          'M320 300 C 250 250, 200 200, 200 200',
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#line-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* central core */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-brand opacity-20 blur-md" />
        <Zap className="relative h-10 w-10 text-cyan" />
      </motion.div>

      {/* floating flow cards */}
      {flowCards.map((card, i) => {
        const positions = [
          'left-0 top-[12%]',
          'right-0 top-[6%]',
          'left-[4%] bottom-[10%]',
          'right-0 bottom-[12%]',
        ]
        const Icon = card.icon
        return (
          <motion.div
            key={card.label}
            className={`absolute ${positions[i]} w-40`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
          >
            <motion.div
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-surface/80 p-3 backdrop-blur-md"
              animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Icon className={`h-4.5 w-4.5 ${card.accent}`} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-semibold text-foreground">{card.label}</span>
                <span className="text-[0.68rem] text-muted-foreground">{card.sub}</span>
              </span>
            </motion.div>
          </motion.div>
        )
      })}

      {/* small status chip */}
      <motion.div
        className="absolute left-1/2 top-[86%] flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-[0.7rem] font-semibold text-cyan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
        Flujo automatizado
        <ArrowRight className="h-3 w-3" />
      </motion.div>
    </div>
  )
}
