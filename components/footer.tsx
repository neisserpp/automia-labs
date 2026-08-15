import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'
import { InstagramIcon, LinkedinIcon, YoutubeIcon, TiktokIcon } from '@/components/brand-icons'

const columns = [
  {
    title: 'Automia Labs',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Soluciones', href: '/soluciones' },
      { label: 'Cómo funciona', href: '/como-funciona' },
      { label: 'Nosotros', href: '/nosotros' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Guías', href: '/recursos' },
      { label: 'Blog', href: '/blog' },
      { label: 'Automatizaciones', href: '/soluciones' },
      { label: 'FAQ', href: '/recursos#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Aviso legal', href: '/aviso-legal' },
      { label: 'Política de privacidad', href: '/privacidad' },
      { label: 'Política de cookies', href: '/cookies' },
    ],
  },
]

const socials = [
  { icon: Mail, href: 'mailto:hola@automialabs.com', label: 'Email' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://instagram.com/automialabss', label: 'Instagram' },
  { icon: YoutubeIcon, href: 'https://youtube.com/@automialabss', label: 'YouTube' },
  { icon: TiktokIcon, href: 'https://tiktok.com/@automialabss', label: 'TikTok' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Automatizamos lo que te hace perder tiempo. IA + automatización para autónomos y
              pequeños negocios.
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-cyan" /> Madrid, España
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-foreground">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Automia Labs. Todos los derechos reservados.</p>
          <p>Automatizamos lo que te hace perder tiempo.</p>
        </div>
      </div>
    </footer>
  )
}
