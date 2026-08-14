import {
  Headset,
  Magnet,
  FolderCog,
  PenTool,
  TrendingUp,
  Cog,
  Building2,
  Stethoscope,
  Briefcase,
  Store,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  Headset,
  Magnet,
  FolderCog,
  PenTool,
  TrendingUp,
  Cog,
  Building2,
  Stethoscope,
  Briefcase,
  Store,
}

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Cog
  return <Icon className={cn('h-5 w-5', className)} />
}
