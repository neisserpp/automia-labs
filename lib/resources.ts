export type ResourceProblem = 'captacion' | 'atencion' | 'recuperacion' | 'general'

export type Resource = {
  slug: string
  title: string
  description: string
  filePath: string
  problem: ResourceProblem
  tags: string[]
  cta: string
}

export const resources: Record<string, Resource> = {
  'kit-automatizaciones-pymes': {
    slug: 'kit-automatizaciones-pymes',
    title: 'Guía práctica: automatización con IA para optimizar tu negocio',
    description: 'Guía completa para entender ventajas, oportunidades, riesgos y primeros pasos de automatización con IA.',
    filePath: '/recursos/guia-practica-automatizacion-ia-para-negocios.pdf',
    problem: 'general',
    tags: ['no sé qué automatizar', 'automatización', 'ia', 'productividad'],
    cta: 'Descubrir oportunidades',
  },
  'sistema-captacion-automatica': {
    slug: 'sistema-captacion-automatica',
    title: 'Sistema de Captación Automática',
    description: 'Cómo convertir visitas y mensajes en oportunidades comerciales cualificadas.',
    filePath: '/recursos/sistema-captacion-automatica.pdf',
    problem: 'captacion',
    tags: ['captar clientes', 'leads', 'ventas', 'instagram', 'whatsapp', 'web'],
    cta: 'Quiero captar mejor',
  },
  'sistema-atencion-automatica': {
    slug: 'sistema-atencion-automatica',
    title: 'Sistema de Atención Automática',
    description: 'Cómo automatizar preguntas frecuentes y escalar a una persona cuando realmente hace falta.',
    filePath: '/recursos/sistema-atencion-automatica.pdf',
    problem: 'atencion',
    tags: ['whatsapp', 'atención', 'preguntas frecuentes', 'clientes', 'soporte'],
    cta: 'Quiero ahorrar tiempo',
  },
  'sistema-recuperacion-clientes': {
    slug: 'sistema-recuperacion-clientes',
    title: 'Sistema de Recuperación de Clientes',
    description: 'Cómo recuperar oportunidades que mostraron interés pero no terminaron comprando.',
    filePath: '/recursos/sistema-recuperacion-clientes.pdf',
    problem: 'recuperacion',
    tags: ['clientes perdidos', 'seguimiento', 'no responden', 'ventas', 'conversion'],
    cta: 'Quiero recuperar oportunidades',
  },
}

export function getResource(slug: string) {
  return resources[slug] ?? null
}

export function getRecommendedResource(problem: string, sector = '') {
  const p = problem.toLowerCase()
  const s = sector.toLowerCase()

  if (/capt|lead|cliente nuevo|ventas|instagram|publicidad|web/.test(p)) return resources['sistema-captacion-automatica']
  if (/whatsapp|responder|atenc|pregunta|soporte|mensaje|tiempo/.test(p)) return resources['sistema-atencion-automatica']
  if (/pierdo|desapare|no compr|seguimiento|recuper|interesado|abandona|no responde/.test(p)) return resources['sistema-recuperacion-clientes']
  if (/inmobili|cl[ií]nica|gestor|restaurante|aut[oó]nomo/.test(s) && /cliente|venta/.test(p)) return resources['sistema-captacion-automatica']
  return resources['kit-automatizaciones-pymes']
}
