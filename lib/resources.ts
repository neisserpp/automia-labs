export type Resource = {
  title: string
  description: string
  path: string
}

export const resources: Record<string, Resource> = {
  'guia-automatizacion': {
    title: 'Guía gratuita de automatización con IA',
    description:
      'Una guía práctica para detectar tareas repetitivas y encontrar oportunidades de automatización en tu negocio.',
    path: '/recursos/guia-automatizacion.pdf',
  },

  // Añade aquí futuros kits:
  // 'kit-inmobiliarias': {
  //   title: 'Kit de automatización para inmobiliarias',
  //   description: 'Flujos y plantillas para captar y seguir leads.',
  //   path: '/recursos/kit-inmobiliarias.pdf',
  // },
}
