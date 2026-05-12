# Slide 9 — Ticket Funnel layout swap

Restructure `TicketFunnelSlide.tsx` so the stage description bubbles live on the left and the right side becomes a proper funnel visualizer.

## Changes

**Left column (was right):**
- Move the 5 stage description GlassPanels here, unchanged in copy.

**Right column (was left, now removed and rebuilt):**
- Remove the current horizontal stacked bars.
- Add a true funnel SVG visualizer:
  - Trapezoid shape narrowing top → bottom (Awareness wide at top, Flywheel narrow at bottom).
  - 5 stacked bands with subtle red gradient fills (`from-primary/[0.05]` → `to-primary/[0.25]`) and thin `border-primary/30` separators.
  - Each band labeled inside with `01 · AWARENESS` style mono text (matches existing tracking/uppercase treatment).
  - Side tick marks / connector lines on the right edge to give it a "data viz" feel consistent with `OutcomesVisualizer` and `HubDiagram`.
  - Fully responsive: hidden or simplified on mobile (`hidden md:flex`), with the bubbles taking full width on mobile.

**Untouched:**
- Headline, subtitle, eyebrow, footer GlassPanel.
- Background (`PatternVisual`), copy, i18n keys.
- Other slides.

## Files
- `src/components/deck/slides/TicketFunnelSlide.tsx` — only file edited.
