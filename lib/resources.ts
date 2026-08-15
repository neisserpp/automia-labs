export type Resource = {
  slug: string
  title: string
  description: string
  filePath: string
}

export const resources: Record<string, Resource> = {
  'kit-automatizaciones-pymes': {
    slug: 'kit-automatizaciones-pymes',
    title: '10 automatizaciones con IA que una PYME puede implementar',
    description: 'Kit práctico para detectar tareas repetitivas y oportunidades de automatización.',
    filePath: '/recursos/kit-10-automatizaciones-ia-para-pymes.pdf',
  },
}

export function getResource(slug: string) {
  return resources[slug] ?? null
}
