'use client'

import { useMemo, useState } from 'react'
import { Clock, Euro, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

function formatEuro(n: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Math.round(n))
}

function Field({
  label,
  suffix,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  suffix: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-sm font-semibold text-foreground">
          {value} {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[color:var(--brand-cyan)]"
        style={{
          background: `linear-gradient(to right, var(--brand-cyan), var(--brand-purple) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
    </div>
  )
}

export function ROICalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [daysPerWeek, setDaysPerWeek] = useState(5)
  const [costPerHour, setCostPerHour] = useState(25)

  const result = useMemo(() => {
    const weeksPerMonth = 4.33
    const monthlyHours = hoursPerWeek * weeksPerMonth
    const monthlyCost = monthlyHours * costPerHour
    // Estimación orientativa: parte de esas tareas suele ser automatizable.
    const automatableHours = monthlyHours * 0.6
    const dayFactor = Math.min(daysPerWeek / 5, 1.2)
    return {
      monthlyHours: monthlyHours * dayFactor,
      monthlyCost: monthlyCost * dayFactor,
      automatableHours: automatableHours * dayFactor,
    }
  }, [hoursPerWeek, daysPerWeek, costPerHour])

  const stats = [
    { icon: Clock, label: 'Horas mensuales en tareas repetitivas', value: `${Math.round(result.monthlyHours)} h` },
    { icon: Euro, label: 'Coste mensual estimado', value: formatEuro(result.monthlyCost) },
    { icon: Sparkles, label: 'Tiempo potencialmente automatizable', value: `${Math.round(result.automatableHours)} h` },
  ]

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Calculadora"
          title={
            <>
              ¿Cuánto tiempo <span className="text-gradient">podrías recuperar?</span>
            </>
          }
          description="Una estimación orientativa. No es una garantía de ahorro; sirve para dimensionar la oportunidad."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-white/10 bg-surface/60 lg:grid-cols-2">
          {/* inputs */}
          <div className="flex flex-col gap-8 p-7 md:p-9">
            <Field label="Horas semanales en tareas repetitivas" suffix="h" value={hoursPerWeek} min={1} max={40} step={1} onChange={setHoursPerWeek} />
            <Field label="Días trabajados a la semana" suffix="días" value={daysPerWeek} min={1} max={7} step={1} onChange={setDaysPerWeek} />
            <Field label="Coste por hora estimado" suffix="€/h" value={costPerHour} min={10} max={120} step={5} onChange={setCostPerHour} />
          </div>

          {/* dashboard output */}
          <div className="relative flex flex-col gap-4 border-t border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.14),transparent_60%)] p-7 md:border-l md:border-t-0 md:p-9">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Estimación mensual
            </span>
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-brand/10">
                    <Icon className="h-5 w-5 text-cyan" />
                  </span>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
                <span className="font-display text-2xl font-extrabold text-gradient">{value}</span>
              </div>
            ))}
            <p className="mt-1 text-xs text-muted-foreground">
              Cifras estimadas a partir de tus datos. Automia Labs no garantiza estos resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
