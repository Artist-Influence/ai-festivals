## Mobile cover slide fix

Two issues on the mobile hero (CoverSlide):

1. **Bottom UI is broken** — the "Confidential / Artist Influence · Music Marketing Infrastructure" tracked label wraps to two lines and the centered "Swipe up ⌄" hint overlaps it. They're fighting for the same bottom region.
2. **Background is empty** — `NetworkVisual` and the orbits/comets/equalizer/conic-spin layers in `CoverVisual` are all gated behind `hidden md:block`, so mobile gets only the two aurora blobs plus the center vignette, which reads as a flat black slide.

### Changes

**`src/components/deck/slides/CoverSlide.tsx`**
- Remove the `hidden md:block` wrapper around `NetworkVisual` so the network shows on mobile too (lower opacity, fewer nodes — e.g. `nodeCount={40} opacity-20`).
- Shrink confidential footer on mobile (`text-[9px]`, tighter tracking `tracking-[0.2em]`) and keep it on a single line; lift it above the safe-area inset.
- Add bottom padding to the hero content stack so logo/tagline/subtitle don't crowd the footer area.

**`src/components/deck/visuals/CoverVisual.tsx`**
- Drop `hidden md:block` on the equalizer ring, conic shimmer beam, and the orbits/comets/particles SVG so they render on mobile. Keep the radial mask, but tune the mobile sizing so the ring fits inside the viewport (scale via a smaller `RING_RADIUS` or wrap the ring in a `scale-50 md:scale-100` container; same for the orbits SVG which uses a 1920×1080 viewBox — `preserveAspectRatio="xMidYMid slice"` already covers fit, just unhide it).
- Aurora blobs already render — leave as is.

**`src/components/deck/DeckViewer.tsx`** (MobilePager)
- Move the "Swipe up" hint up (e.g. `bottom-20`) or hide it on the cover slide if the confidential footer is present, so the two never overlap. Alternatively, hide the confidential footer on slide 0 while the hint is visible, then restore it after first scroll.

### Out of scope
Desktop cover layout, other slides, copy changes.