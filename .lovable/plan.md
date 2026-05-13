# Slide 15 — match left and right column heights

## Goal
Make the right column's 3 case-study cards collectively match the height of the left column's two explainer panels (What/How), so both sides look balanced.

## Changes (desktop only — `src/components/deck/slides/YouTubeAdsSlide.tsx`)

### Body row layout
- Restore `md:items-stretch` (currently `md:items-center`) so columns share equal height.

### Left column — explainer panels
- Restore `flex-1` on both GlassPanels so they stretch to fill the column equally.
- Keep current padding (`md:p-4`), text sizes, and spacing.

### Right column — case study cards
- Restore `md:flex-1 md:min-h-0` on each card so the 3 cards divide column height evenly and match the left side.
- Keep thumbnail at `md:w-[120px] md:h-[70px]`.
- Keep card padding `md:p-3`.
- Keep `md:mt-auto` on metrics grid so they anchor at the bottom of each (now-stretched) card.

### Header
- No changes.

## Out of scope
- Mobile layout, copy, translations, other slides, image assets.

## File
- `src/components/deck/slides/YouTubeAdsSlide.tsx`
