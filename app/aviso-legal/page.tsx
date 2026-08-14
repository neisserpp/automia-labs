import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal de Automia Labs.',
  alternates: { canonical: '/aviso-legal' },
  robots: { index: false },
}

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal" updated="agosto de 2026">
      <p>
        El presente aviso legal regula el uso del sitio web de Automia Labs. El acceso y la
        navegación implican la aceptación de las condiciones aquí recogidas.
      </p>
      <LegalSection heading="1. Titularidad">
        <p>
          Este sitio web es titularidad de Automia Labs, con domicilio en Madrid, España. Puedes
          contactar en <a className="text-cyan" href="mailto:hola@automialabs.com">hola@automialabs.com</a>.
        </p>
      </LegalSection>
      <LegalSection heading="2. Objeto">
        <p>
          El sitio ofrece información sobre servicios de automatización e inteligencia artificial
          para negocios. Automia Labs se reserva el derecho a modificar los contenidos sin previo
          aviso.
        </p>
      </LegalSection>
      <LegalSection heading="3. Propiedad intelectual">
        <p>
          Los contenidos, marcas y logotipos mostrados están protegidos por derechos de propiedad
          intelectual e industrial. Queda prohibida su reproducción sin autorización.
        </p>
      </LegalSection>
      <LegalSection heading="4. Responsabilidad">
        <p>
          Automia Labs no se responsabiliza del uso indebido de los contenidos ni de los daños que
          pudieran derivarse del acceso al sitio.
        </p>
      </LegalSection>
      <p className="text-xs">
        Este texto es una plantilla orientativa y debe adaptarse a tu situación legal concreta.
      </p>
    </LegalPage>
  )
}
