import {
  MessageSquare,
  Copy,
  ClipboardList,
  BarChart3,
  UserCheck,
  FolderOpen,
  PenLine,
  Keyboard,
  MailCheck,
  CalendarClock,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const problems = [
  { icon: MessageSquare, text: 'Responder siempre las mismas preguntas' },
  { icon: Copy, text: 'Copiar información entre herramientas' },
  { icon: ClipboardList, text: 'Gestionar manualmente solicitudes' },
  { icon: BarChart3, text: 'Crear informes' },
  { icon: UserCheck, text: 'Hacer seguimiento de clientes' },
  { icon: FolderOpen, text: 'Organizar documentos' },
  { icon: PenLine, text: 'Preparar contenido' },
  { icon: Keyboard, text: 'Introducir datos manualmente' },
  { icon: MailCheck, text: 'Clasificar emails' },
  { icon: CalendarClock, text: 'Gestionar citas y solicitudes' },
]

export function ProblemSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="El problema"
          title={
            <>
              ¿Cuánto tiempo estás perdiendo en tareas que{' '}
              <span className="text-gradient">podrían hacerse automáticamente?</span>
            </>
          }
          description="Estas son algunas de las tareas repetitivas que consumen las horas del día en la mayoría de negocios."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map(({ icon: Icon, text }, i) => (
            <Reveal key={text} delay={(i % 3) * 0.06}>
              <div className="group relative flex h-full items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:bg-white/[0.04] hover:glow-cyan">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-cyan/40">
                  <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-cyan" />
                </span>
                <span className="text-sm font-medium leading-snug text-foreground">{text}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
