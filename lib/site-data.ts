export type SolutionKey =
  | 'atencion-al-cliente'
  | 'captacion-de-clientes'
  | 'administracion'
  | 'contenido'
  | 'ventas'
  | 'operaciones'

export const solutions: {
  key: SolutionKey
  title: string
  description: string
  icon: string
  points: string[]
}[] = [
  {
    key: 'atencion-al-cliente',
    title: 'Atención al cliente',
    description: 'Responde antes y mejor sin depender de estar disponible a todas horas.',
    icon: 'Headset',
    points: ['Respuestas automáticas', 'Clasificación de consultas', 'FAQs', 'Seguimiento'],
  },
  {
    key: 'captacion-de-clientes',
    title: 'Captación de clientes',
    description: 'Convierte cada contacto en una oportunidad organizada y con seguimiento.',
    icon: 'Magnet',
    points: ['Formularios', 'Leads', 'Clasificación', 'Seguimiento'],
  },
  {
    key: 'administracion',
    title: 'Administración',
    description: 'Reduce el trabajo manual de documentos, correos y datos del día a día.',
    icon: 'FolderCog',
    points: ['Documentos', 'Emails', 'Datos', 'Informes'],
  },
  {
    key: 'contenido',
    title: 'Contenido',
    description: 'Genera ideas y textos, y reutiliza lo que ya funciona en tu negocio.',
    icon: 'PenTool',
    points: ['Ideas', 'Textos', 'Publicaciones', 'Reutilización de contenido'],
  },
  {
    key: 'ventas',
    title: 'Ventas',
    description: 'No pierdas oportunidades por falta de seguimiento o desorden.',
    icon: 'TrendingUp',
    points: ['Seguimiento', 'CRM', 'Oportunidades', 'Notificaciones'],
  },
  {
    key: 'operaciones',
    title: 'Operaciones',
    description: 'Conecta tus herramientas y elimina los pasos manuales entre ellas.',
    icon: 'Cog',
    points: ['Flujos internos', 'Tareas repetitivas', 'Integraciones', 'Alertas'],
  },
]

export type BusinessKey = 'inmobiliarias' | 'clinicas' | 'gestorias' | 'autonomos'

export const businessTypes: {
  key: BusinessKey
  title: string
  icon: string
  examples: string[]
}[] = [
  {
    key: 'inmobiliarias',
    title: 'Inmobiliarias',
    icon: 'Building2',
    examples: [
      'Gestión de leads',
      'Seguimiento de interesados',
      'Respuestas iniciales',
      'Clasificación de consultas',
      'Generación de contenido inmobiliario',
    ],
  },
  {
    key: 'clinicas',
    title: 'Clínicas y centros',
    icon: 'Stethoscope',
    examples: [
      'Solicitudes de cita',
      'Preguntas frecuentes',
      'Recordatorios',
      'Gestión de consultas',
    ],
  },
  {
    key: 'gestorias',
    title: 'Gestorías y asesorías',
    icon: 'Briefcase',
    examples: [
      'Clasificación de documentos',
      'Emails',
      'Recopilación de información',
      'Seguimiento de clientes',
    ],
  },
  {
    key: 'autonomos',
    title: 'Autónomos y pequeños negocios',
    icon: 'Store',
    examples: [
      'Administración',
      'Presupuestos',
      'Contenido',
      'Leads',
      'Atención al cliente',
    ],
  },
]

export const businessTypeOptions = [
  'Inmobiliaria',
  'Clínica / centro de salud',
  'Gestoría / asesoría',
  'Autónomo',
  'Pequeño negocio / comercio',
  'Otro',
]
