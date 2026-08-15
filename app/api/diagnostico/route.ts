import { NextResponse } from 'next/server'

const MAX = {
  name: 100,
  email: 254,
  company: 150,
  businessType: 100,
  website: 500,
  problem: 3000,
  task: 3000,
  budget: 100,
}

function clean(value: unknown, max: number) {
  return String(value ?? '').trim().slice(0, max)
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function sendEmail(payload: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM

  if (!apiKey || !from) {
    throw new Error('Faltan RESEND_API_KEY o EMAIL_FROM en las variables de entorno.')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend: ${error}`)
  }

  return response.json()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot anti-spam. Los bots suelen rellenar campos ocultos.
    if (clean(body.website_url, 100)) {
      return NextResponse.json({ ok: true })
    }

    const name = clean(body.name, MAX.name)
    const email = clean(body.email, MAX.email).toLowerCase()
    const company = clean(body.company, MAX.company)
    const businessType = clean(body.businessType, MAX.businessType)
    const website = clean(body.website, MAX.website)
    const problem = clean(body.problem, MAX.problem)
    const task = clean(body.task, MAX.task)
    const budget = clean(body.budget, MAX.budget)
    const consent = Boolean(body.consent)

    if (!name || !email || !businessType || !problem || !task || !consent) {
      return NextResponse.json(
        { ok: false, error: 'Completa los campos obligatorios y acepta la política de privacidad.' },
        { status: 400 },
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'El email no es válido.' }, { status: 400 })
    }

    const destination = process.env.LEADS_TO
    if (!destination) {
      throw new Error('Falta LEADS_TO en las variables de entorno.')
    }

    const submittedAt = new Date().toLocaleString('es-ES', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Europe/Madrid',
    })

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2 style="margin-bottom:4px">Nuevo diagnóstico — Automia Labs</h2>
        <p style="color:#6b7280">${submittedAt}</p>
        <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0">
        <h3>Datos del contacto</h3>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Empresa:</strong> ${escapeHtml(company || 'No indicado')}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(businessType)}</p>
        <p><strong>Web:</strong> ${escapeHtml(website || 'No indicada')}</p>
        <h3>Situación</h3>
        <p><strong>Principal problema:</strong><br>${nl2br(problem)}</p>
        <p><strong>Tarea que más tiempo consume:</strong><br>${nl2br(task)}</p>
        <p><strong>Presupuesto:</strong> ${escapeHtml(budget || 'No indicado')}</p>
      </div>
    `

    await sendEmail({
      to: destination,
      subject: `🚀 Nuevo diagnóstico de ${name}${company ? ` — ${company}` : ''}`,
      html,
      replyTo: email,
    })

    await sendEmail({
      to: email,
      subject: 'Hemos recibido tu solicitud — Automia Labs',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>¡Gracias, ${escapeHtml(name)}!</h2>
          <p>Hemos recibido tu solicitud de diagnóstico gratuito.</p>
          <p>Vamos a revisar la información que nos has enviado y te contactaremos con oportunidades concretas de automatización para tu negocio.</p>
          <p style="color:#6b7280">Este correo es una confirmación automática. No necesitas responderlo.</p>
          <p><strong>Automia Labs</strong><br>IA + automatización para negocios.</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[api/diagnostico]', error)
    return NextResponse.json(
      { ok: false, error: 'No hemos podido enviar la solicitud. Inténtalo de nuevo.' },
      { status: 500 },
    )
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function nl2br(value: string) {
  return escapeHtml(value).replace(/\n/g, '<br>')
}
