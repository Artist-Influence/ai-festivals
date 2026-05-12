# Three small polish edits

## 1. Slide 9 — bigger, properly centered visualizer

In `src/components/deck/slides/TicketFunnelSlide.tsx`:
- Widen the right column from `md:w-[300px]` to `md:w-[380px]` so the visualizer has more room and the empty space between the left text stack and the slide edge balances out.
- Keep `items-center justify-center` so the SVG sits centered both vertically and horizontally inside that column.
- Bump halo size from `w-[260px] h-[260px]` to `w-[340px] h-[340px]` to scale with the larger visualizer.

In `src/components/deck/FunnelSignalVisualizer.tsx`:
- Raise the outer cap so it can actually fill the left-stack height: `max-w-[240px] max-h-[520px]` → `max-w-[340px] max-h-[680px]`. The viewBox stays `220×520` so internal proportions are unchanged — it just renders larger.

Net effect: the visualizer grows ~40% and the right column is centered between the left text stack and the slide's right edge.

## 2. Clipping case study thumbnails (slide 10's case-study companion)

User attached three thumbs. Copy them into `src/assets/` with the names:
- `user-uploads://skrillex_-_FUS.jpg` → `src/assets/case-clipping-skrillex.jpg`
- `user-uploads://doordash_x_50_cent.jpg` → `src/assets/case-clipping-doordash.jpg`
- `user-uploads://super_mario_galaxy.jpg` → `src/assets/case-clipping-mario.jpg`

In `src/components/deck/slides/CaseStudyClippingSlide.tsx`, replace the placeholder imports:
```ts
import skrillexCover from '@/assets/case-clipping-skrillex.jpg';
import doordashCover from '@/assets/case-clipping-doordash.jpg';
import marioCover from '@/assets/case-clipping-mario.jpg';
```
The three `cases[].coverArt` references already point at these variables, so no further wiring needed. Remove the `// TODO: swap to final cover art` comment.

## 3. Slide 15 — shrink YouTube case cards to match left column height

In `src/components/deck/slides/YouTubeAdsSlide.tsx`, the right column already uses `flex-1 + min-h-0` but the internal content forces overflow. Tighten further:

- Card padding: `md:p-3` → `md:p-2.5`
- Inter-card gap stays `md:gap-2`
- Thumbnail: `md:w-[140px] md:h-[84px]` → `md:w-[120px] md:h-[72px]`
- Header bottom margin: `md:mb-2` → `md:mb-1.5`
- Artist name: `md:text-xl` → `md:text-lg`
- Track line: `md:text-sm` → `md:text-xs`
- "Case study" eyebrow: `md:text-xs` → `md:text-[10px]`, `mb-0.5` stays
- KPI tile padding: `md:py-1.5 md:px-1.5` → `md:py-1 md:px-1`
- KPI tile value: `md:text-base` → `md:text-sm`
- KPI tile label: `md:text-[10px]` → `md:text-[9px]`
- KPI grid gap: `md:gap-1.5` → `md:gap-1`

No copy or metric changes. Mobile sizes untouched.

## Files touched
- `src/components/deck/slides/TicketFunnelSlide.tsx`
- `src/components/deck/FunnelSignalVisualizer.tsx`
- `src/components/deck/slides/CaseStudyClippingSlide.tsx`
- `src/assets/case-clipping-{skrillex,doordash,mario}.jpg` (new)
- `src/components/deck/slides/YouTubeAdsSlide.tsx`
