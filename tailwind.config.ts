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
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-hover': 'var(--bg-hover)',
        'bg-tint-blue': 'var(--bg-tint-blue)',
        'bg-tint-purple': 'var(--bg-tint-purple)',
        'bg-tint-teal': 'var(--bg-tint-teal)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'accent-start': 'var(--accent-start)',
        'accent-mid': 'var(--accent-mid)',
        'accent-end': 'var(--accent-end)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
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
        heading: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--accent-start), var(--accent-mid))',
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
