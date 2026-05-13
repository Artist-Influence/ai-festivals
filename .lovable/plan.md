# Slide 15 — match SoundCloud explainer text size

## Goal
1. Bring the YouTube slide's "What It Is" / "How It Works" panels up to the same typography scale as the SoundCloud Reposts slide.
2. Investigate the reported preview/thumbnail mismatch where explainer text appears centered in sidebar/grid previews but starts top-left on the live slide.

## Part 1 — Typography (`src/components/deck/slides/YouTubeAdsSlide.tsx`)

Match SoundCloud (which uses `md:p-8`, `text-2xl` headings, `text-2xl` bullets, `space-y-2.5`, `mb-3`):

### Both explainer panels (What It Is + How It Works)
- Padding: `md:p-4` → `md:p-8`.
- Section heading (`whatTitle` / `howTitle`): `md:text-lg` → `md:text-2xl`. Margin `md:mb-2` → `md:mb-3`.
- Bullet container spacing: `md:space-y-1.5` → `md:space-y-2.5`.
- Bullet dot offset: `md:mt-2` → `md:mt-3` (to match larger text baseline).
- Bullet body text: `md:text-base` → `md:text-2xl`.

### How It Works timeframe footer
- Divider wrapper: `pt-2 ... mt-2` → `md:pt-3 md:mt-3`.
- Timeframe text: `md:text-sm` → `md:text-2xl`.

Right column (case study cards) is left untouched — only the left column scales up.

Note: with the previously approved change (panels at top, no `md:flex-1`), they will naturally grow taller to fit the larger type. No height-equalization changes needed.

## Part 2 — Preview/thumbnail mismatch investigation

Before changing any code, capture screenshots to confirm what differs between the sidebar preview and the live slide:

1. Run dev preview, open SoundCloud Reposts slide.
2. Screenshot the sidebar thumbnail and the main canvas at the same time.
3. Compare alignment of explainer text (vertical position inside the GlassPanels and within the slide).

Possible causes to check (no fix written yet — confirm root cause first):
- `ScaledSlide` renders the slide at fixed 1920×1080 then transforms — content should look identical, just smaller. If it doesn't, the slide likely has a layout that depends on real viewport width via Tailwind `md:` breakpoints (which fire on window width, not container width). Since the window is desktop, `md:` classes apply equally in both — so this normally isn't the cause.
- Slides whose root uses `md:justify-center` plus a content block shorter than 1080px will render visually centered. The thumbnail shows that same centering; the user may be reading "vertically centered in the slide frame" as a preview-only artifact even though it's also true on the live slide. If so, the fix is to align the live slide to the top (`md:justify-start` + appropriate top padding) — not to change the preview.
- Some slides intentionally center while others top-align; mismatch is between slides, not between preview and slide.

Deliverable from this investigation: a short list of which slides actually differ between preview and live, plus a concrete fix proposal per slide. No edits will be made until I confirm the cause with screenshots and report back.

## Out of scope
- Mobile layout, copy, translations, image assets.
- Right column case-study cards on slide 15.
- Bulk restructuring of all slides before the preview-mismatch root cause is confirmed.

## Files
- `src/components/deck/slides/YouTubeAdsSlide.tsx` (Part 1)
- Investigation only for Part 2 — no files edited until confirmed.
