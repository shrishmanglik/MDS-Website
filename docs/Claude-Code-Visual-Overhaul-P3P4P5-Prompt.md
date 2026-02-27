# CLAUDE CODE PROMPT — MDS Visual Overhaul Phase 3, 4, 5

## Paste this into Claude Code AFTER Phases 1+2 are merged and reviewed.

```
Read the frontend-design SKILL.md. Then read the complete PRD at:
F:\Million Dollar AI Studio\MDS Website\MDS-WEBSITE-VISUAL-OVERHAUL-PRD.md

Source: F:\Million Dollar AI Studio\MDS Website\
Branch: Create `feature/visual-overhaul-p3` from latest main.

You are continuing the MDS Website Visual Overhaul. Phases 1 (foundation) and
2 (hero) are complete. The typography, colors, cursor, navigation, and hero
section are already live. Now build the remaining homepage sections and subpages.

---

## PHASE 3: REMAINING HOMEPAGE SECTIONS

Build each section, test, commit. Do NOT skip any section.

### Section: Services — "What We Build"
- Three orbital cards in a slight arc layout
- Each card represents a revenue pillar (AI Services, AI Products, Custom AI)
- Cards have unique gradient tints (blue, purple, gold)
- Glass card treatment (use GlassCard component from Phase 1)
- Hover: card lifts, glow intensifies, reveals mini-preview of deliverables
- Click: smooth expand into full-width detail panel
- Scroll entrance: staggered reveal from below
- Connection lines briefly flash between cards on entrance (particle network echo)
- Mobile: stack vertically, tap to expand

### Section: Products — Horizontal Scroll Showcase
- Sticky horizontal scroll section within vertical scroll
- Use Framer Motion useScroll + useTransform for the horizontal movement
- 5 product cards (AstroAI, ChemAI, Thread Intelligence, FinSight, ATLAS)
- Each card has:
  - Unique generative background pattern (CSS-based, matching product domain):
    * AstroAI: constellation dots on indigo
    * ChemAI: hexagonal molecular grid on teal
    * Thread Intelligence: diagonal weave lines on amber
    * FinSight: data grid dots on steel blue
    * ATLAS: topographic contour lines on forest green
  - Product name, one-line differentiator, 3 feature pills
  - Pricing signal and status badge
  - CTA button (waitlist or learn more)
- Card hover: scale 1.02, background pattern subtly animates
- Section header: "Products We're Building"
- Mobile: standard horizontal scroll (snap points), no sticky behavior

### Section: Technology — Interactive Intelligence Stack
- The three-layer stack diagram from the PRD:
  Layer 1 (bottom): Deterministic Compute (75%, blue)
  Layer 2 (middle): Rule Engine (20%, purple)
  Layer 3 (top): AI Interpretation (5%, gold)
- Scroll-driven activation: each layer fills left-to-right as user scrolls
- Percentage counter animates alongside each layer
- Cost annotation appears beside each layer
- Summary text fades in after all layers activate:
  "95% deterministic. 5% AI. 100% yours."
- Below: 3x2 bento grid of MIDAS framework capabilities
  (Dev Studio, Design Studio, Research Studio, Content Engine, Quality Gates, Cost Optimizer)
- Each bento card: animated icon + one sentence + subtle gradient
- Link to full Technology page
- Blueprint grid background at 3% opacity

### Section: Case Studies — Cinematic Cards
- 2-3 featured case studies in large format cards
- Each card: abstract visual, challenge title, 3 result metrics, link
- Parallax tilt on mouse move (subtle 3D perspective transform):
  ```tsx
  const handleMouseMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  ```
- On hover: shadow deepens, subtle glow on metric numbers
- Mobile: no tilt effect, standard card layout

### Section: Final CTA — "The Close"
- Large headline: "Ready to build intelligence into your business?"
- Two CTA buttons + email fallback
- Background: callback to the particle field from the hero, but now the
  particles are fully organized into a crystalline network structure
  (showing the completed transformation metaphor)
- This can be a simplified version of the hero canvas (reuse component
  with different initial state) or a CSS-only version with positioned dots
- Keep it lightweight — this section should load instantly

VERIFICATION after Phase 3:
- Full homepage scroll is a seamless cinematic experience
- Each section transitions naturally into the next
- Horizontal scroll on products works correctly
- Technology stack activates properly on scroll
- All sections have scroll-triggered entrances
- Mobile layout works for every section
- Reduced motion: all content visible, no animation
- npm run build succeeds

Commit: "Phase 3: Homepage sections — services, products, technology, case studies, CTA"

---

## PHASE 4: SUBPAGES

For each subpage, maintain consistency with the homepage design language
but don't overdo the 3D/animation. Subpages should be content-first with
tasteful motion accents. The hero experience is exclusive to the homepage.

### Services Page (/services)
- Hero: Minimal. Headline + subhead. Subtle particle-style background
  (very few particles, slow movement, or CSS-only gradient)
- Replace current accordion with expandable card panels
- Each service card:
  - Custom animated icon
  - Service name + price range
  - Key deliverables (3-5 items)
  - Timeline estimate
  - CTA: "Start This Project"
  - Click to expand: reveals full detail panel
- Process timeline below services:
  Discovery → Architecture → Build → Test → Deploy
  - Horizontal timeline with nodes
  - Scroll-triggered: each node activates sequentially
  - Short description under each activated node
- Comparison table at bottom for enterprise buyers

### Products Page (/products)
- Hero: "Products We're Building" + subhead
- Full gallery of product cards (same design as homepage section,
  but larger and with more detail)
- Each product gets a full card with:
  - Large generative background visual
  - Extended description (2-3 sentences)
  - Feature list (5-6 items)
  - Tech stack badges
  - Pricing details
  - CTA + status
- Layout: 2-column grid on desktop, single column mobile

### Technology Page (/technology)
- Hero: "Built Different" + animated abstract tech visual
- Deterministic-First section: expanded version of the interactive stack
  from homepage, with more detail and annotations
- MIDAS Framework section:
  - Interactive node diagram showing all studios
  - Each studio is a clickable node
  - Click: reveals capability list, tools used, how it connects to other studios
  - Lines between related studios show data flow
  - Use CSS/SVG for the diagram (performant, accessible)
- Cost comparison: animated bar chart
  "Traditional AI approach: $X/interaction"
  "MDS deterministic-first: $Y/interaction"
  Bars animate on scroll-into-view
- Open source / transparency section
- CTA to case studies

### Case Studies Index (/case-studies)
- Featured case study at top (large card)
- Grid of remaining case studies below
- Each card: title, category tag, one-line result, abstract visual
- Filter by category (if multiple categories exist)

### Individual Case Study Pages (/case-studies/[slug])
- Scroll-driven narrative layout:
  1. Hero: Challenge statement in large typography
  2. Problem section: describe the problem
  3. Approach: how MDS tackled it (mini-process diagram)
  4. Solution: architecture/technical details
  5. Results: animated metric counters (prominent, gold-colored)
  6. Key insight pull quote
  7. Related case studies (2 cards)
  8. CTA section

### About Page (/about)
- Hero: Shrish's story (personal, warm)
- Break text into scannable sections with visual anchors:
  - Pull quotes in --accent-gold
  - Timeline of MDS journey (creative layout, not just a list)
  - Values section with custom icons
- Photo placeholder: add a div with instructions like
  "Replace with founder photo — add image to public/images/shrish.jpg"
- Team section: creative treatment of Shrish + AI tools
  (show Claude, MIDAS, etc. as "team members" with fun descriptions)

### Contact Page (/contact or /build)
- Two-column layout:
  Left: 3 key differentiators with icons (why work with MDS)
  Right: The contact form (clean, well-spaced, improved from Sprint 1)
- Below: Alternative contact methods (email, Calendly, LinkedIn)
- Subtle particle background (very minimal, CSS-only preferred)
- Form success: celebration animation (confetti particle burst)
  - Use a lightweight confetti library or CSS animation
  - Brief (2 seconds), then show success message

### Blog Index (/blog)
- Featured post at top (large card with image/abstract visual)
- Grid of post cards below
- Each card: title, excerpt, date, reading time, category tag
- Hover: card lifts, excerpt fades in more
- Consider: add category filter tabs at top

### Blog Posts (/blog/[slug])
- Max width: 65ch for body content
- Line height: 1.75
- Typography: --font-body for body, --font-display for headings
- Pull quotes: styled with --accent-gold border-left
- Code blocks: --font-mono with proper syntax highlighting
- Related posts at bottom (2-3 cards)
- Share buttons (copy link, Twitter, LinkedIn)
- Scroll offset for sticky header (already fixed in Sprint 1)

VERIFICATION after Phase 4:
- Every page matches the new design language
- Navigation between pages feels smooth
- Each page has appropriate level of animation (hero = max, subpages = tasteful)
- Forms work correctly
- Mobile responsive on all pages
- All pages pass accessibility checks

Commit per page: "Phase 4: [PageName] redesign"

---

## PHASE 5: POLISH & PERFORMANCE

### Page Transitions
- Content fades out (200ms) on navigation
- New content fades in (300ms)
- Use Next.js App Router layout for shared elements (nav, footer)
- If view-transitions API is supported by browser, use it for
  shared element morphing

### Loading States
- MDS logo pulse animation during page transitions
- Skeleton screens for dynamic content (if any)
- Image loading: blur-up technique or fade-in

### Performance Audit
Run Lighthouse and fix any issues:
- Target: > 85 desktop, > 70 mobile
- Focus on: LCP, CLS, INP
- Remove any unused CSS/JS
- Verify image optimization
- Check bundle sizes per route

### Accessibility Audit
- Run axe-core on every page
- Verify keyboard navigation (tab through entire site)
- Verify screen reader experience (VoiceOver on Mac)
- Check color contrast on all text
- Verify custom cursor has fallback
- Verify reduced motion experience

### Cross-Browser Testing
Verify on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Chrome Android
- Safari iOS
- With WebGL disabled
- With JavaScript disabled (basic content should be readable)

### Final Bundle Optimization
- Analyze with @next/bundle-analyzer
- Code-split any heavy components
- Verify tree-shaking is working
- Check that Three.js is only loaded on pages that need it

VERIFICATION:
- Lighthouse scores meet targets
- Zero axe-core critical/serious issues
- Works on all target browsers
- Reduced motion experience is complete and beautiful
- Site loads in < 3 seconds on 4G

Final commit: "Phase 5: Polish — transitions, performance, accessibility"
Push branch, create PR, merge to main.

---

## DONE CRITERIA

The visual overhaul is COMPLETE when:
1. Homepage hero makes people stop and stare
2. Every page feels cohesive with the new design language
3. Lighthouse Performance > 85 desktop / 70 mobile
4. Zero critical accessibility issues
5. Reduced motion provides a complete, beautiful experience
6. Mobile experience is excellent (not just "doesn't break")
7. The site feels like it belongs alongside Linear, Stripe, Vercel
8. Shrish approves
```
