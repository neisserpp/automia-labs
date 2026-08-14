import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad de Automia Labs.',
  alternates: { canonical: '/privacidad' },
  robots: { index: false },
}

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" updated="agosto de 2026">
      <p>
        En Automia Labs nos tomamos en serio la protección de tus datos personales. Esta política
        explica qué datos recogemos y cómo los tratamos.
      </p>
      <LegalSection heading="1. Responsable del tratamiento">
        <p>
          Automia Labs (Madrid, España). Contacto:{' '}
          <a className="text-cyan" href="mailto:hola@automialabs.com">hola@automialabs.com</a>.
        </p>
      </LegalSection>
      <LegalSection heading="2. Datos que recopilamos">
        <p>
          Los datos que nos facilitas a través de los formularios (nombre, email, empresa, tipo de
          negocio y la información que decidas compartir sobre tus necesidades).
        </p>
      </LegalSection>
      <LegalSection heading="3. Finalidad">
        <p>
          Usamos tus datos para responder a tus solicitudes, elaborar diagnósticos de automatización
          y, si lo consientes, enviarte información relacionada con nuestros servicios.
        </p>
      </LegalSection>
      <LegalSection heading="4. Legitimación">
        <p>
          La base legal es tu consentimiento y, en su caso, la ejecución de una relación
          precontractual o contractual.
        </p>
      </LegalSection>
      <LegalSection heading="5. Tus derechos">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
          portabilidad escribiendo a{' '}
          <a className="text-cyan" href="mailto:hola@automialabs.com">hola@automialabs.com</a>.
        </p>
      </LegalSection>
      <p className="text-xs">
        Este texto es una plantilla orientativa y debe adaptarse a la normativa aplicable (RGPD /
        LOPDGDD).
      </p>
    </LegalPage>
  )
}
