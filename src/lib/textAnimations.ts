/**
 * Text animation presets for SplitText component.
 * Each preset defines how individual characters/words animate into view.
 */

export type SplitMode = 'chars' | 'words' | 'lines'
export type AnimationPreset = 'wave' | 'cascade' | 'blur-in' | 'scramble' | 'fade-up' | 'slide-up'

export interface TextAnimationConfig {
  /** How to split the text */
  splitMode: SplitMode
  /** Stagger delay between each unit (seconds) */
  stagger: number
  /** Duration of each unit's animation (seconds) */
  duration: number
  /** Initial state of each unit */
  from: Record<string, string | number>
  /** Final state of each unit */
  to: Record<string, string | number>
  /** Easing function */
  ease: string
}

export const textAnimationPresets: Record<AnimationPreset, TextAnimationConfig> = {
  wave: {
    splitMode: 'chars',
    stagger: 0.03,
    duration: 0.6,
    from: { opacity: 0, y: 40, rotateX: -90 },
    to: { opacity: 1, y: 0, rotateX: 0 },
    ease: 'power3.out',
  },
  cascade: {
    splitMode: 'chars',
    stagger: 0.02,
    duration: 0.5,
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    ease: 'power2.out',
  },
  'blur-in': {
    splitMode: 'chars',
    stagger: 0.025,
    duration: 0.6,
    from: { opacity: 0, filter: 'blur(10px)', y: 10 },
    to: { opacity: 1, filter: 'blur(0px)', y: 0 },
    ease: 'power2.out',
  },
  scramble: {
    splitMode: 'chars',
    stagger: 0.04,
    duration: 0.8,
    from: { opacity: 0 },
    to: { opacity: 1 },
    ease: 'none',
  },
  'fade-up': {
    splitMode: 'words',
    stagger: 0.06,
    duration: 0.6,
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    ease: 'power3.out',
  },
  'slide-up': {
    splitMode: 'lines',
    stagger: 0.1,
    duration: 0.8,
    from: { opacity: 0, y: '100%' },
    to: { opacity: 1, y: '0%' },
    ease: 'power3.out',
  },
}

/**
 * Characters used for the "scramble" effect — cycles through these
 * before resolving to the target character. AI/tech themed.
 */
export const SCRAMBLE_CHARS = '01!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
