# Slide polish pass

## 1. Slide 9 — Ticket Funnel visualizer (replace, not red)

Rewrite `src/components/deck/FunnelSignalVisualizer.tsx` as a "sick" audio-style funnel — vertical equalizer bars whose count and amplitude narrow from top to bottom, plus a soft converging glow at the base.

- Drop the red `hsl(var(--primary))` fills. Use a cool→warm gradient defined inline in the SVG `<defs>`:
  - stop 0%: `hsl(190 95% 60%)` (cyan)
  - stop 50%: `hsl(265 90% 65%)` (violet)
  - stop 100%: `hsl(330 90% 60%)` (magenta)
- Replace the falling-particle system with ~9 columns of stacked EQ bars. Each column animates its bar heights via rAF using offset sine waves so it reads as a live music visualizer.
- Column count narrows toward the bottom: top row = 9 bars wide, middle = 6, bottom = 3, creating an implied funnel without literal walls.
- Add a soft horizontal glow ellipse at the base using the gradient's magenta stop.
- Keep the component sized `max-w-[220px]` so the slide layout doesn't change.
- In `TicketFunnelSlide.tsx`, swap the red `bg-primary/10 blur-3xl` halo for a neutral `bg-white/5` halo so it doesn't fight the new gradient.

## 2. Slide 10 — Clipping case study heights

In `ClippingSlide.tsx`, make the right column of three case-study cards match the combined height of the left "Pros / Why we're different" stack.

- Right column: add `md:flex-1` (already present) plus `md:justify-between` and give each `GlassPanel` `md:flex-1` so the three cards stretch evenly to fill the column height.
- Bump card inner padding to `md:p-5` and metric tile padding to `md:p-3` so the taller cards don't look empty.

## 3. Slide 11 — IG Seeding: keep only Space Laces + Sauti

In `InstagramSeedingSlide.tsx`, trim the `cases` array to just **Francis Mercier — Sauti** and **Space Laces — Vaultage 004**. Remove Gordo and Mau P entries (and their now-unused image imports).

With only two cards on the right, give each card more breathing room (`md:p-6`, larger artwork `md:w-24 md:h-24`) so the column still fills the slide height alongside the two left panels.

## 4. Slide 12 — Meta & TikTok Ads "How it works" timeframe cut off

In `AdditionalServicesSlide.tsx` (Meta & TikTok Ads, slide 12), reduce font sizes inside the "How it works" panel so the timeframe line at the bottom is fully visible.

- Bullet text: `md:text-2xl` → `md:text-xl`
- Timeframe line: `md:text-2xl` → `md:text-lg`
- Tighten vertical spacing (`space-y-2` and `pt-2 mt-2`) only if needed after the type changes.

## 5. Slide 15 — YouTube Ads sizing + Space Laces tweaks

In `YouTubeAdsSlide.tsx`:

- **Title cut-off**: reduce `h1` from `md:text-6xl` to `md:text-5xl` and clamp the subtitle to `md:text-xl`. Reduce `md:min-h-[720px]` to `md:min-h-0` and let the flex container drive height naturally.
- **Left panels (What/How)** trimmed: bullet text to `md:text-lg`, headings to `md:text-xl`, padding to `md:p-6`, so neither panel overflows.
- **Right case-study cards**: change wrapper to `md:h-full` with each `GlassPanel` getting `md:flex-1 md:min-h-0` and `flex flex-col` so the three cards split the column evenly. Reduce thumbnail to `md:w-[180px] md:h-[110px]`, artist name to `md:text-2xl`, KPI tiles to `md:text-lg` so each card fits without clipping.
- **Space Laces (case 3) metrics**: remove the `{ val: '2', labelKey: 'kpi.campaigns' }` tile and replace `kpi.viewsPerCampaign` with a `{ val: '9.2%', labelKey: 'kpi.ctr' }` tile. Final 6-tile grid becomes:
  - 290K Display Views · 452K Total Views · 16K Likes
  - 9.2% CTR · 145K Avg Views · #2 Search Rank
  (If "Avg Views" no longer makes sense without the campaigns count, replace it with Impressions; will confirm during implementation, but default to keeping Avg Views.)

## 6. Slide 20 — Pricing: remove two services

In `src/i18n/en.ts`, delete pricing entries for service 5 (Laylo / SMS / Email Capture) and service 7 (Retargeting Systems). Renumber remaining entries to 0–5 so the array is contiguous:

```text
0  Clipping / Creator Distribution
1  Instagram Seeding
2  Meta & TikTok Ads
3  YouTube Ads
4  SoundCloud Reposts
5  Event Landing Pages
```

In `PricingSlide.tsx`, change `Array.from({ length: 8 }, …)` to `length: 6`.

Apply the same key removal/renumbering to every locale file in `src/i18n/` (ar, de, es, fr, hi, ja, ko, nl, pt, zh) so translations stay in sync.

## Files touched

- `src/components/deck/FunnelSignalVisualizer.tsx` (rewrite)
- `src/components/deck/slides/TicketFunnelSlide.tsx` (halo color)
- `src/components/deck/slides/ClippingSlide.tsx` (right column heights)
- `src/components/deck/slides/InstagramSeedingSlide.tsx` (trim cases)
- `src/components/deck/slides/AdditionalServicesSlide.tsx` (text sizing)
- `src/components/deck/slides/YouTubeAdsSlide.tsx` (sizing + Space Laces metrics)
- `src/components/deck/slides/PricingSlide.tsx` (length: 6)
- `src/i18n/{en,ar,de,es,fr,hi,ja,ko,nl,pt,zh}.ts` (remove service 5 & 7, renumber)
