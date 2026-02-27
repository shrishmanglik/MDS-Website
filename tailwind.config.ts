import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-void': 'var(--bg-void)',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-surface': 'var(--bg-surface)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-hover': 'var(--bg-hover)',
        'bg-tint-blue': 'var(--bg-tint-blue)',
        'bg-tint-purple': 'var(--bg-tint-purple)',
        'bg-tint-teal': 'var(--bg-tint-teal)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-accent': 'var(--text-accent)',
        'accent-blue': 'var(--accent-blue)',
        'accent-gold': 'var(--accent-gold)',
        'accent-purple': 'var(--accent-purple)',
        'accent-emerald': 'var(--accent-emerald)',
        'accent-amber': 'var(--accent-amber)',
        'cta-primary': 'var(--cta-primary)',
        'cta-hover': 'var(--cta-hover)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'border-custom': 'var(--border)',
        'border-visible': 'var(--border-visible)',
        'border-active': 'var(--border-active)',
      },
      fontFamily: {
        display: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        body: ['var(--font-general-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
        'gradient-hero': 'var(--gradient-hero)',
      },
      maxWidth: {
        'content': '1200px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
export default config
