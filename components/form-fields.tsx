import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const fieldBase =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-cyan/50 focus:bg-white/[0.05] focus:outline-none'

export function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground/90">
      {children}
    </label>
  )
}

export function TextInput({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(fieldBase, className)} {...props} />
}

export function TextArea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(fieldBase, 'min-h-28 resize-y', className)} {...props} />
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select className={cn(fieldBase, 'appearance-none', className)} {...props}>
      {children}
    </select>
  )
}
