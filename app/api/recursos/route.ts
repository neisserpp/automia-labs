import { NextResponse } from 'next/server'
import { resources } from '@/lib/resources'

function clean(value: unknown, max: number) {
  return String(value ?? '').trim().slice(0, max)
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
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
    throw new Error(`Resend: ${await response.text()}`)
  }

  return response.json()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot anti-spam
    if (clean(body.website_url, 100)) {
      return NextResponse.json({ ok: true })
    }

    const name = clean(body.name, 100)
    const email = clean(body.email, 254).toLowerCase()
    const business = clean(body.business, 120)
    const resourceKey = clean(body.resource, 80) || 'guia-automatizacion'
    const consent = Boolean(body.consent)

    if (!name || !email || !business || !consent || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Completa los datos y acepta la política de privacidad.' },
        { status: 400 },
      )
    }

    const resource = resources[resourceKey]

    if (!resource) {
      return NextResponse.json(
        { ok: false, error: 'El recurso solicitado no existe.' },
        { status: 404 },
      )
    }

    const destination = process.env.LEADS_TO

    if (!destination) {
      throw new Error('Falta LEADS_TO en las variables de entorno.')
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://automia-labs-f3ztr3ozn-neffexpp-gmailcoms-projects.vercel.app'

    const downloadUrl = `${baseUrl}${resource.path}`

    // 1. PRIMERO: enviamos el lead a tu Gmail.
    // Este es el envío importante para registrar el contacto.
    await sendEmail({
      to: destination,
      subject: `🎁 Nuevo lead — ${resource.title} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>Nuevo lead desde Recursos</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Negocio:</strong> ${escapeHtml(business)}</p>
          <p><strong>Recurso:</strong> ${escapeHtml(resource.title)}</p>
          <p><strong>Enlace de descarga:</strong> 
            <a href="${downloadUrl}">${downloadUrl}</a>
          </p>
        </div>
      `,
      replyTo: email,
    })

    // 2. DESPUÉS: intentamos enviar el recurso por email al usuario.
    // En la cuenta de prueba de Resend este envío puede ser bloqueado.
    // Si falla, NO hacemos fallar todo el formulario.
    try {
      await sendEmail({
        to: email,
        subject: `📘 Tu recurso gratuito: ${resource.title}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
            <h2>¡Aquí tienes tu recurso, ${escapeHtml(name)}!</h2>
            <p>${escapeHtml(resource.description)}</p>

            <p style="margin:28px 0">
              <a
                href="${downloadUrl}"
                style="display:inline-block;padding:14px 20px;border-radius:10px;background:#00d4ff;color:#041018;text-decoration:none;font-weight:700"
              >
                Descargar recurso gratuito
              </a>
            </p>

            <p style="font-size:13px;color:#6b7280">
              Si el botón no funciona, copia este enlace en tu navegador:<br>
              ${downloadUrl}
            </p>

            <p>
              <strong>Automia Labs</strong><br>
              IA + automatización para negocios.
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      console.warn('[api/recursos] No se pudo enviar el email al usuario:', emailError)
    }

    // El formulario se considera exitoso porque el lead sí fue registrado.
    return NextResponse.json({
      ok: true,
      downloadUrl,
    })
  } catch (error) {
    console.error('[api/recursos]', error)

    return NextResponse.json(
      {
        ok: false,
        error: 'No hemos podido procesar la solicitud. Inténtalo de nuevo.',
      },
      { status: 500 },
    )
  }
}