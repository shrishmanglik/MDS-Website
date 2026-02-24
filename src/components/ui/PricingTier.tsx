import { Check, ArrowRight, Star } from 'lucide-react'
import { Button } from './Button'

interface PricingTierProps {
  name: string
  price: string
  monthlySupport: string
  description: string
  features: string[]
  idealFor: string
  timeline: string
  ctaText: string
  ctaHref: string
  popular?: boolean
}

export function PricingTier({
  name,
  price,
  monthlySupport,
  description,
  features,
  idealFor,
  timeline,
  ctaText,
  ctaHref,
  popular = false,
}: PricingTierProps) {
  return (
    <div
      className={`relative rounded-2xl border bg-bg-secondary overflow-hidden transition-all duration-200 hover:scale-[1.02] ${
        popular
          ? 'border-accent-start ring-1 ring-accent-start/20'
          : 'border-border-custom hover:border-border-visible'
      }`}
    >
      {popular && (
        <div className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-accent-start to-accent-mid text-white text-xs font-semibold uppercase tracking-wider">
          <Star size={12} />
          Popular
        </div>
      )}

      <div className="p-6 md:p-8">
        <h3 className="font-heading text-xl font-semibold text-text-primary mb-1">
          {name}
        </h3>
        <div className="mb-1">
          <span className="font-mono text-2xl font-bold text-text-primary">{price}</span>
        </div>
        <p className="text-text-tertiary text-xs mb-4">
          + {monthlySupport}/mo support
        </p>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {description}
        </p>

        <ul className="space-y-2.5 mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
              <Check size={14} className="text-accent-emerald mt-0.5 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="text-xs text-text-tertiary mb-1">
          <span className="font-medium text-text-secondary">Ideal for:</span> {idealFor}
        </div>
        <div className="text-xs text-text-tertiary mb-6">
          <span className="font-medium text-text-secondary">Timeline:</span> {timeline}
        </div>

        <Button
          href={ctaHref}
          variant={popular ? 'primary' : 'secondary'}
          size="md"
          className="w-full"
        >
          {ctaText}
          <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  )
}
