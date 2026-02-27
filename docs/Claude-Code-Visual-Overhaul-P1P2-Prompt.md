# CLAUDE CODE PROMPT — MDS Visual Overhaul Phase 1 + 2

## Paste this into Claude Code after Sprint 1 and Sprint 2 fixes are merged.

```
Read the frontend-design SKILL.md first. Then read the complete PRD at:
F:\Million Dollar AI Studio\MDS Website\MDS-WEBSITE-VISUAL-OVERHAUL-PRD.md

(Shrish: copy the PRD file into the website project root before running this)

You are executing Phases 1 and 2 of the MDS Website Visual Overhaul.

Source: F:\Million Dollar AI Studio\MDS Website\
Branch: Create `feature/visual-overhaul-p1` before making any changes.

IMPORTANT CONTEXT:
- This is a Next.js site with output: 'export' (static export)
- It already has Three.js, React Three Fiber, Framer Motion, Lenis, Tailwind
- The current design is FUNCTIONAL but needs to be ELEVATED to world-class
- Design benchmarks: linear.app, stripe.com, vercel.com
- Read the PRD thoroughly before writing ANY code

---

## PHASE 1: FOUNDATION (do this first, commit, verify)

### Step 1: Typography Upgrade
1. Download and self-host these fonts (add to public/fonts/):
   - Satoshi (Variable, from fontshare.com — free commercial license)
   - General Sans (Variable, from fontshare.com)
   - JetBrains Mono (from Google Fonts or jetbrains.com)
2. Configure in layout.tsx using next/font/local (NOT next/font/google)
   This ensures offline builds work and avoids the CI font-fetch issue.
3. Update Tailwind config with the new font families
4. Update CSS variables as specified in the PRD

### Step 2: Color System Upgrade
1. Update CSS variables in globals.css to match the PRD color palette
2. Verify all existing components still look correct with new colors
3. Pay special attention to text contrast (WCAG AA compliance)
4. Update any hardcoded color values to use CSS variables

### Step 3: Custom Cursor Component
1. Create src/components/ui/CustomCursor.tsx
2. Desktop only (disable on touch devices)
3. Small inner dot (8px) + larger outer ring (24px)
4. Ring expands over interactive elements
5. Use CSS custom properties for position (--cursor-x, --cursor-y)
6. Update via requestAnimationFrame with lerp smoothing
7. Respect prefers-reduced-motion (disable when reduced motion is on)
8. Add to layout.tsx

### Step 4: Navigation Upgrade
1. Update the header/navbar component:
   - Transparent at top of page
   - On scroll past 100px: add backdrop-blur-xl, bg-[rgba(10,10,15,0.85)]
   - Smooth height transition
   - Active page indicator (subtle blue underline)
2. CTA button in nav: gradient border, always visible
3. Mobile menu: full-screen overlay with staggered item animation

### Step 5: Footer Redesign
1. Update footer to match PRD layout
2. Gold gradient divider line
3. Link hover: underline animation (width 0% → 100% from left)
4. Subtle grid pattern background

### Step 6: Shared Components
Create these reusable components in src/components/ui/:

1. ScrollReveal.tsx — Framer Motion scroll-triggered entrance
   (opacity + translateY, configurable delay and offset)
2. GlassCard.tsx — Glassmorphism card with hover effects
3. GradientBorder.tsx — Animated gradient border wrapper
4. CountUp.tsx — Improved number animation (scroll-triggered)
5. SectionDivider.tsx — Gold gradient line between sections

### Step 7: Update globals.css
1. Improved grain overlay (more subtle, animated)
2. New gradient-mesh background (respect reduced motion!)
3. Cursor glow effect (radial gradient following cursor)
4. Scrollbar styling (thin, dark, with accent color thumb)
5. Selection color (::selection with brand colors)
6. Focus styles (visible, accessible, branded)

VERIFICATION after Phase 1:
- npm run build succeeds
- npm run lint passes
- ALL existing pages render correctly with new styles
- Typography is distinctive and readable
- Colors have sufficient contrast
- Custom cursor works on desktop, absent on mobile
- Reduced motion: all animations disabled
- Navigation transforms correctly on scroll

Commit: "Phase 1: Foundation — typography, colors, components, navigation"

---

## PHASE 2: HOMEPAGE HERO (do this second, commit, verify)

### Step 1: Rebuild ParticleNetwork
This is the centerpiece. Take your time.

Architecture:
- src/components/hero/ParticleField.tsx (the Three.js scene)
- src/components/hero/HeroContent.tsx (HTML overlay — headline, CTA)
- src/components/hero/HeroBackground.tsx (CSS gradient layers)
- src/components/hero/HeroErrorBoundary.tsx (fallback for WebGL failure)
- src/components/sections/Hero.tsx (orchestrator — assembles layers)

ParticleField requirements:
1. Use Points geometry (NOT individual meshes)
2. 200 particles on desktop, 100 on mobile, 0 if WebGL unavailable
3. Pre-allocate ALL Float32Arrays in useMemo (ZERO allocations in useFrame)
4. Particles drift in 3D space with brownian motion
5. Connection lines between nearby particles (capped at 300 connections max)
6. Lines colored along blue→purple→gold spectrum based on distance
7. Mouse interaction: particles gently repel from cursor (force field effect)
8. On load: particles start scattered, then gradually self-organize
9. Camera slowly drifts (subtle dolly and rotation)
10. Use spatial hashing or grid-based neighbor lookup (not O(n²))

PERFORMANCE REQUIREMENTS:
- < 16ms per frame on M1 MacBook Air
- Use navigator.hardwareConcurrency to detect device class
- If hardwareConcurrency <= 4: reduce to 75 particles, no connections
- If WebGL context lost: gracefully fall back to CSS gradient
- Test in Chrome DevTools Performance tab — no GC spikes

### Step 2: Hero Content Layer
1. Headline: "AI Systems You Actually Own"
   - Font: Satoshi at hero size (clamp 3.5rem → 7rem)
   - Letter-spacing: -0.03em
   - Color: ivory (#F5F0E8)
   - Entrance animation: words reveal one by one with 80ms stagger
   - Subtle glow on text (text-shadow with blue/purple at low opacity)

2. Subheadline:
   "We don't build demos. We build systems that run your business."
   - Delay 800ms after headline
   - Fade up from 20px below
   - Color: --text-secondary

3. CTA buttons:
   - "Get Your Free AI Audit" — gradient filled, primary
   - "See How We Build" — ghost style, subtle glow
   - Delay 1200ms after headline
   - Ambient breathing glow animation (very subtle)
   - Hover: glow intensifies, slight lift

4. Scroll indicator at bottom:
   - Animated chevron
   - "Scroll to explore" in small, wide-spaced text
   - Fades out on scroll

### Step 3: Scroll Transition to Proof Bar
1. As user scrolls:
   - Hero content fades and scales down (parallax)
   - Particle field zooms in subtly
   - Seamless transition into the proof/stats section
2. Proof bar: 4 stat cards in glass style
   - Numbers: CountUp on scroll-into-view
   - Use REAL MDS metrics only
   - Gold gradient line above the section

### Step 4: Cross-Browser + Mobile Testing
Test on:
- Chrome desktop ✓
- Firefox desktop ✓
- Safari desktop ✓
- Chrome mobile (Android) ✓
- Safari mobile (iOS) ✓
- With prefers-reduced-motion enabled ✓
- With WebGL disabled ✓

VERIFICATION after Phase 2:
- Hero loads in < 2 seconds
- Particles are smooth at 60fps on desktop
- Mobile shows simplified version (fewer particles or CSS fallback)
- Headline animation is crisp and well-timed
- CTAs are prominent and functional
- Scroll transition to proof bar is seamless
- Reduced motion: static gradient bg, text appears immediately
- WebGL disabled: CSS gradient fallback looks beautiful on its own

Commit: "Phase 2: Homepage hero — particle field, content animation, scroll transitions"

---

## AFTER COMPLETING PHASES 1 + 2:
Push the branch and create a PR. Shrish will review before we continue
to Phase 3 (remaining homepage sections) and Phase 4 (subpages).

These two phases are the foundation. If the hero doesn't make someone
say "whoa," nothing else matters. Get this right first.
```
