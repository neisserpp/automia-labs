'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Download,
  Loader2,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Target,
} from 'lucide-react'
import { CTAButton } from '@/components/cta-button'
import { FieldLabel, TextInput, Select } from '@/components/form-fields'
import { businessTypeOptions } from '@/lib/site-data'
import { trackEvent } from '@/lib/analytics'

type Status = 'idle' | 'loading' | 'success' | 'error'
type Problem = 'captacion' | 'atencion' | 'recuperacion' | 'general'

const options = [
  {
    id: 'captacion' as Problem,
    icon: Target,
    title: 'Conseguir más clientes',
    text: 'Recibo pocos leads o no convierto suficientes contactos.',
    resource: 'sistema-captacion-automatica',
  },
  {
    id: 'atencion' as Problem,
    icon: MessageCircle,
    title: 'Responder y atender mejor',
    text: 'Pierdo demasiado tiempo contestando las mismas preguntas.',
    resource: 'sistema-atencion-automatica',
  },
  {
    id: 'recuperacion' as Problem,
    icon: RefreshCw,
    title: 'Recuperar clientes interesados',
    text: 'Me preguntan, desaparecen y muchas oportunidades se enfrían.',
    resource: 'sistema-recuperacion-clientes',
  },
  {
    id: 'general' as Problem,
    icon: Sparkles,
    title: 'No sé qué automatizar',
    text: 'Quiero empezar con IA pero necesito detectar por dónde empezar.',
    resource: 'kit-automatizaciones-pymes',
  },
]

const resourceMeta: Record<
  string,
  { title: string; description: string; file: string }
> = {
  'sistema-captacion-automatica': {
    title: 'Sistema de Captación Automática',
    description:
      'Convierte contactos de web, Instagram y WhatsApp en oportunidades cualificadas.',
    file: '/recursos/sistema-captacion-automatica.pdf',
  },
  'sistema-atencion-automatica': {
    title: 'Sistema de Atención Automática',
    description:
      'Reduce preguntas repetitivas y deriva a una persona cuando haga falta.',
    file: '/recursos/sistema-atencion-automatica.pdf',
  },
  'sistema-recuperacion-clientes': {
    title: 'Sistema de Recuperación de Clientes',
    description:
      'Reabre conversaciones con oportunidades que se quedaron a medias.',
    file: '/recursos/sistema-recuperacion-clientes.pdf',
  },
  'kit-automatizaciones-pymes': {
    title: 'Guía práctica: automatización con IA para optimizar tu negocio',
    description:
      'Una guía completa para detectar oportunidades y empezar a automatizar con criterio.',
    file: '/recursos/guia-practica-automatizacion-ia-para-negocios.pdf',
  },
}

export function ResourceAdvisor() {
  const [step, setStep] = useState(1)
  const [problem, setProblem] = useState<Problem | ''>('')
  const [sector, setSector] = useState('')
  const [urgency, setUrgency] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [recommendation, setRecommendation] = useState('')

  const selected = useMemo(
    () => options.find((o) => o.id === problem),
    [problem]
  )

  const meta = recommendation ? resourceMeta[recommendation] : null

  function chooseProblem(id: Problem) {
    setProblem(id)
    trackEvent('resource_problem_selected', { problem: id })
    setStep(2)
  }

  function continueToLead() {
    if (!sector || !urgency) return

    setRecommendation(
      selected?.resource || 'kit-automatizaciones-pymes'
    )

    trackEvent('resource_recommendation_generated', {
      problem,
      sector,
      urgency,
    })

    setStep(3)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setStatus('loading')
    setError('')

    try {
      const form = e.currentTarget

      const data = Object.fromEntries(
        new FormData(form).entries()
      )

      data.consent = form.querySelector<HTMLInputElement>(
        'input[name="consent"]'
      )?.checked
        ? 'true'
        : 'false'

      data.resource =
        recommendation ||
        selected?.resource ||
        'kit-automatizaciones-pymes'

      data.problem = problem || 'general'
      data.sector = sector
      data.urgency = urgency

      const response = await fetch('/api/recursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.ok) {
        throw new Error(
          result.error || 'No se pudo entregar el recurso.'
        )
      }

      setDownloadUrl(result.downloadUrl)

      trackEvent('guide_download', {
        resource: data.resource,
        problem,
        sector,
        urgency,
      })

      setStatus('success')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ha ocurrido un error. Inténtalo de nuevo.'
      )

      setStatus('error')
    }
  }

  return (
    <section
      id="guia"
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            <Bot className="h-3.5 w-3.5" />
            Resource Intelligence
          </span>

          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-5xl">
            No busques una guía.{' '}
            <span className="text-gradient">
              Te decimos cuál necesitas.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Cuéntanos qué está frenando tu negocio y AutomiaLabs te
            recomienda el sistema que mejor encaja con tu problema.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-6 md:p-10">
          <div className="mb-8 flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span
              className={
                step >= 1 ? 'font-bold text-cyan' : ''
              }
            >
              01 Problema
            </span>

            <div className="h-px flex-1 bg-white/10" />

            <span
              className={
                step >= 2 ? 'font-bold text-cyan' : ''
              }
            >
              02 Perfil
            </span>

            <div className="h-px flex-1 bg-white/10" />

            <span
              className={
                step >= 3 ? 'font-bold text-cyan' : ''
              }
            >
              03 Recurso
            </span>
          </div>

          {status === 'success' && meta ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-cyan/30 bg-cyan/5 p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-cyan" />

              <p className="mt-4 font-display text-2xl font-bold">
                Tu recurso está listo.
              </p>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Te hemos recomendado{' '}
                <strong className="text-foreground">
                  {meta.title}
                </strong>{' '}
                según lo que nos contaste.
              </p>

              <a
                href={downloadUrl || meta.file}
                target="_blank"
                rel="noreferrer"
                download
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan px-6 py-3 text-sm font-bold text-black hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Descargar mi recurso
              </a>

              <p className="mt-5 text-xs text-muted-foreground">
                ¿Quieres que lo llevemos a tu negocio?{' '}
                <a
                  href="/diagnostico"
                  className="font-bold text-cyan hover:underline"
                >
                  Solicita un diagnóstico gratuito →
                </a>
              </p>
            </div>
          ) : step === 1 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {options.map((item) => {
                const Icon = item.icon

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => chooseProblem(item.id)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all hover:-translate-y-1 hover:border-cyan/40 hover:bg-cyan/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-cyan">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-display font-bold">
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.text}
                        </p>
                      </div>

                      <ArrowRight className="ml-auto mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-cyan" />
                    </div>
                  </button>
                )
              })}
            </div>
          ) : step === 2 ? (
            <div className="mx-auto max-w-2xl">
              <div className="mb-6 rounded-2xl border border-cyan/20 bg-cyan/5 p-5">
                <p className="text-xs uppercase tracking-widest text-cyan">
                  Problema detectado
                </p>

                <p className="mt-1 font-display text-lg font-bold">
                  {selected?.title}
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="ra-sector">
                    Tipo de negocio
                  </FieldLabel>

                  <Select
                    id="ra-sector"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                  >
                    <option
                      value=""
                      disabled
                      className="bg-surface text-foreground"
                    >
                      Selecciona una opción
                    </option>

                    {businessTypeOptions.map((o) => (
                      <option
                        key={o}
                        value={o}
                        className="bg-surface text-foreground"
                      >
                        {o}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="ra-urgency">
                    ¿Qué tan urgente es?
                  </FieldLabel>

                  <Select
                    id="ra-urgency"
                    value={urgency}
                    onChange={(e) =>
                      setUrgency(e.target.value)
                    }
                  >
                    <option
                      value=""
                      disabled
                      className="bg-surface text-foreground"
                    >
                      Selecciona una opción
                    </option>

                    <option
                      value="ahora"
                      className="bg-surface text-foreground"
                    >
                      Quiero solucionarlo cuanto antes
                    </option>

                    <option
                      value="30-dias"
                      className="bg-surface text-foreground"
                    >
                      En los próximos 30 días
                    </option>

                    <option
                      value="explorando"
                      className="bg-surface text-foreground"
                    >
                      Estoy explorando opciones
                    </option>
                  </Select>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Atrás
                </button>

                <CTAButton
                  type="button"
                  size="lg"
                  disabled={!sector || !urgency}
                  onClick={continueToLead}
                >
                  Encontrar mi recurso
                  <ArrowRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl">
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-cyan" />

                  <div>
                    <p className="text-xs uppercase tracking-widest text-cyan">
                      Recomendación AutomiaLabs
                    </p>

                    <p className="font-display text-lg font-bold">
                      {meta?.title}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {meta?.description}
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-4 md:grid-cols-2"
              >
                <input
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="ra-name">
                    Nombre
                  </FieldLabel>

                  <TextInput
                    id="ra-name"
                    name="name"
                    required
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="ra-email">
                    Email
                  </FieldLabel>

                  <TextInput
                    id="ra-email"
                    name="email"
                    type="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    autoComplete="email"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="ra-business">
                    Negocio / empresa
                  </FieldLabel>

                  <TextInput
                    id="ra-business"
                    name="business"
                    required
                    placeholder="Nombre de tu negocio"
                    autoComplete="organization"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="ra-phone">
                    WhatsApp (opcional)
                  </FieldLabel>

                  <TextInput
                    id="ra-phone"
                    name="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    autoComplete="tel"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-muted-foreground md:col-span-2">
                  <input
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 accent-[color:var(--brand-cyan)]"
                  />

                  Acepto recibir el recurso y comunicaciones relacionadas con Automia Labs.
                </label>

                {status === 'error' && (
                  <p className="text-xs text-destructive md:col-span-2">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Atrás
                  </button>

                  <CTAButton
                    type="submit"
                    size="lg"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Preparando…
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Obtener mi recurso gratis
                      </>
                    )}
                  </CTAButton>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            [
              'Personalizado',
              'No mostramos el mismo recurso a todo el mundo.',
            ],
            [
              'Sin compromiso',
              'El acceso al recurso es gratuito.',
            ],
            [
              'Orientado a resultados',
              'Cada guía está pensada para convertirse en una automatización real.',
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <p className="font-display font-bold">
                {title}
              </p>

              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}