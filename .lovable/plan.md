# Slide 15 — YouTube Ads case study layout fix

## Problem
On desktop, the right column (3 case study cards) currently stretches to the full slide height, while the left column has a title/subtitle block plus two explainer panels ("What" and "How"). The case studies end up taller than the explainer panels, which makes the cards feel oversized and the internal spacing (thumbnail vs. metrics) awkward.

## Goal
- The 3 case study cards on the right should collectively match the height of just the two explainer panels on the left (excluding the title/subtitle block).
- Each case study card distributes its internal space cleanly: thumbnail + artist row on top, metrics grid filling the rest with consistent padding.
- Mobile layout stays as-is (vertical stack, no fixed heights).

## Approach (desktop only)

In `src/components/deck/slides/YouTubeAdsSlide.tsx`:

1. Wrap the left column's two explainer GlassPanels in a flex sub-container that grows (`flex-1`) and split equally (`flex-1` each). Keep the title/subtitle block as a non-growing header.
2. Make the right column align to that same growing region only:
   - Remove `md:h-full` from the right column.
   - Use a flex layout where the right column matches the height of the left's explainer region. Easiest: make the outer row `items-stretch` (already is), then on the left column, wrap title/subtitle + explainer-stack so the explainer-stack has the same `flex-1` behavior; on the right column, use `flex-1` distributed across the 3 cards.
   - Add a spacer at the top of the right column with the same height as the left's title/subtitle block — or restructure so the right column starts aligned to the explainer stack. Cleanest: nest both columns' content with a header row + body row, where the body row aligns horizontally and contains the explainers (left) and the 3 cards (right).
3. Tighten case-card internals:
   - Card padding `md:p-3`.
   - Header row uses `items-center`, slightly smaller thumbnail (`md:w-[110px] md:h-[64px]`).
   - Metrics grid uses `gap-1.5`, `py-1.5`, consistent vertical centering, with `mt-auto` so metrics anchor to the bottom.
   - Equal `gap-3` between the 3 cards.

## Technical detail

Restructure the desktop layout to a header + body grid:

```text
[ Title + Subtitle (left) ] [ (empty / hidden on desktop) ]
[ What panel | How panel  ] [ Case 1 / Case 2 / Case 3   ]
        flex-1 stack              flex-1 stack, equal
```

Implementation: change the outer `flex flex-row` into a left column that contains:
- header div (title/subtitle, no flex-grow)
- body div `flex-1 flex flex-row gap-10` containing the two explainer panels (as `flex-1` each in a column) AND the right-side case studies column (`flex-1` with 3 equal `flex-1` cards).

That guarantees the 3 cards span exactly the explainer region height.

## Files
- `src/components/deck/slides/YouTubeAdsSlide.tsx` (only)

## Out of scope
- Mobile layout, copy, translations, other slides.
