# Slide 9 — actually center the visualizer between text and slide edge

## Problem
The container is capped at `max-w-[1500px]` and centered in a 1920px slide, so ~210px of empty space sits to the right of the right column. The visualizer looks shoved left against the text instead of centered in the available white space.

## Fix
In `src/components/deck/slides/TicketFunnelSlide.tsx`:

1. Widen the inner container: `max-w-[1500px]` → `max-w-[1750px]` so the right column extends much closer to the slide's right edge.
2. Widen the right column: `md:w-[380px]` → `md:w-[480px]` so there's real horizontal room for the visualizer to sit centered with breathing room on both sides.
3. Bump halo: `w-[340px] h-[340px]` → `w-[400px] h-[400px]` to scale with the wider column.

In `src/components/deck/FunnelSignalVisualizer.tsx`:

4. Raise outer cap: `max-w-[340px]` → `max-w-[400px]`, `max-h-[680px]` → `max-h-[720px]` so the SVG actually fills the new column height (matching the left text-stack height).

No copy, color, or animation changes. Mobile untouched.

## Files
- `src/components/deck/slides/TicketFunnelSlide.tsx`
- `src/components/deck/FunnelSignalVisualizer.tsx`
