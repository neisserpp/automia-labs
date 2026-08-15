import { NextResponse } from 'next/server'
import { resend, EMAIL_FROM, LEADS_TO_EMAIL, SITE_URL, escapeHtml, row, whatsappUrl, layout } from '@/lib/email'

export const runtime = 'nodejs'

function clean(value: unknown, max = 1200) {
  return String(value ?? '').trim().slice(0, max)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (clean(body.website_url, 200)) {
      return NextResponse.json({ ok: true })
    }

    const name = clean(body.name, 120)
    const email = clean(body.email, 254).toLowerCase()
    const company = clean(body.company, 160)
    const businessType = clean(body.businessType, 120)
    const website = clean(body.website, 300)
    const problem = clean(body.problem, 1600)
    const task = clean(body.task, 1600)
    const budget = clean(body.budget, 120)
    const phone = clean(body.phone, 40)
    const consent = body.consent === true || body.consent === 'true'

    if (!name || !email || !email.includes('@') || !businessType || !problem || !task || !consent) {
      return NextResponse.json({ ok: false, error: 'Completa los campos obligatorios y acepta el consentimiento.' }, { status: 400 })
    }

    const wa = whatsappUrl(phone, `Hola ${name}, soy de Automia Labs. Hemos recibido tu solicitud de diagnóstico.`)
    const dashboardUrl = `${SITE_URL}/diagnostico`

    const internalContent = `
      <p style="font-size:16px;color:#dce3ef;margin-top:0">Ha entrado un nuevo diagnóstico desde la web.</p>
      <table style="width:100%;border-collapse:collapse">${row('Nombre',name)}${row('Email',email)}${row('Empresa',company || '—')}${row('Tipo de negocio',businessType)}${row('Teléfono',phone || '—')}${row('Web',website || '—')}${row('Presupuesto',budget || '—')}</table>
      <div style="margin-top:20px;padding:16px;background:#0b101c;border-radius:14px;border:1px solid #263047"><div style="color:#8b95a7;font-size:12px;margin-bottom:6px">PROBLEMA PRINCIPAL</div><div style="white-space:pre-wrap">${escapeHtml(problem)}</div></div>
      <div style="margin-top:12px;padding:16px;background:#0b101c;border-radius:14px;border:1px solid #263047"><div style="color:#8b95a7;font-size:12px;margin-bottom:6px">TAREA QUE MÁS TIEMPO CONSUME</div><div style="white-space:pre-wrap">${escapeHtml(task)}</div></div>
      <div style="margin-top:22px">${wa ? `<a href="${wa}" style="display:inline-block;background:#25D366;color:#07100a;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700;margin-right:8px">Responder por WhatsApp</a>` : ''}<a href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: Diagnóstico Automia Labs')}" style="display:inline-block;background:#00d4ff;color:#071018;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700">Responder por email</a></div>
    `
    const internal = await resend.emails.send({
      from: EMAIL_FROM,
      to: [LEADS_TO_EMAIL],
      replyTo: email,
      subject: `Nuevo diagnóstico · ${name}${company ? ` · ${company}` : ''}`,
      html: layout('Nuevo diagnóstico', `Nuevo lead de ${name}`, internalContent),
    })

    if (internal.error) {
      console.error('[api/diagnostico] Resend internal error:', internal.error)
      return NextResponse.json({ ok: false, error: 'No se pudo enviar el diagnóstico. Revisa la configuración de Resend.' }, { status: 502 })
    }

    // Mientras no exista un dominio verificado, Resend limita los envíos de prueba a la propia cuenta.
    // Si el lead usa tu mismo Gmail, enviamos también la confirmación; con un dominio verificado se habilita para cualquier email.
    if (email === LEADS_TO_EMAIL.toLowerCase()) {
      const confirmation = await resend.emails.send({
        from: EMAIL_FROM,
        to: [email],
        subject: 'Hemos recibido tu diagnóstico · Automia Labs',
        html: layout('Solicitud recibida', 'Automia Labs ha recibido tu solicitud de diagnóstico.', `
          <p style="font-size:16px;line-height:1.6;color:#dce3ef">Hola <b>${escapeHtml(name)}</b>, hemos recibido correctamente tu solicitud.</p>
          <p style="font-size:15px;line-height:1.6;color:#aeb8c9">Revisaremos la información y prepararemos las oportunidades de automatización más relevantes para tu caso.</p>
          <a href="${dashboardUrl}" style="display:inline-block;background:#00d4ff;color:#071018;text-decoration:none;padding:13px 18px;border-radius:10px;font-weight:700">Volver a Automia Labs</a>
        `),
      })
      if (confirmation.error) console.error('[api/diagnostico] confirmation error:', confirmation.error)
    }

    return NextResponse.json({
      ok: true,
      message: 'Diagnóstico recibido correctamente.',
      emailConfirmation: email === LEADS_TO_EMAIL.toLowerCase(),
    })
  } catch (error) {
    console.error('[api/diagnostico] Error:', error)
    return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 })
  }
}
