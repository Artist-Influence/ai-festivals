# Plan: fix overlapping copy + remove em-dashes

## 1. Fix TicketFunnelSlide mobile overlap (the screenshot)

In `src/components/deck/slides/TicketFunnelSlide.tsx`, each stage row is a horizontal flex with a fixed-width label (`w-20`) next to the description. "Retargeting" and "Conversion" are longer than 80px in mono, so they spill into the description text.

Change the row to **stack vertically on mobile**, horizontal on desktop:

- Outer wrapper: `flex flex-col md:flex-row items-start md:items-start gap-1 md:gap-6`
- Label: drop `w-20`, keep `md:w-40 md:shrink-0`, add `md:tracking-widest` (slightly looser on mobile is fine)
- Description: full width on mobile

This also gives the description room to breathe instead of wrapping in a narrow column.

## 2. Sweep other slides for similar overlap risk

Quick visual audit of slides with fixed-width label/value rows or tight 2-column mobile layouts. Specific candidates to recheck and adjust the same way (stack on mobile when label is mono/long):

- `PricingSlide` row labels
- `WhatWeNeedSlide` numbered list
- `FinalPushStrategySlide` city/budget grid (already 2 cols, OK — just verify)
- `OutcomesSlide` metric rows
- `MashBitPhase2Slide`, `ZedsDeadPhase2Slide` stat rows

If a slide already stacks cleanly, leave it alone. No copy or desktop changes.

## 3. Remove em-dashes ( — ) and double-hyphens ( -- ) from user-visible copy

Per the new preference, rewrite anywhere em-dashes appear in displayed strings, replacing with natural punctuation (period, comma, colon, parentheses, or just a line break) based on context. Examples:

- `"VOYDOME 2025 — #3 search term for artist"` → `"VOYDOME 2025, #3 search term for artist"`
- `"Verified SoundCloud network — genre-aligned, fully tracked"` → `"Verified SoundCloud network. Genre-aligned, fully tracked."`
- `"1,500+ clips, ~42% album UGC in month one — no bots"` → `"1,500+ clips, ~42% album UGC in month one. No bots."`

Files to update (visible copy only, not code comments):

- All 11 i18n files: `src/i18n/{en,es,fr,de,nl,pt,ja,ko,zh,ar,hi}.ts`
- Hardcoded JSX strings in: `TicketFunnelSlide`, `TheShiftSlide`, `WebsitesSlide`, `SpotifyPlaylistingSlide`, `CaseStudyPlatformSlide`, `SoundCloudRepostsSlide`, `FanpagesSlide`, `AdditionalServicesSlide`, `InstagramSeedingSlide`, `ExpectationsSlide`, `EmailGate`, `DeckViewer`, and visualizer components (`BrokenSystemVisualizer`, `DiscoveryVisualizer`, `ClippingVisualizer`, `FunnelSignalVisualizer`, `OutcomesVisualizer`, `ServicesVisualizer`) where the em-dash is in a rendered string.
- Skip `.lovable/` files, code comments, and decorative SVG/visual files where the dash is not user-visible text.

Translations: replace em-dashes in non-English files with the natural punctuation each language uses (period or comma). I will not invent new copy — just swap punctuation.

## 4. Update memory

Flip the existing rule in `mem://index.md` Core and rewrite `mem://style/copy-tone`:

- Old: "Em-dashes (—), no double-hyphens."
- New: "No em-dashes (—) and no double-hyphens (--). Use periods, commas, or colons for natural pacing."

## Out of scope

- Desktop layouts (only mobile overlap is broken)
- Rewriting copy beyond punctuation swaps
- New slides or feature changes
