## Goal

Make the deck feel native on phones: vertical swipe between slides with snap, vertical scroll inside dense slides, and a formatting pass on every slide so nothing feels cramped or shrunken at 390px.

## 1. Mobile navigation rewrite (`DeckViewer.tsx` → `MobilePager`)

Replace the current horizontal Embla pager with a vertical scroll-snap feed.

- Container: `h-dvh overflow-y-auto snap-y snap-mandatory overscroll-y-contain` with `scroll-behavior: smooth` and `-webkit-overflow-scrolling: touch`.
- Each slide: `snap-start snap-always min-h-dvh w-full overflow-y-auto overscroll-contain` — slide snaps into view, then if its content is taller than the viewport the user keeps scrolling inside it; once they hit the bottom, the next slide snaps in.
- Detect current slide with `IntersectionObserver` (threshold 0.6) instead of Embla's `select` event, update `current` + URL/title.
- Restore scroll-to-slide on mount (jump to `current` without animation).
- Keep the auto-hiding `n / total` counter (top-left) and `LanguagePicker` (top-right) with safe-area insets.
- Add a subtle "swipe up" chevron hint on first slide only, fades after first scroll.
- Edge-tap navigation removed (vertical swipe replaces it).
- Keyboard: ↑/↓ scrolls to prev/next slide on desktop test, no behavior change for desktop layout.

Update memory note that previously said "no snap on mobile" — new rule is snap between slides with internal scroll allowed.

## 2. Per-slide mobile formatting pass

Audit every slide for 390px width. Rules applied consistently:

- **Type scale**: bump small mobile body from `text-xs` → `text-sm`, captions from `text-[7-8px]` → `text-[10-11px]`. Titles already `text-2xl md:text-6xl` style — keep, but ensure subtitles aren't smaller than `text-base`.
- **Padding**: slides standardize on `px-5 py-8 md:p-12` (currently varies `p-3` to `p-20`).
- **Grids**: any `grid-cols-2/3/5` on mobile that produces unreadable cards collapses to `grid-cols-1` or `grid-cols-2` with bigger cells. Specifically:
  - `MashBitPhase2Slide`: 5-col stat rows → 2-col on mobile; benchmark cards stack; daily pacing chart gets `h-[200px]` on mobile with larger date labels.
  - `ZedsDeadPhase2Slide`: same treatment.
  - `PricingSlide`: tier cards stack with full width.
  - `TheProblemSlide`, `OurSolutionSlide`, `WhatWeDoSlide`: 2-col card grids → single column with more breathing room.
  - `AdditionalServicesSlide`: case study thumbnails stack 1-col on mobile.
- **Charts/data viz** (`HubDiagram`, `NetworkVisual`, `SystemLoopDiagram`, daily pacing bars): set explicit mobile aspect ratio so they don't get squished; bump label font sizes.
- **Cover slide**: tighten hero to fit one viewport without scroll.
- **Email gate**: full-width inputs, larger tap targets (min-h-12), no horizontal overflow.
- **Sticky chrome reserve**: each slide gets `pt-16` on mobile so the counter/language picker doesn't overlap titles.
- **Footer source notes**: bump from `text-[10px]` to `text-xs` for legibility.

## 3. Chrome polish

- `LanguagePicker`: ensure menu opens within viewport on mobile (right-aligned, max-h with scroll).
- Counter pill: slightly larger touch-friendly size on mobile.
- Add a thin top-of-slide progress bar (1px, primary color) showing scroll position through the deck.

## 4. Memory updates

After build, update `mem://architecture/mobile-responsiveness` and core index to reflect: "Mobile uses vertical scroll-snap between slides; long slides scroll internally before next slide snaps in."

## Technical notes

- No changes to desktop `ScaledSlide` 1920×1080 scaling path.
- `ScaledSlide` mobile branch stays `min-h-full` (each slide can grow taller than viewport).
- IntersectionObserver beats scroll-event math for reliable snap detection.
- `overscroll-contain` on both pager and inner slide prevents rubber-band chaining issues on iOS.
- No new dependencies; Embla removed from mobile path (still used elsewhere? — check; currently only mobile pager uses it, can drop the import on mobile branch).

## Out of scope

- Desktop layout, sidebar, export PDF.
- Copy/i18n changes.
- New slides or reordering.