# Fix daily pacing panel height

The right column (Daily Pacing chart) currently sizes to its bars (~180px) while the left column (3 benchmark cards stacked) is much taller, leaving a big empty gap below the chart.

## Change

In `src/components/deck/slides/MashBitPhase2Slide.tsx`, in the benchmarks + daily chart grid row:

1. Make both columns stretch to equal height: add `items-stretch` to the grid (default) and wrap each column in `flex flex-col h-full` so the inner content fills.
2. Make the right column's `GlassPanel` fill the column with `flex-1 flex flex-col`.
3. Replace the fixed `h-[180px]` bar container with `flex-1` so the bars grow to fill whatever height the left column dictates.
4. Same treatment on the left: wrap the 3 benchmark cards in a container that distributes them with `flex-1` each (or keep `grid gap-3` — already balanced). Just need the wrapper to be `h-full`.

No other slides, copy, or i18n changes.

## Result

Desktop: chart panel matches the exact height of the stacked benchmark cards, bars use the full vertical space. Mobile: unchanged (single column stack).
