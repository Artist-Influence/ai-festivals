# Slide 15 — align left panels top with first case study

## Goal
Position the left-column explainer panels (What It Is / How It Works) so their tops align with the top of the first case-study card (Svdden Death), rather than being vertically centered across the full height of all three case-study cards.

## Changes (desktop only — `src/components/deck/slides/YouTubeAdsSlide.tsx`)

### Body row layout
- Change `md:items-stretch` → `md:items-start` so columns align to the top edge instead of stretching to equal height.

### Left column — explainer panels
- Remove `md:flex-1 md:min-h-0` from both GlassPanels so they shrink to content height and sit at the top of the column.
- Keep current padding, text sizes, and spacing.

### Right column — case study cards
- No changes. Cards keep `md:flex-1 md:min-h-0` so they continue to fill the right column evenly.

## Out of scope
- Mobile layout, copy, translations, other slides, image assets.

## File
- `src/components/deck/slides/YouTubeAdsSlide.tsx`
