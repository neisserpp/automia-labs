import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat, Raleway } from 'next/font/google'
import { CookieBanner } from '@/components/cookie-banner'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
})

const siteUrl = 'https://automialabs.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Automia Labs · IA y automatización para negocios en Madrid',
    template: '%s · Automia Labs',
  },
  description:
    'Automatizamos lo que te hace perder tiempo. Transformamos tareas repetitivas en procesos inteligentes con IA para autónomos y pequeños negocios de Madrid.',
  keywords: [
    'automatización con IA Madrid',
    'automatización para empresas Madrid',
    'IA para negocios Madrid',
    'automatización de procesos Madrid',
    'automatización para autónomos',
  ],
  authors: [{ name: 'Automia Labs' }],
  creator: 'Automia Labs',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Automia Labs',
    title: 'Automia Labs · IA y automatización para negocios',
    description:
      'Menos tareas repetitivas. Más tiempo para crecer. IA + automatización para autónomos y pequeños negocios.',
    images: [{ url: '/automia-logo.png', width: 1536, height: 1024, alt: 'Automia Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automia Labs · IA y automatización para negocios',
    description: 'Automatizamos lo que te hace perder tiempo.',
    images: ['/automia-logo.png'],
  },
  icons: {
    icon: '/automia-logo-circle.png',
    apple: '/automia-logo-circle.png',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#05070d',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Automia Labs',
  url: siteUrl,
  logo: `${siteUrl}/automia-logo-circle.png`,
  description:
    'IA + automatización para negocios. Automatizamos tareas repetitivas para autónomos y pequeñas empresas de Madrid.',
  slogan: 'Automatizamos lo que te hace perder tiempo.',
  areaServed: 'Madrid, España',
  sameAs: [
    'https://instagram.com/automialabs',
    'https://tiktok.com/@automialabs',
    'https://youtube.com/@automialabs',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${raleway.variable} bg-background`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
