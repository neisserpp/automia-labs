import { Brain, Workflow, Gauge, Boxes } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const items = [
  { icon: Brain, label: 'IA aplicada' },
  { icon: Workflow, label: 'Automatización' },
  { icon: Gauge, label: 'Productividad' },
  { icon: Boxes, label: 'Procesos inteligentes' },
]

export function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <Reveal>
          <p className="mb-6 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Automatización práctica · IA aplicada · Menos trabajo manual
          </p>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {items.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand/10">
                  <Icon className="h-5 w-5 text-cyan" />
                </span>
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
