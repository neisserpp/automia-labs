'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle2, Loader2, Download } from 'lucide-react'
import { CTAButton } from '@/components/cta-button'
import { FieldLabel, TextInput, Select } from '@/components/form-fields'
import { businessTypeOptions } from '@/lib/site-data'
import { trackEvent } from '@/lib/analytics'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function LeadMagnet() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    trackEvent('lead_form_submit', { form: 'lead_magnet' })
    setStatus('loading')
    try {
      // MOCK SUBMISSION — reemplazar por Resend / Mailchimp / Brevo / API propia.
      await new Promise((r) => setTimeout(r, 1200))
      trackEvent('guide_download')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="guia" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-7 md:p-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.16),transparent_70%)] blur-2xl" />
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                <BookOpen className="h-3.5 w-3.5" /> Guía gratuita
              </span>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-balance md:text-4xl">
                Descubre qué puedes <span className="text-gradient">automatizar</span> en tu negocio.
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Te enviaremos una guía práctica para identificar tareas repetitivas y oportunidades
                de automatización con IA.
              </p>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-cyan/30 bg-cyan/5 p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-cyan" />
                <p className="font-display text-lg font-bold">¡Casi listo!</p>
                <p className="text-sm text-muted-foreground">
                  Recibirás la guía en tu correo. (Demo: aún no se envían datos reales.)
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="lm-name">Nombre</FieldLabel>
                  <TextInput id="lm-name" name="name" required placeholder="Tu nombre" autoComplete="name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="lm-email">Email</FieldLabel>
                  <TextInput id="lm-email" name="email" type="email" required placeholder="tucorreo@ejemplo.com" autoComplete="email" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="lm-business">Tipo de negocio</FieldLabel>
                  <Select id="lm-business" name="business" required defaultValue="">
                    <option value="" disabled>Selecciona una opción</option>
                    {businessTypeOptions.map((o) => (
                      <option key={o} value={o} className="bg-surface">{o}</option>
                    ))}
                  </Select>
                </div>
                <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[color:var(--brand-cyan)]" />
                  Acepto recibir información relacionada con Automia Labs.
                </label>
                {status === 'error' && (
                  <p className="text-xs text-destructive">Ha ocurrido un error. Inténtalo de nuevo.</p>
                )}
                <CTAButton type="submit" size="lg" disabled={status === 'loading'} onClick={() => trackEvent('lead_form_start', { form: 'lead_magnet' })}>
                  {status === 'loading' ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Enviando…</>
                  ) : (
                    <><Download className="h-4 w-4" /> Quiero la guía gratuita</>
                  )}
                </CTAButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
