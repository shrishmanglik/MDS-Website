"use client"

import {
  Target,
  FileText,
  Sparkles,
  ScrollText,
  BarChart3,
  FlaskConical,
  Home,
  Shield,
  Palette,
  Stars,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Target,
  FileText,
  Sparkles,
  ScrollText,
  BarChart3,
  FlaskConical,
  Home,
  Shield,
  Palette,
  Stars,
}

export function ProductIcon({
  name,
  className,
  size,
}: {
  name: string
  className?: string
  size?: number
}) {
  const Icon = iconMap[name] || Target
  return <Icon className={className} size={size} />
}
