# MDS WEBSITE VISUAL OVERHAUL — Production Requirements Document

## For: Claude Code / Antigravity Execution
## Priority: Execute AFTER Sprint 1 + Sprint 2 fixes are merged
## Estimated scope: 40-60 hours across multiple sessions
## Branch: `feature/visual-overhaul`

---

## THE VISION

Million Dollar AI Studio builds AI systems that companies actually own. The
website must not just SAY this — it must PROVE it. Every pixel, every
interaction, every transition should whisper: "These people don't just talk
about AI. They breathe it."

**Design benchmarks (study these before writing code):**
- linear.app — scroll-driven storytelling, monochrome elegance, product as hero
- stripe.com — gradient mastery, depth illusion, information density without clutter
- vercel.com — developer credibility, speed as aesthetic, dark mode perfection
- raycast.com — keyboard-first feel, command palette energy, crisp typography
- anthropic.com — intellectual confidence, whitespace as power, restrained luxury

**What we are NOT:**
- A freelancer portfolio (no "hire me" energy)
- An AI agency using templates (no cookie-cutter SaaS aesthetic)
- A tech demo (3D serves the story, never the other way around)

**What we ARE:**
- A studio that builds intelligence into businesses
- Premium. Aspirational. Engineered.
- The site IS the portfolio piece

---

## CORE DESIGN PHILOSOPHY

### The Metaphor: "Intelligence Emerging from Precision"

Every visual element maps to this metaphor:
- **Dark space** = the void before intelligence (background)
- **Particles/nodes** = raw data, inputs, chaos
- **Connections forming** = pattern recognition, AI processing
- **Crystalline structures** = the finished product, precision engineering
- **Gold accents** = value created, premium output

The user's scroll IS the transformation journey:
Raw chaos → Processing → Structure → Intelligence → Value

### The Feeling

When someone lands on milliondollarstudio.ai, they should feel:
1. **First 2 seconds:** "Whoa." (visual arrest)
2. **Next 5 seconds:** "This is different." (unlike any agency site)
3. **After scrolling:** "These people are serious." (depth of craft)
4. **By the end:** "I need to work with them." (conversion)

---

## BRAND SYSTEM (Updated)

### Color Palette
```css
:root {
  /* Backgrounds — Deep, rich, layered */
  --bg-void: #050508;          /* Deepest black — hero background */
  --bg-primary: #0A0A0F;       /* Main background */
  --bg-elevated: #111118;      /* Cards, elevated surfaces */
  --bg-surface: #16161F;       /* Interactive elements, hovers */

  /* Accent — The intelligence spectrum */
  --accent-blue: #2962FF;      /* Primary actions, links, active states */
  --accent-blue-glow: rgba(41, 98, 255, 0.15);  /* Glow halos */
  --accent-gold: #D4AF37;      /* Premium signals, achievements, highlights */
  --accent-gold-glow: rgba(212, 175, 55, 0.12);
  --accent-purple: #7C3AED;    /* AI/intelligence indicators */

  /* Text — Sharp hierarchy */
  --text-primary: #F5F0E8;     /* Ivory — headings, primary content */
  --text-secondary: #B8B8C8;   /* Body text */
  --text-tertiary: #6B6B7B;    /* Captions, metadata (raised from #9E9EAE for a11y) */
  --text-accent: #2962FF;      /* Links, interactive text */

  /* Gradients — Signature MDS gradients */
  --gradient-hero: linear-gradient(135deg, #2962FF 0%, #7C3AED 50%, #D4AF37 100%);
  --gradient-subtle: linear-gradient(180deg, rgba(41,98,255,0.08) 0%, transparent 50%);
  --gradient-gold-line: linear-gradient(90deg, transparent, #D4AF37, transparent);
}
```

### Typography
```css
/* Display — for hero headlines, section titles. Must be distinctive. */
/* Use a premium variable font. Suggestions in priority order: */
/* 1. "Satoshi" (modern geometric, available from fontshare.com) */
/* 2. "Cabinet Grotesk" (bold personality, from fontshare.com) */
/* 3. "Clash Display" (striking, from fontshare.com) */
/* DO NOT use Inter, Roboto, Arial, or any system font for display. */
/* These fonts are free, commercially licensed, and distinctive. */

--font-display: 'Satoshi', sans-serif;    /* Headings, hero text */
--font-body: 'General Sans', sans-serif;  /* Body copy, UI text */
--font-mono: 'JetBrains Mono', monospace; /* Code, data, technical elements */

/* Scale — bold, confident sizing */
--text-hero: clamp(3.5rem, 8vw, 7rem);     /* Hero headline */
--text-display: clamp(2.5rem, 5vw, 4.5rem); /* Section headlines */
--text-heading: clamp(1.5rem, 3vw, 2.25rem);/* Sub-sections */
--text-body: 1.125rem;                       /* Body copy (18px) */
--text-small: 0.875rem;                      /* Captions */

/* Letter spacing — tight for headlines, relaxed for body */
--tracking-tight: -0.03em;
--tracking-normal: 0;
--tracking-wide: 0.05em;
--tracking-ultra-wide: 0.15em;  /* For labels, badges, micro-text */
```

### Motion Principles
```
TIMING:
  - Micro-interactions: 150-250ms (hover, focus, toggle)
  - Element reveals: 400-600ms (fade in, slide up)
  - Section transitions: 600-900ms (scroll-triggered orchestrations)
  - Hero animations: 1200-2000ms (initial load sequence)

EASING:
  - Default: cubic-bezier(0.16, 1, 0.3, 1) — smooth deceleration
  - Bounce: cubic-bezier(0.34, 1.56, 0.64, 1) — playful overshoot
  - Dramatic: cubic-bezier(0.83, 0, 0.17, 1) — cinematic in/out

RULES:
  - Every animation must respect prefers-reduced-motion
  - No animation should delay the user from reading content
  - Scroll-driven animations > time-based animations (user controls pace)
  - Stagger reveals by 50-80ms between siblings
  - 3D elements: 30fps minimum on mobile, 60fps on desktop
```

---

## PAGE-BY-PAGE SPECIFICATION

---

### PAGE 1: HOMEPAGE

The homepage is a scroll-driven cinematic experience. Each section is a "scene"
that transforms into the next. The user's scroll is the narrative engine.

#### SCENE 1: THE HERO (viewport 1)

**Concept:** The user enters a dark void. Particles drift lazily in 3D space —
raw, unstructured, chaotic. As the page loads, the particles begin to self-
organize, connections form between them, and the MDS logo / headline
crystallizes from the chaos. This IS the metaphor: we take chaos and build
intelligence.

**Technical implementation:**

```
LAYER 0 (furthest back): Deep gradient void
  - Radial gradient from --bg-void center to pure black edges
  - Subtle grain overlay (opacity 0.03, animated grain texture)
  - Faint nebula-like color wash (very subtle purple/blue at 3-5% opacity)

LAYER 1: 3D Particle Field (Three.js / R3F)
  - 200-300 particles (points, not meshes — performance)
  - Particles exist in true 3D space with depth (z-axis spread: -500 to 500)
  - Initial state: random drift, brownian motion, no connections
  - On load (after 500ms): particles begin attracting to form clusters
  - Connections appear between nearby particles (distance threshold)
  - Lines are semi-transparent, colored along the --gradient-hero spectrum
  - Mouse/cursor interaction: particles gently repel from cursor position
    (like a magnetic field — cursor is a force, not a magnet)
  - Mobile: particles respond to device gyroscope (DeviceOrientation API)
    OR simplified 2D version with CSS animations as fallback
  - Performance budget: < 16ms per frame on M1 MacBook Air

  CRITICAL PERFORMANCE RULES:
  - Use InstancedMesh or Points geometry, NOT individual meshes
  - Pre-allocate ALL buffers (see Sprint 1 fix for the pattern)
  - Connection lines: use a single LineSegments geometry, not individual Lines
  - Adaptive quality: detect GPU capability, reduce particle count on low-end
  - Mobile: cap at 100 particles, disable connection lines, use 2D fallback
  - Always provide CSS gradient fallback if WebGL context fails

LAYER 2: Content (HTML overlay on top of canvas)
  - Headline: "AI Systems You Actually Own"
    - Typography: --font-display at --text-hero size
    - Tracking: --tracking-tight
    - Color: --text-primary (#F5F0E8)
    - Entrance: Characters reveal one by one OR word by word,
      with a subtle glow trail (like text being "written by intelligence")
    - The text should feel like it's EMERGING from the particle field,
      not just sitting on top of it
  
  - Subhead: "We don't build demos. We build systems that run your business."
    - Delay: 800ms after headline completes
    - Fade up from 20px below, opacity 0→1, 500ms

  - CTA cluster (two buttons):
    Button 1: "Get Your Free AI Audit" (primary — gradient border, filled)
    Button 2: "See How We Build" (secondary — ghost, subtle glow on hover)
    - Delay: 1200ms after headline
    - Buttons have a subtle ambient glow animation (breathing light effect)
    - On hover: glow intensifies, button lifts slightly (translateY -2px),
      background fills with gradient

  - Scroll indicator: Subtle animated chevron or line at bottom
    "Scroll to explore" in --text-tertiary with --tracking-ultra-wide
    - Fades out when user starts scrolling

LAYER 3 (closest): Cursor glow effect
  - Radial gradient that follows the cursor
  - Color: --accent-blue at 5-8% opacity
  - Size: 400-600px diameter, soft feathered edge
  - This creates a "flashlight in the void" effect
  - Performance: use CSS custom properties for position (no JS repaints)
```

**Scroll behavior for Scene 1:**
- As user scrolls down, particles begin accelerating their organization
- Headline fades up and scales down slightly (parallax)
- Canvas zooms in subtly (camera moves forward in z-axis)
- Seamless transition INTO Scene 2 — no hard section break

#### SCENE 2: THE PROOF BAR (0.5 viewport)

**Concept:** A thin, high-density credibility strip. Not "client logos" (we don't
have enterprise logos yet). Instead, show CAPABILITY proof.

**Layout:**
```
┌────────────────────────────────────────────────────────────────────┐
│  "What we've built"                                                 │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ 99.2%    │  │ $0.003   │  │ 14 days  │  │ 5 AI     │           │
│  │ extraction│  │ per AI   │  │ from zero│  │ products │           │
│  │ accuracy │  │ interaction│ │ to deploy│  │ in build │           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                                                                      │
│  → See the case studies                                             │
└────────────────────────────────────────────────────────────────────┘
```

**Implementation:**
- Numbers animate up (CountUp) when scrolled into view
- Each stat card has a subtle border that glows on hover
- Background: slight gradient wash, barely distinguishable from hero
- The gold horizontal line (--gradient-gold-line) separates this from hero
- Cards have a glassmorphism treatment: 
  `backdrop-filter: blur(12px); background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);`

**IMPORTANT:** Only use REAL numbers from actual MDS projects. The 99.2%
extraction accuracy is from the invoice processing case study. The $0.003 per
interaction is from the deterministic-first architecture. Do not invent stats.

#### SCENE 3: SERVICES — "What We Build" (1.5 viewports)

**Concept:** Interactive showcase of the three revenue pillars. Not a boring
grid — a dynamic, explorable space where each service reveals depth on
interaction.

**Layout: Orbital Cards**
```
Three large cards arranged in a slight arc (not a flat grid).
Each card is a "portal" into that service world.

   ┌─────────────┐
   │  AI SERVICES │  ← Glows blue, primary revenue pillar
   │  $3K – $50K  │
   │  "Cash engine"│
   └──────┬──────┘
          │
  ┌───────┴───────┐
  │               │
┌─┴───────────┐ ┌─┴───────────┐
│ AI PRODUCTS  │ │ CUSTOM AI   │
│ Recurring    │ │ $50K–$200K+ │
│ Revenue      │ │ Enterprise  │
└─────────────┘ └─────────────┘
```

**Card behavior:**
- Default: cards float subtly (CSS transform with gentle sine wave)
- On hover: card lifts, glows, and reveals a mini-preview of deliverables
  (e.g., AI Services card shows a miniature website, automation flow, and
  marketing dashboard as tiny floating screenshots)
- On click: smooth expand animation, card becomes a full-width panel
  with detailed service breakdown (replaces the current accordion)
- Background of each card: unique subtle gradient matching its identity
  - Services: blue spectrum
  - Products: purple spectrum
  - Custom: gold spectrum

**Scroll-triggered entrance:**
- Cards emerge from below (translateY 60px → 0, opacity 0 → 1)
- Staggered by 100ms each
- Connection lines (like the particle network) briefly flash between cards,
  showing they're part of one system

**Mobile:** Stack vertically with horizontal scroll option for the mini-previews.

#### SCENE 4: PRODUCTS — "What We're Building" (2 viewports)

**Concept:** A horizontal showcase of MDS's AI products. The user scrolls
vertically, but the products scroll HORIZONTALLY — creating a cinematic
"reveal" effect like peeling back layers. Each product gets its own visual
identity while staying cohesive with the MDS brand.

**Technical: Horizontal scroll within vertical scroll**
```
Use CSS scroll-snap or Framer Motion's useScroll + useTransform:

const { scrollYProgress } = useScroll({ target: sectionRef });
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

The section is "sticky" while the user scrolls through it, and the
horizontal carousel moves in response to vertical scroll.
```

**Each product card (5 cards):**
```
┌────────────────────────────────────────┐
│ ┌──────────────────────────────┐       │
│ │                              │       │
│ │   [Product mock screenshot   │       │
│ │    or abstract visual         │       │
│ │    representing the product]  │       │
│ │                              │       │
│ └──────────────────────────────┘       │
│                                         │
│ AstroAI Studio                          │
│ "Vedic astrology, computed not guessed" │
│                                         │
│ Swiss Ephemeris precision • AI insight  │
│ ── ₹199/mo ──                          │
│                                         │
│ [Join Waitlist →]     Status: Beta      │
└────────────────────────────────────────┘
```

**Visual treatment per product:**
- AstroAI: deep indigo/violet gradient, constellation dot pattern
- ChemAI: emerald/teal gradient, molecular bond patterns
- Thread Intelligence: warm amber/rose gradient, fabric weave texture
- FinSight: steel blue/silver gradient, data grid pattern
- ATLAS: forest green/earth tones, map contour lines

**Each card should have:**
- A unique background visual (not a photo — a generative/abstract pattern
  created with CSS or canvas, matching the product's domain)
- Product name in --font-display
- One-line differentiator in --font-body
- 2-3 feature pills (small badges)
- Pricing signal
- CTA button (waitlist or learn more)
- Status badge ("Beta", "Coming Soon", "Live")

**Hover/interaction:**
- Card scales up 1.02x
- Shadow deepens
- Background pattern subtly animates (particles flow, molecules rotate, etc.)

#### SCENE 5: TECHNOLOGY — "How We Build" (1.5 viewports)

**Concept:** This is where we show the MIDAS framework and deterministic-first
architecture. Instead of walls of text, we show it as an INTERACTIVE DIAGRAM.

**The "Intelligence Stack" visualization:**
```
A vertical pipeline diagram, scroll-driven:

As the user scrolls, each layer of the stack "activates" from bottom to top:

  ┌─────────────────────────────────┐
  │  AI INTERPRETATION LAYER         │ ← Glows gold (5% of compute)
  │  "Only the truly creative work"  │    Activates LAST
  ├─────────────────────────────────┤
  │  RULE ENGINE                     │ ← Glows purple (20%)
  │  "Pattern matching at scale"     │    Activates second
  ├─────────────────────────────────┤
  │  DETERMINISTIC COMPUTE           │ ← Glows blue (75%)
  │  "Math. Physics. Lookup tables." │    Activates first
  └─────────────────────────────────┘
       ↑
       INPUT DATA
```

**Behavior:**
- On scroll, each layer fills with color from left to right (progress bar)
- A small counter shows "% of compute" for each layer
- The gold AI layer is intentionally THIN — visually communicating that
  AI is the capstone, not the foundation
- Small floating annotations appear beside each layer explaining the cost
  implication: "This layer costs $0.00 per query" → "$0.003 per query"
- At the end: a summary statement fades in:
  "95% deterministic. 5% AI. 100% yours."

**Below the stack: The MIDAS Framework teaser**
- A bento grid (3x2) showing framework capabilities:
  - Dev Studio | Design Studio | Research Studio
  - Content Engine | Quality Gates | Cost Optimizer
- Each card has a small animated icon and one sentence
- Link to Technology page for deep dive
- Background: subtle blueprint/grid pattern (opacity 0.03)

#### SCENE 6: CASE STUDIES — "What It Looks Like" (1 viewport)

**Concept:** Featured case studies as cinematic cards with results.

**Layout:** 2-3 featured case studies in large format
```
Each case study card:
┌──────────────────────────────────────────────────┐
│                                                    │
│  [Abstract visual / result graphic]                │
│                                                    │
│  CASE STUDY                                        │
│  Invoice Processing Automation                     │
│                                                    │
│  "From PDF chaos to structured data"               │
│                                                    │
│  ┌──────┐  ┌──────┐  ┌──────┐                     │
│  │99.2% │  │ 340ms│  │$0.02 │                      │
│  │accur.│  │speed │  │/doc  │                      │
│  └──────┘  └──────┘  └──────┘                     │
│                                                    │
│  Read case study →                                 │
└──────────────────────────────────────────────────┘
```

**Interaction:** Cards have a parallax depth effect on mouse move (tilt).
Use a subtle 3D perspective transform that follows the cursor.

#### SCENE 7: CTA — "The Close" (0.75 viewport)

**Concept:** The final conversion push. Simple. Bold. Unmissable.

**Content:**
```
┌──────────────────────────────────────────────────┐
│                                                    │
│   "Ready to build intelligence                     │
│    into your business?"                            │
│                                                    │
│   [Get Your Free AI Audit]  [Book a Call]          │
│                                                    │
│   Or email shrish@milliondollarstudio.ai          │
│                                                    │
└──────────────────────────────────────────────────┘
```

**Visual:** The particle field from the hero returns, but now fully organized
into a crystalline structure — the journey is complete. Intelligence has been
built. The transformation metaphor resolves.

**The particles should form a subtle, abstract representation of a neural
network or interconnected system behind the CTA text.**

---

### PAGE 2: SERVICES PAGE

**Design:** Expand-on-click cards replace the current accordion. Each service
tier gets a full visual treatment.

**Hero:** Minimal — headline + subhead, no 3D (save performance for content).
Background: subtle version of the particle field (fewer particles, slower).

**Service cards:** Full-width expandable panels with:
- Icon (custom, animated on hover)
- Service name + price range
- Key deliverables (3-5 items)
- Timeline
- "What you get" list
- CTA: "Start This Project"

**Comparison table** at bottom (for enterprise buyers who want to compare tiers).

**New element: Process timeline**
```
A horizontal timeline showing the 5-phase delivery process:
Discovery → Architecture → Build → Test → Deploy

Each phase is a node on the timeline. On scroll, each node activates
and shows a brief description. This builds trust by showing methodology.
```

---

### PAGE 3: PRODUCTS PAGE

**Design:** Gallery layout with large product cards (reuse horizontal scroll
from homepage, but full-page here with more detail).

Each product gets a mini-landing-page treatment within a card:
- Hero visual (generative background matching product domain)
- Value proposition
- 3 key features
- Tech stack badges (small, monochrome)
- Pricing
- CTA (waitlist / learn more)
- Status indicator

---

### PAGE 4: TECHNOLOGY PAGE

**Design:** The deep-dive on MIDAS and deterministic-first architecture.
This page is for technical buyers and developers.

**Structure:**
1. Hero: "Built Different" headline + animated tech stack diagram
2. Deterministic-First explained (with the interactive stack from homepage,
   but expanded with more detail)
3. MIDAS Framework deep dive:
   - Interactive diagram of studio orchestration
   - Each studio is a clickable node
   - On click: shows capabilities, tools, and how it connects to others
4. Cost comparison: MDS approach vs. traditional AI approach
   (animated bar chart showing cost difference)
5. Open source commitment / transparency section
6. CTA: "See it in action" → case studies

---

### PAGE 5: CASE STUDIES

**Design:** Each case study is a mini-experience with scroll-driven reveals.

**Template per case study:**
1. Hero: challenge statement in large type
2. The problem (with visual — before state)
3. The approach (with MIDAS process diagram)
4. The solution (with architecture diagram or screenshot)
5. The results (animated number counters, prominent)
6. Key insight / learning
7. Related case studies
8. CTA

---

### PAGE 6: ABOUT

**Design:** Personal, human, but still premium. This is Shrish's story.

**Key changes from current:**
- Add real photography (founder photo — even phone quality is fine)
- Break wall-of-text with pull quotes and visual sections
- Timeline of MDS journey (can be creative — not just a vertical list)
- Values section with icons/illustrations
- Team section (even if solo — show the AI tools as "team members"
  with a creative treatment: "Shrish + Claude + MIDAS = MDS")

---

### PAGE 7: CONTACT / BUILD WITH US

**Design:** The form page should feel like an invitation, not a chore.

- Left side: why work with us (3 key differentiators with icons)
- Right side: the form (clean, minimal, well-spaced)
- Below form: alternative contact methods (email, Calendly, LinkedIn)
- Background: very subtle version of the particle field
- Form success state: celebration animation (confetti or particle burst)

---

### PAGE 8: BLOG

**Design:** Clean, editorial layout. Content-first.

- Blog index: card grid with featured post at top (large)
- Each card: title, excerpt, date, reading time, category tag
- Blog post: max-width 65ch, generous line spacing, pull quotes
- Related posts at bottom
- Share buttons
- Anchor links with proper scroll offset (fixed in Sprint 1)

---

## GLOBAL ELEMENTS

### Navigation

**Desktop:**
```
┌──────────────────────────────────────────────────────────────────┐
│  [MDS Logo]    Services  Products  Technology  Case Studies  Blog │
│                                           [Get Your Free Audit →]│
└──────────────────────────────────────────────────────────────────┘
```

- Sticky, but transforms on scroll:
  - At top: full-width, transparent background
  - After scrolling 100px: backdrop-blur kicks in, bg becomes 
    rgba(10,10,15,0.85), nav shrinks slightly in height
  - Transition: 200ms, smooth
- Active page indicator: subtle underline with --accent-blue
- CTA button: always visible, gradient border, filled on hover
- Logo: subtle glow on hover

**Mobile:**
- Hamburger icon with animation (three lines → X)
- Full-screen overlay menu with large tap targets
- Menu items animate in staggered (50ms delay each)
- Background blur on the page behind the menu

### Footer

**Design:** Rich footer, not just a link dump.
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                    │
│  [MDS Logo]                                                        │
│  "AI systems you actually own"                                    │
│                                                                    │
│  Services    Products    Technology    About                       │
│  Case Studies    Blog    Contact    Privacy                       │
│                                                                    │
│  ─────────────── (gold gradient line) ───────────────            │
│                                                                    │
│  shrish@milliondollarstudio.ai    LinkedIn                        │
│  © 2026 Million Dollar AI Studio                                  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

- Subtle grid pattern in background (opacity 0.02)
- Links have hover underline animation (left to right reveal)
- Social icons: monochrome, glow on hover

### Custom Cursor (Desktop Only)

```
- Default: small dot (8px) with outer ring (24px)
- Over interactive elements: ring expands, fills with --accent-blue-glow
- Over text: ring becomes a text cursor shape
- Over images/cards: ring expands further, shows "View" text
- Smooth following with slight lag (lerp factor 0.15)
- Implementation: pure CSS custom properties for position,
  updated via requestAnimationFrame for smoothness
- MUST have fallback to default cursor if custom cursor fails
- Disable on mobile (use native touch feedback)
```

### Page Transitions

```
When navigating between pages:
- Content fades out (200ms)
- Brief black screen with loading indicator (MDS logo pulse)
- New page content fades in (300ms)
- Use Next.js App Router layout transitions
- If view-transitions API is supported, use it for seamless morphing
  of shared elements (nav, footer)
```

### Scroll Behavior

```
- Use Lenis for smooth scrolling (already in the project)
- Scroll-driven animations via Framer Motion's useScroll + useTransform
- Every section has a scroll-triggered entrance animation
- Standard pattern for all sections:
  1. Element starts 40-60px below final position, opacity 0
  2. On entering viewport (threshold 0.2): slide up + fade in
  3. Stagger children by 50-80ms
  4. Once animated in, elements stay (no exit animations on scroll-out)
```

---

## MICRO-INTERACTIONS

These tiny details separate "good" from "unforgettable":

### Buttons
```
- Idle: subtle gradient border animation (shimmer effect, very slow)
- Hover: background fills with gradient, slight lift (translateY -2px),
  shadow intensifies, cursor ring expands
- Active (click): scale 0.98 briefly (tactile press feel)
- Focus: visible focus ring in --accent-blue (accessibility)
```

### Links
```
- Hover: underline animates in from left to right (width 0% → 100%)
- Color transition to --accent-blue
- External links: subtle arrow icon appears to the right
```

### Cards
```
- Hover: entire card lifts (translateY -4px), shadow deepens
- Border becomes slightly more visible (opacity 0.06 → 0.12)
- Background gains subtle gradient wash
- Glassmorphism intensifies slightly
```

### Form Fields
```
- Idle: border --bg-surface, background transparent
- Focus: border --accent-blue, subtle glow shadow,
  label slides up and shrinks (floating label pattern)
- Error: border red, shake animation (200ms, translateX ±4px)
- Success: brief green flash on border
```

### Numbers / Stats
```
- CountUp animation when scrolled into view
- Number color: --accent-gold for impressive metrics
- Optional: small sparkle animation when count completes
```

---

## TECHNICAL CONSTRAINTS & PERFORMANCE BUDGET

### Hard Requirements
```
- Static export (output: 'export') must still work
- Lighthouse Performance score: > 85 on desktop, > 70 on mobile
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s on 4G connection
- Total JS bundle (homepage): < 350KB gzipped
- 3D canvas: < 16ms per frame on mid-range laptop
- All animations respect prefers-reduced-motion
- All interactive elements keyboard accessible
- Contrast ratio: WCAG AA minimum for all text
```

### Performance Strategy
```
1. Three.js scene: lazy load, desktop only, with CSS fallback
2. Below-fold sections: dynamic import with intersection observer
3. Fonts: self-host, preload critical weights, display: swap
4. Images: WebP with fallback, explicit width/height, lazy load
5. CSS animations preferred over JS where possible
6. No layout shifts: all dynamic content has reserved space
7. Critical CSS inlined, non-critical deferred
```

### Reduced Motion Experience
```
When prefers-reduced-motion is enabled:
- 3D particle field → static gradient background
- CountUp numbers → show final number immediately
- Scroll-driven animations → content visible immediately, no animation
- Hover effects → instant state change, no transition
- Custom cursor → disabled, use system cursor
- Page transitions → instant swap, no animation
- Loading states → simple spinner, no elaborate animation

The site must be FULLY FUNCTIONAL and BEAUTIFUL without any animation.
Animation is enhancement, never requirement.
```

---

## IMPLEMENTATION ORDER

This overhaul is large. Break it into phases:

### Phase 1: Foundation (8-12 hours)
```
1. Install and configure fonts (Satoshi + General Sans + JetBrains Mono)
2. Update CSS variables (colors, typography, spacing)
3. Build custom cursor component
4. Update navigation (scroll transform, backdrop blur)
5. Update footer design
6. Create shared animation utilities:
   - useScrollReveal hook (Framer Motion)
   - GlassCard component
   - GradientBorder component
   - CountUp component (improved)
7. Update globals.css with new grain texture, gradient mesh
8. Ensure ALL existing pages still render correctly
```

### Phase 2: Homepage Hero (10-15 hours)
```
1. Rebuild ParticleNetwork with proper architecture:
   - Preallocated buffers
   - Adaptive quality system
   - Mouse/gyroscope interaction
   - Self-organizing behavior
   - CSS fallback
   - Error boundary
2. Hero content layer (headline animation, CTA cluster)
3. Scroll-driven transition from hero to proof bar
4. Proof bar (stats with CountUp)
5. Test on: Chrome, Firefox, Safari, mobile Chrome, mobile Safari
```

### Phase 3: Homepage Sections (10-15 hours)
```
1. Services orbital cards
2. Products horizontal scroll
3. Technology interactive stack
4. Case studies parallax cards
5. CTA section with resolved particle field
6. Scroll-driven transitions between all sections
7. Mobile responsive for all sections
```

### Phase 4: Subpages (8-12 hours)
```
1. Services page: expandable cards + process timeline
2. Products page: gallery layout
3. Technology page: interactive MIDAS diagram
4. Case studies: scroll-driven template
5. About: personal, visual layout
6. Contact: invitation-style form
7. Blog: editorial redesign
```

### Phase 5: Polish & Performance (4-6 hours)
```
1. Page transitions
2. Loading states
3. Performance audit (Lighthouse)
4. Accessibility audit (axe-core)
5. Cross-browser testing
6. Reduced motion testing
7. Mobile device testing
8. Bundle size optimization
```

---

## REFERENCE IMPLEMENTATION NOTES

### Three.js Particle System (recommended approach)

```tsx
// Use Points geometry for maximum performance
// This is the HIGH-LEVEL architecture. Implement the details.

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 200, connectionDistance = 50 }) {
  const points = useRef();
  const { size, mouse } = useThree();
  
  // Pre-allocate ALL buffers ONCE
  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 800;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 600;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 400;
      vel[i * 3] = (Math.random() - 0.5) * 0.3;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return [pos, vel, col];
  }, [count]);
  
  // Connection lines — pre-allocate max possible
  const maxConnections = 500; // Cap, not O(n²)
  const linePositions = useMemo(
    () => new Float32Array(maxConnections * 6), [maxConnections]
  );
  
  useFrame((state, delta) => {
    // Mutate arrays IN PLACE — zero allocations per frame
    // Update positions based on velocities
    // Apply mouse repulsion force
    // Calculate connections (spatial hash, not brute force)
    // Flag needsUpdate = true on attributes
  });
  
  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2}
          color="#2962FF"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      {/* Connection lines as LineSegments */}
    </>
  );
}
```

### Scroll-Driven Section Reveal (recommended pattern)

```tsx
// Reusable hook for all section reveals
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Glassmorphism Card (recommended component)

```tsx
function GlassCard({ children, className = '', hover = true }) {
  return (
    <div
      className={`
        relative rounded-2xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.06]
        ${hover ? 'hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-2xl' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

---

## WHAT "DONE" LOOKS LIKE

When this overhaul is complete, the MDS website should:

1. **Stop people mid-scroll.** The hero alone should make someone pause and
   think "I've never seen an agency site like this."

2. **Feel like a product, not a brochure.** Every interaction should feel
   engineered, not designed. Precise. Intentional. Responsive.

3. **Demonstrate capability through craft.** The site IS the proof that MDS
   can build premium digital experiences. No testimonial needed — the
   experience speaks.

4. **Convert technical AND non-technical buyers.** The visual experience hooks
   everyone. The depth of content (technology page, case studies) closes
   technical buyers. The clarity of services + pricing closes business buyers.

5. **Perform.** 85+ Lighthouse score. No jank. Instant navigation. Works on
   a 3-year-old Android phone on 4G.

6. **Be Awwwards-worthy.** Not as a vanity metric — as proof that the craft
   level matches the premium positioning ($50K-$200K custom AI systems).

---

## FINAL NOTE TO CLAUDE CODE

This is not a "make it prettier" request. This is a complete elevation of a
functional website into a world-class digital experience. Take your time with
each phase. Get the foundation right before adding complexity. Test constantly.
Every pixel matters.

Read the frontend-design SKILL.md before starting. Study the benchmark sites
(Linear, Stripe, Vercel) before writing any code. Understand the typography,
the spacing, the motion timing. Then build something that belongs in their
company.

The MDS website should make people feel something. That's the bar.
```
