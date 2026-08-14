import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-brand text-primary-foreground shadow-[0_10px_40px_-12px_rgba(0,212,255,0.6)] hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-12px_rgba(124,58,237,0.7)]',
  secondary:
    'border border-white/15 bg-white/5 text-foreground hover:border-cyan/60 hover:bg-white/10 hover:-translate-y-0.5',
  ghost: 'text-muted-foreground hover:text-foreground',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 py-3.5 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
}

export function CTALink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />
}

export function CTAButton({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
}
