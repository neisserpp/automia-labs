import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Isotipo "A" de Automia Labs recreado en SVG a partir de la identidad oficial
 * (A tecnológica con estela de datos, degradado cyan -> purple).
 * Para reemplazar por el asset oficial, usa /public/automia-logo-circle.png.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('h-8 w-8', className)}
      role="img"
      aria-label="Automia Labs"
      fill="none"
    >
      <defs>
        <linearGradient id="automia-a" x1="8" y1="12" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D4FF" />
          <stop offset="0.5" stopColor="#168BFF" />
          <stop offset="1" stopColor="#C026FF" />
        </linearGradient>
      </defs>
      {/* estela de datos */}
      <g stroke="url(#automia-a)" strokeWidth="3.4" strokeLinecap="round">
        <line x1="6" y1="26" x2="26" y2="26" />
        <line x1="10" y1="34" x2="30" y2="34" />
        <line x1="14" y1="42" x2="28" y2="42" />
      </g>
      <circle cx="4" cy="26" r="2.2" fill="#00D4FF" />
      <circle cx="7" cy="42" r="2.2" fill="#00D4FF" />
      {/* la A */}
      <path
        d="M32 8 L54 56 H45 L40.5 45 H27.5 L32 34 H36 L34 28 L23 56 H14 L32 8Z"
        fill="url(#automia-a)"
      />
    </svg>
  )
}

export function Logo({
  className,
  showTagline = false,
  href = '/',
}: {
  className?: string
  showTagline?: boolean
  href?: string
}) {
  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="Automia Labs — inicio"
    >
      <Image
        src="/automia-logo-circle.png"
        alt="Automia Labs"
        width={44}
        height={44}
        priority
        className="h-9 w-9 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-[0.18em] text-foreground">
          AUTOMIA
        </span>
        <span className="font-display text-[0.62rem] font-semibold tracking-[0.55em] text-gradient">
          LABS
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.6rem] tracking-wide text-muted-foreground">
            Automatizamos lo que te hace perder tiempo.
          </span>
        )}
      </span>
    </Link>
  )
}
