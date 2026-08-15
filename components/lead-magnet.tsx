'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle2, Loader2, Download, Target, MessageCircle, RefreshCw, Sparkles } from 'lucide-react'
import { CTAButton } from '@/components/cta-button'
import { FieldLabel, TextInput, Select } from '@/components/form-fields'
import { businessTypeOptions } from '@/lib/site-data'
import { trackEvent } from '@/lib/analytics'

type Status = 'idle' | 'loading' | 'success' | 'error'

const problemOptions = [
  { value: 'captacion', label: 'Conseguir más clientes / leads', resource: 'sistema-captacion-automatica', icon: Target },
  { value: 'atencion', label: 'Responder y atender mejor', resource: 'sistema-atencion-automatica', icon: MessageCircle },
  { value: 'recuperacion', label: 'Recuperar clientes interesados', resource: 'sistema-recuperacion-clientes', icon: RefreshCw },
  { value: 'general', label: 'No sé qué automatizar todavía', resource: 'kit-automatizaciones-pymes', icon: Sparkles },
]

export function LeadMagnet() {
  const [status, setStatus] = useState<Status>('idle')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    trackEvent('lead_form_submit', { form: 'lead_magnet' })
    setStatus('loading')
    setError('')
    try {
      const form = e.currentTarget
      const data = Object.fromEntries(new FormData(form).entries())
      const problem = String(data.problem || 'general')
      const selected = problemOptions.find((item) => item.value === problem) || problemOptions[3]
      data.consent = form.querySelector<HTMLInputElement>('input[name="consent"]')?.checked ? 'true' : 'false'
      data.resource = selected.resource

      const response = await fetch('/api/recursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok || !result.ok) throw new Error(result.error || 'No se pudo entregar el recurso.')
      setDownloadUrl(result.downloadUrl)
      trackEvent('guide_download', { resource: selected.resource, problem })
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error. Inténtalo de nuevo.')
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
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan"><BookOpen className="h-3.5 w-3.5" /> Guía gratuita</span>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-balance md:text-4xl">Descubre <span className="text-gradient">qué automatizar</span> antes de invertir en herramientas.</h2>
              <p className="text-base leading-relaxed text-muted-foreground">Te damos una guía práctica y, según tu principal reto, te recomendamos el sistema de automatización que más sentido tiene para tu negocio.</p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">No te enviaremos un PDF al azar.</p>
                <p className="mt-1">Usaremos tu respuesta para recomendarte el recurso más útil.</p>
              </div>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-cyan/30 bg-cyan/5 p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-cyan" />
                <p className="font-display text-lg font-bold">¡Tu recurso está listo!</p>
                <p className="text-sm text-muted-foreground">Hemos elegido el recurso según el reto que nos indicaste.</p>
                <a href={downloadUrl} target="_blank" rel="noreferrer" download className="inline-flex items-center gap-2 rounded-xl bg-cyan px-5 py-3 text-sm font-bold text-black hover:opacity-90"><Download className="h-4 w-4" /> Descargar mi recurso</a>
                <a href="/diagnostico" className="text-xs font-bold text-cyan hover:underline">¿Quieres que lo apliquemos a tu negocio? Solicita un diagnóstico →</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="flex flex-col gap-1.5"><FieldLabel htmlFor="lm-name">Nombre</FieldLabel><TextInput id="lm-name" name="name" required placeholder="Tu nombre" autoComplete="name" /></div>
                <div className="flex flex-col gap-1.5"><FieldLabel htmlFor="lm-email">Email</FieldLabel><TextInput id="lm-email" name="email" type="email" required placeholder="tucorreo@ejemplo.com" autoComplete="email" /></div>
                <div className="flex flex-col gap-1.5"><FieldLabel htmlFor="lm-business">Tipo de negocio</FieldLabel><Select id="lm-business" name="business" required defaultValue=""><option value="" disabled>Selecciona una opción</option>{businessTypeOptions.map((o) => <option key={o} value={o} className="bg-surface">{o}</option>)}</Select></div>
                <div className="flex flex-col gap-1.5"><FieldLabel htmlFor="lm-problem">¿Qué te gustaría mejorar primero?</FieldLabel><Select id="lm-problem" name="problem" required defaultValue=""><option value="" disabled>Selecciona tu principal reto</option>{problemOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</Select></div>
                <div className="flex flex-col gap-1.5"><FieldLabel htmlFor="lm-phone">WhatsApp (opcional)</FieldLabel><TextInput id="lm-phone" name="phone" type="tel" placeholder="+34 600 000 000" autoComplete="tel" /></div>
                <label className="flex items-start gap-2.5 text-xs text-muted-foreground"><input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 accent-[color:var(--brand-cyan)]" />Acepto recibir el recurso y comunicaciones relacionadas con Automia Labs.</label>
                {status === 'error' && <p className="text-xs text-destructive">{error}</p>}
                <CTAButton type="submit" size="lg" disabled={status === 'loading'} onClick={() => trackEvent('lead_form_start', { form: 'lead_magnet' })}>
                  {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Preparando…</> : <><Download className="h-4 w-4" /> Quiero mi recurso gratis</>}
                </CTAButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
