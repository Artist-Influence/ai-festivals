# Slide 15 — shrink case-study cards and left panels for better proportions

## Goal
Fix the remaining awkwardness on slide 15 by making both columns feel compact and evenly balanced, not oversized.

## Changes (desktop only — `src/components/deck/slides/YouTubeAdsSlide.tsx`)

### Body row layout
- Change `md:items-stretch` → `md:items-center` so both columns center vertically rather than forcing equal height.

### Left column — explainer panels ("What" / "How")
- Remove `flex-1` from both GlassPanels so they shrink to content instead of stretching.
- Reduce padding: `md:p-5` → `md:p-4`.
- Reduce heading margin: `md:mb-3` → `md:mb-2`.
- Keep text at `md:text-base`.

### Right column — case study cards
- Remove `md:flex-1 md:min-h-0` from each GlassPanel so cards size to content instead of stretching to fill the column.
- Reduce thumbnail: `md:w-[170px] md:h-[100px]` → `md:w-[120px] md:h-[70px]`.
- Reduce card padding: `md:p-4` → `md:p-3`.
- Keep `md:mt-auto` on the metrics grid so it still anchors at the bottom of each content-sized card.
- Gap between cards: keep `md:gap-4`.

### Header (title block)
- No changes.

## Out of scope
- Mobile layout, copy, translations, other slides, image assets.

## File
- `src/components/deck/slides/YouTubeAdsSlide.tsx`
