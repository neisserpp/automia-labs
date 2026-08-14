'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { CTAButton } from '@/components/cta-button'
import { FieldLabel, TextInput, TextArea, Select } from '@/components/form-fields'
import { businessTypeOptions } from '@/lib/site-data'
import { trackEvent } from '@/lib/analytics'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function DiagnosticForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    trackEvent('contact_form_submit', { form: 'diagnostico' })
    setStatus('loading')
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget))
      // MOCK SUBMISSION — reemplazar por POST a /api/diagnostico o servicio externo.
      console.log('[v0] diagnostico submission (mock):', data)
      await new Promise((r) => setTimeout(r, 1400))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-cyan/30 bg-cyan/5 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-cyan" />
        <h3 className="font-display text-2xl font-extrabold">¡Solicitud recibida!</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Gracias por tu interés. Revisaremos tu negocio y te contactaremos con oportunidades
          concretas de automatización. (Demo: todavía no se envían datos reales.)
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-surface/60 p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="d-name">Nombre</FieldLabel>
          <TextInput id="d-name" name="name" required placeholder="Tu nombre" autoComplete="name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="d-email">Email</FieldLabel>
          <TextInput id="d-email" name="email" type="email" required placeholder="tucorreo@ejemplo.com" autoComplete="email" />
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="d-company">Empresa / negocio</FieldLabel>
          <TextInput id="d-company" name="company" required placeholder="Nombre de tu negocio" />
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="d-type">Tipo de negocio</FieldLabel>
          <Select id="d-type" name="businessType" required defaultValue="">
            <option value="" disabled>Selecciona una opción</option>
            {businessTypeOptions.map((o) => (
              <option key={o} value={o} className="bg-surface">{o}</option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <FieldLabel htmlFor="d-web">Web (opcional)</FieldLabel>
          <TextInput id="d-web" name="website" placeholder="https://…" inputMode="url" />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <FieldLabel htmlFor="d-problem">¿Cuál es tu principal problema?</FieldLabel>
          <TextArea id="d-problem" name="problem" required placeholder="Cuéntanos qué te gustaría mejorar." />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <FieldLabel htmlFor="d-task">¿Qué tarea te hace perder más tiempo?</FieldLabel>
          <TextArea id="d-task" name="task" required placeholder="La tarea repetitiva que más horas te consume." />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <FieldLabel htmlFor="d-budget">Presupuesto aproximado (opcional)</FieldLabel>
          <Select id="d-budget" name="budget" defaultValue="">
            <option value="" disabled>Selecciona un rango</option>
            {['No lo tengo definido', 'Menos de 500 €/mes', '500 – 1.500 €/mes', 'Más de 1.500 €/mes'].map((o) => (
              <option key={o} value={o} className="bg-surface">{o}</option>
            ))}
          </Select>
        </div>
      </div>

      {status === 'error' && (
        <p className="text-sm text-destructive">Ha ocurrido un error. Inténtalo de nuevo.</p>
      )}

      <CTAButton
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === 'loading'}
        onClick={() => trackEvent('lead_form_start', { form: 'diagnostico' })}
      >
        {status === 'loading' ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Enviando…</>
        ) : (
          'Solicitar diagnóstico'
        )}
      </CTAButton>

      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-cyan" /> Sin compromiso.
      </p>
    </form>
  )
}
