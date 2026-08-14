// Lightweight analytics event dispatcher.
// Ready to connect to Google Analytics / Meta Pixel / TikTok Pixel.
// For now it safely pushes to dataLayer (if present) and logs in dev.

type AnalyticsEvent =
  | 'cta_diagnostico_click'
  | 'lead_form_start'
  | 'lead_form_submit'
  | 'contact_form_submit'
  | 'guide_download'
  | 'solution_view'

export function trackEvent(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  // Google Analytics / GTM dataLayer
  const w = window as typeof window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...payload })
  }
  if (typeof w.gtag === 'function') {
    w.gtag('event', event, payload ?? {})
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('[v0] analytics event:', event, payload ?? {})
  }
}
