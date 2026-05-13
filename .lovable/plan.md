# Slide 15 — tighten text, enlarge case-study thumbnails

## Goal
Make slide 15 feel more evenly spaced by:
- Enlarging each case-study thumbnail so it visually anchors the card.
- Reducing text size/padding on both columns so panels stop dominating the canvas.
- Letting the body row breathe with consistent vertical rhythm.

## Changes (desktop only — `src/components/deck/slides/YouTubeAdsSlide.tsx`)

### Left column — explainer panels ("What" / "How")
- Reduce panel padding: `md:p-6` → `md:p-5`.
- Heading text: `md:text-xl` → `md:text-lg`.
- Bullet text: `md:text-lg` → `md:text-base`.
- Bullet vertical spacing: `md:space-y-2` → `md:space-y-1.5`.
- Timeframe note: `md:text-base` → `md:text-sm`.

### Right column — case study cards
- Card padding: `md:p-3` → `md:p-4`.
- Thumbnail: `md:w-[110px] md:h-[64px]` → `md:w-[170px] md:h-[100px]` (clearly larger, near-16:9).
- Header row gap: `md:gap-3` → `md:gap-4`, keep `items-center`.
- Artist name: `md:text-lg` → `md:text-base`.
- "Case study" eyebrow + track text: keep small, slight tracking.
- Metric tile padding: `md:py-1.5 md:px-1` → `md:py-2 md:px-1.5`.
- Metric value: `md:text-sm` → `md:text-[13px]` to balance with the bigger thumb.
- Gap between cards: `md:gap-3` → `md:gap-4`.

### Header (title block)
- No changes; keep current title/subtitle sizing.

## Out of scope
- Mobile layout, copy, translations, other slides, image assets.

## File
- `src/components/deck/slides/YouTubeAdsSlide.tsx`
