# Image Optimization Strategy

## Current State

All images in `/public/` are already small:
- `logo-small.png` — 10 KB (navbar/footer, 32x32)
- `logo.png` — 41 KB (OG/structured data)
- `og-image.png` — 45 KB (default OpenGraph)
- `founder.jpg` — 64 KB (founder section, not yet wired)
- **Total: ~161 KB**

## Guidelines

### Use `next/image` for all raster images
- Automatic WebP/AVIF conversion at build time
- Responsive `srcSet` generation
- Lazy loading by default
- Already used in: Navbar, Footer, 404 page

### Required props
```tsx
<Image
  src="/photo.jpg"
  alt="Descriptive alt text"
  width={600}
  height={400}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### When adding new images
1. **Format:** Use `.jpg` for photos, `.png` for logos/icons with transparency
2. **Size:** Source images should be max 2x display size (e.g., 1200px wide for a 600px display slot)
3. **Compression:** Run through [Squoosh](https://squoosh.app/) before committing — target <100 KB per image
4. **Alt text:** Always provide meaningful alt text; use `alt=""` only for purely decorative images
5. **Priority:** Add `priority` prop to above-fold images (hero, logo) to preload them

### Dynamic OG Images
- Generated at runtime via `/api/og` (edge function)
- No static image needed per page
- Accepts `?title=` and `?subtitle=` query params

### SVGs
- Use inline SVG or React components for icons (lucide-react)
- Keep SVGs under 5 KB; optimize with [SVGO](https://jakearchibald.github.io/svgomg/)

### Future Considerations
- When adding case study or product screenshots, use `next/image` with `sizes` prop
- Consider a CDN (Vercel Image Optimization is already active)
- For hero background images, use CSS `background-image` with media queries for art direction
