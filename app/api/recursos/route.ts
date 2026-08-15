import { NextResponse } from 'next/server'
import { resend, EMAIL_FROM, LEADS_TO_EMAIL, SITE_URL, escapeHtml, row, whatsappUrl, layout } from '@/lib/email'
import { getResource } from '@/lib/resources'

export const runtime = 'nodejs'

function clean(value: unknown, max = 300) {
  return String(value ?? '').trim().slice(0, max)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (clean(body.website_url, 200)) return NextResponse.json({ ok: true })

    const name = clean(body.name, 120)
    const email = clean(body.email, 254).toLowerCase()
    const business = clean(body.business, 120)
    const phone = clean(body.phone, 40)
    const resourceSlug = clean(body.resource, 100) || 'kit-automatizaciones-pymes'
    const consent = body.consent === true || body.consent === 'true'
    const problem = clean(body.problem, 80) || 'general'
    const sector = clean(body.sector, 120)
    const urgency = clean(body.urgency, 80)
    const resource = getResource(resourceSlug)
    const score = urgency === 'ahora' ? 90 : urgency === '30-dias' ? 65 : 35

    if (!name || !email || !email.includes('@') || !business || !resource || !consent) {
      return NextResponse.json({ ok: false, error: 'Completa los campos obligatorios y acepta el consentimiento.' }, { status: 400 })
    }

    const downloadUrl = `${SITE_URL}${resource.filePath}`
    const wa = whatsappUrl(phone, `Hola ${name}, soy de Automia Labs. Te escribo por el recurso gratuito que solicitaste.`)

    const internal = await resend.emails.send({
      from: EMAIL_FROM,
      to: [LEADS_TO_EMAIL],
      replyTo: email,
      subject: `Nuevo lead · ${resource.title} · ${name}`,
      html: layout('Nuevo lead de recurso', `Nueva descarga solicitada por ${name}`, `
        <p style="font-size:16px;color:#dce3ef;margin-top:0">Alguien ha solicitado un recurso gratuito.</p>
        <table style="width:100%;border-collapse:collapse">${row('Nombre',name)}${row('Email',email)}${row('Negocio',business)}${row('Teléfono',phone || '—')}${row('Recurso recomendado',resource.title)}${row('Problema detectado',problem)}${row('Sector',sector || '—')}${row('Urgencia',urgency || '—')}${row('Lead score',`${score}/100`)} </table>
        <div style="margin-top:22px">${wa ? `<a href="${wa}" style="display:inline-block;background:#25D366;color:#07100a;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700;margin-right:8px">WhatsApp</a>` : ''}<a href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: Tu recurso de Automia Labs')}" style="display:inline-block;background:#00d4ff;color:#071018;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700">Responder por email</a></div>
      `),
    })
    if (internal.error) {
      console.error('[api/recursos] Resend internal error:', internal.error)
      return NextResponse.json({ ok: false, error: 'No se pudo registrar la solicitud. Revisa Resend.' }, { status: 502 })
    }

    // Entrega inmediata desde la web para cualquier usuario, incluso antes de verificar un dominio.
    // El email automático al usuario se habilita cuando Resend permita destinatarios externos.
    return NextResponse.json({
      ok: true,
      downloadUrl,
      title: resource.title,
      emailDelivery: email === LEADS_TO_EMAIL.toLowerCase(),
      message: email === LEADS_TO_EMAIL.toLowerCase()
        ? 'Lead registrado. También se puede enviar por email porque es la dirección de prueba de Resend.'
        : 'Lead registrado. Descarga el recurso desde el botón de la web.',
    })
  } catch (error) {
    console.error('[api/recursos] Error:', error)
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 })
  }
}
