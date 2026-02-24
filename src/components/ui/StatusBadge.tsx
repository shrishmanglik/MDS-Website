interface StatusBadgeProps {
  status: 'coming-soon' | 'in-development' | 'beta' | 'live' | 'desktop'
}

const statusConfig = {
  'coming-soon': {
    label: 'Coming Soon',
    classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    pulse: true,
  },
  'in-development': {
    label: 'In Development',
    classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    pulse: false,
  },
  beta: {
    label: 'Beta',
    classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    pulse: false,
  },
  live: {
    label: 'Live',
    classes: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    pulse: true,
  },
  desktop: {
    label: 'Desktop App',
    classes: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    pulse: false,
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.classes}`}
    >
      {config.pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {config.label}
    </span>
  )
}
