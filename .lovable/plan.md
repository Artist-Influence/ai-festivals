# Slide polish — round 2

## 1. Slide 15 — YouTube Ads case study sizing

Right now the three case-study cards on the right column run taller than the combined height of the left "What it is" + "How it works" panels, causing overflow / inconsistent height.

In `src/components/deck/slides/YouTubeAdsSlide.tsx`:

- Constrain the right column to the same height as the left column. The left column = title block + 2 GlassPanels. Make the right column wrapper `md:h-full md:max-h-full` and ensure each of the 3 case GlassPanels uses `md:flex-1 md:min-h-0` with internal `overflow-hidden`.
- Shrink case-card internals so they actually fit:
  - Outer padding: `md:p-4` → `md:p-3`
  - Thumbnail: `md:w-[180px] md:h-[110px]` → `md:w-[140px] md:h-[84px]`
  - Artist name: `md:text-2xl` → `md:text-xl`
  - Track line: `md:text-base` → `md:text-sm`
  - "Case study" eyebrow: `md:text-sm` → `md:text-xs`
  - KPI tile value: `md:text-lg` → `md:text-base`
  - KPI tile label: `md:text-xs` → `md:text-[10px]`
  - KPI tile padding: `md:py-2 md:px-2` → `md:py-1.5 md:px-1.5`
  - Header bottom margin: `md:mb-3` → `md:mb-2`
- Add `md:gap-2` (was `md:gap-3`) between the 3 cards so the column total height matches the left column exactly.

No copy or metric changes — Space Laces tiles stay as-is from the previous round.

## 2. Slide 9 — New funnel visualizer in brand aesthetic

The cyan→violet→magenta EQ visualizer doesn't fit the brand. Rewrite it again, this time staying inside the Artist Influence palette (primary red `hsl(0 72% 51%)` on dark) but with a fresher, more modern motif than the original trapezoid.

Rewrite `src/components/deck/FunnelSignalVisualizer.tsx` as a **concentric "signal capture" funnel**:

- All fills/strokes use `hsl(var(--primary))` with varying opacity (0.08 → 0.9). No off-brand hues.
- Composition (top → bottom inside a ~220×520 viewBox):
  1. **Wide top — scattered signal field**: ~40 small dots of varying radii (1–2.5px) and opacities (0.15–0.6) drifting slowly inside an implied wide top band. Uses subtle rAF jitter, not a literal grid.
  2. **Concentric capture rings (mid)**: 4 stacked horizontal ellipses, each narrower than the one above (rx 95 → 30), stroke `hsl(var(--primary))` opacity 0.2 → 0.55, no fill. They subtly pulse `ry` on a 4s loop with staggered delays so it reads as energy being focused.
  3. **Vertical "signal beam"**: a thin 2px-wide vertical line down the center from top to bottom with a linear gradient mask (transparent → primary 0.7 → transparent), animated via a moving `<rect>` clip so a bright pulse travels top-to-bottom every 2.4s.
  4. **Conversion node (bottom)**: a filled circle r=6 in primary with two expanding ring pulses (`<animate>` on `r` 6→22 and `opacity` 0.6→0) staggered 1.2s apart — reads as a ticket "ping".
- Use `<defs>` for one `linearGradient` (vertical, primary 0 → primary 0.6 → primary 0) for the beam, and one `radialGradient` (primary 0.35 center → 0 edge) for a soft halo behind the conversion node.
- Animation driver: keep the existing `requestAnimationFrame` loop; particles get gentle vertical drift (downward, wrapping) plus tiny horizontal sine sway. No EQ bars.
- Keep the component's outer sizing the same: `className="w-full max-w-[240px] h-auto max-h-[520px]"` so `TicketFunnelSlide.tsx` layout doesn't shift.

In `src/components/deck/slides/TicketFunnelSlide.tsx`:

- Swap the neutral `bg-white/5` halo back to `bg-primary/10 blur-3xl` so the visualizer reads as part of the brand red accent system.

## Files touched

- `src/components/deck/slides/YouTubeAdsSlide.tsx` — case card sizing + column height clamp
- `src/components/deck/FunnelSignalVisualizer.tsx` — full rewrite in brand red, concentric capture motif
- `src/components/deck/slides/TicketFunnelSlide.tsx` — restore primary halo
