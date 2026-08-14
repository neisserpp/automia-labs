// Iconos de marca (no incluidos en lucide-react). SVG simples y accesibles.

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.5 22 13.6V21h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V21H9V9Z" />
    </svg>
  )
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23 12s0-3.2-.4-4.7a2.9 2.9 0 0 0-2-2C18.8 5 12 5 12 5s-6.8 0-8.6.3a2.9 2.9 0 0 0-2 2C1 8.8 1 12 1 12s0 3.2.4 4.7a2.9 2.9 0 0 0 2 2C5.2 19 12 19 12 19s6.8 0 8.6-.3a2.9 2.9 0 0 0 2-2C23 15.2 23 12 23 12ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  )
}

export function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.5 3c.3 2 1.6 3.6 3.5 3.9v2.6c-1.3 0-2.5-.4-3.5-1v6.1a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V3h2.7Z" />
    </svg>
  )
}
