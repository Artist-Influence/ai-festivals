## Goal
Make the funnel visualizer on slide 9 (`TicketFunnelSlide`) smaller and more abstract, matching the editorial/atmospheric style of our other visualizers (e.g. `OutcomesVisualizer`, `DiscoveryVisualizer`) instead of the current literal labeled trapezoid.

## Problems with current version
- Visual is too large — it stretches to ~460px wide on the right column and dominates the slide.
- Too literal: labeled bands (`01 · AWARENESS`, etc.) duplicate the copy already in the left-column GlassPanels.
- Hard outlines + index text feel like a diagram, not the soft, abstract "signal" aesthetic of the rest of the deck.

## New direction: "Narrowing signal" funnel
Replace the labeled trapezoid with a quiet, abstract SVG that *suggests* a funnel through converging geometry and motion — no text, no thick borders.

Composition (single SVG, primary red tones only):
- Tall narrow viewBox (e.g. `200 x 520`), capped at `max-w-[260px]` and `max-h-[520px]` so it sits as an accent, not the focal point.
- Two faint converging guide lines from wide top to narrow bottom (the implied funnel walls), `stroke="hsl(var(--primary) / 0.18)"`, hairline width.
- 5 ultra-thin horizontal "tier" lines spaced down the funnel at the converging width, `opacity ~0.12` — abstract nod to the 5 stages without labeling them.
- Soft particles descending through the funnel (rAF-driven, same pattern as `OutcomesVisualizer` but flowing *down* and getting denser/brighter as they near the bottom), in primary red.
- Subtle glow ellipse at the bottom (the "conversion" point) with a gentle pulsing `<animate>` on opacity/radius.
- Optional faint vertical center guide line at very low opacity.

No text, no index numbers, no hard borders — readable as "things narrowing into a point."

## Layout changes in `TicketFunnelSlide.tsx`
- Keep left column (stage GlassPanels) as the primary content, but let it take more room: change `flex-1 / flex-1` to `flex-[2] / flex-[1]` (or `md:w-[260px]` fixed for the visual column).
- Right column becomes `hidden md:flex items-center justify-center` with the new compact visual inside.
- Remove the existing inline funnel SVG, geometry constants (`vbW`, `vbH`, `topW`, `bottomW`, `bandH`), and the `<defs>`/`<polygon>`/`<text>` block.

## Implementation
- Create `src/components/deck/FunnelSignalVisualizer.tsx` modeled on `OutcomesVisualizer.tsx` (rAF loop, lanes of particles, glow), but vertically converging downward and using `hsl(var(--primary))` tokens.
- Import and render it in the right column of `TicketFunnelSlide.tsx`.
- No copy changes, no i18n changes, no other slides touched.

## Files
- New: `src/components/deck/FunnelSignalVisualizer.tsx`
- Edit: `src/components/deck/slides/TicketFunnelSlide.tsx` (remove inline SVG + geometry, shrink right column, render new component)