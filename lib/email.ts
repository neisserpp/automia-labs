import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev'
export const LEADS_TO_EMAIL = process.env.LEADS_TO_EMAIL || 'neisserpinopaz@gmail.com'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://automia-labs.vercel.app'

export function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function normalizeWhatsApp(phone: string) {
  const raw = String(phone || '').trim()
  if (!raw) return ''
  let digits = raw.replace(/\D/g, '')
  if (digits.length === 9 && /^[6789]/.test(digits)) digits = `34${digits}`
  if (digits.startsWith('00')) digits = digits.slice(2)
  return digits.length >= 10 ? digits : ''
}

export function whatsappUrl(phone: string, message = '') {
  const normalized = normalizeWhatsApp(phone)
  if (!normalized) return ''
  return `https://wa.me/${normalized}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

export function layout(title: string, preheader: string, content: string) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;background:#080b14;font-family:Arial,Helvetica,sans-serif;color:#f7f9fc">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preheader)}</div>
<div style="padding:32px 12px;background:#080b14">
<div style="max-width:640px;margin:0 auto;background:#101522;border:1px solid #263047;border-radius:20px;overflow:hidden">
<div style="padding:24px 28px;border-bottom:1px solid #263047"><div style="font-size:12px;letter-spacing:2px;color:#00d4ff;font-weight:700">AUTOMIA LABS</div><h1 style="font-size:24px;line-height:1.2;margin:10px 0 0;color:#fff">${escapeHtml(title)}</h1></div>
<div style="padding:28px">${content}</div>
<div style="padding:18px 28px;border-top:1px solid #263047;color:#8b95a7;font-size:12px">Automia Labs · Automatización e IA para PYMEs</div>
</div></div></body></html>`
}

export function row(label: string, value: unknown) {
  return `<tr><td style="padding:9px 0;color:#8b95a7;width:38%;vertical-align:top">${escapeHtml(label)}</td><td style="padding:9px 0;color:#fff;vertical-align:top"><b>${escapeHtml(value)}</b></td></tr>`
}
