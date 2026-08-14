import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Política de cookies de Automia Labs.',
  alternates: { canonical: '/cookies' },
  robots: { index: false },
}

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" updated="agosto de 2026">
      <p>
        Este sitio utiliza cookies para mejorar tu experiencia de navegación y, con tu
        consentimiento, para medir el uso del sitio.
      </p>
      <LegalSection heading="1. Qué son las cookies">
        <p>
          Son pequeños archivos que se almacenan en tu dispositivo al visitar una web y permiten
          recordar información sobre tu navegación.
        </p>
      </LegalSection>
      <LegalSection heading="2. Tipos de cookies que usamos">
        <p>
          <strong className="text-foreground">Técnicas:</strong> necesarias para el funcionamiento
          del sitio.{' '}
          <strong className="text-foreground">Analíticas:</strong> nos ayudan a entender cómo se usa
          la web y solo se activan si las aceptas.
        </p>
      </LegalSection>
      <LegalSection heading="3. Gestión de cookies">
        <p>
          Puedes aceptar o rechazar las cookies no esenciales desde el aviso que aparece al entrar.
          También puedes configurarlas o eliminarlas desde tu navegador.
        </p>
      </LegalSection>
      <p className="text-xs">
        Este texto es una plantilla orientativa y debe adaptarse a las cookies que finalmente
        utilices.
      </p>
    </LegalPage>
  )
}
