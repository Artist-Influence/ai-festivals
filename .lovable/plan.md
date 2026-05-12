## 1. Slide 9 — TicketFunnelSlide polish

**Stage bubbles (left column):**
- Constrain width: drop `flex-[2]` and use `md:max-w-[820px]` on the stages column so bubbles don't stretch full width.
- Bump text sizes to fill the vertical space between subtitle and footer panel:
  - Stage label: `md:text-base` → `md:text-xl`
  - Stage description: `md:text-base` → `md:text-2xl`
  - Panel padding: `md:p-4` → `md:p-6`
  - Gap between bubbles: `md:gap-3` → `md:gap-5`

**Visualizer (right column):**
- Make it brighter and unmistakably centered:
  - Wrap in a flex container with `items-center justify-center` (already), but widen lane: `md:w-[280px]`.
  - In `FunnelSignalVisualizer.tsx`, raise opacities: walls 0.2 → 0.45, tiers 0.12 → 0.28, center guide 0.06 → 0.18, particle `maxOpacity` baseline 0.35 → 0.6, glow 0.08/0.55 → 0.18/0.85.
  - Add a soft red radial halo behind the SVG (absolute div with `bg-primary/10 blur-3xl`) so it reads as centered red glow even at a glance.
  - Center the SVG block explicitly: wrap in `relative flex items-center justify-center` and use `mx-auto` on the svg.

## 2. Clipping case studies — new lineup

Replace cases in `ClippingSlide.tsx` AND `CaseStudyClippingSlide.tsx` with **Skrillex / DoorDash × 50 Cent / Super Mario Galaxy Movie**.

Data (from screenshots):

| Artist | Title | Views | Engagement | Likes | Posts | Notes |
|---|---|---|---|---|---|---|
| Skrillex | FUS Album | 2.08M | 6.84% | 136K | 1,557 | ~42% album UGC, $1.20 CPM |
| DoorDash × 50 Cent | Brand spot | 4.74M | 5.77% | 206K | 267 | 65.7K shares |
| Super Mario Galaxy Movie | Film launch | 8.75M | 5.99% | 521K | 105 clips | $0.57 CPM, $5K budget |

- Update `casesData` in `ClippingSlide.tsx` (right-side cards). Use placeholder cover paths in `src/assets/clipping/skrillex.jpg`, `doordash-50cent.jpg`, `super-mario-galaxy.jpg` — referenced via imports but with TODO comment ("user will attach thumbnails"); for now point them at existing placeholders (`skrillexClip1` etc.) so build doesn't break.
- Update `cases` array in `CaseStudyClippingSlide.tsx` similarly (deeper cards with overview/strategy text).
- Add new i18n keys (`clipping.case1Artist/Track/Overview` etc., and `csClipping.overview.0..2`) in `src/i18n/en.ts`. Other locale files keep stale keys — acceptable per existing pattern.
- Remove/retire references to Aries, Gorgon City, Yeat, Nash Rly in clipping slides only.

## 3. Space Laces — split across YouTube + Instagram

Split the Vaultage 004 case study:

**YouTube Ads slide** — replace one of the existing placeholder cases with **Space Laces — Vaultage 004 (YouTube)**:
- 290K WW display views, #2 search term for "Space Laces" on YouTube, 452K total views, 16K likes, 2 campaigns, 145K views/campaign.

**Instagram Seeding slide** — add **Space Laces — Vaultage 004 (IG)** as a 4th card (or replace one):
- 292K IG seeding views, 6,743 likes, 187 comments, 174 shares, 5 posts, 2.43% engagement.

User to provide cover art later — use a placeholder import for now.

## 4. YouTube Ads — two new case studies

Replace the two placeholder YouTube cases with:

**Case A — SVDDEN DEATH (VOYD): VOYDOME 2025**
- 164K views, 8.4K likes, 544 comments
- 634K subscriber growth, 19.1K watch hours, 7% CTR, 837K impressions
- "#3 search term for artist name on YouTube"

**Case B — GORDO @ MUTE (TARAKA Argentina)**
- 1.2M views, 29K likes, 783 comments, 2.1K subscriber growth
- Derived (proportional to SVDDEN DEATH ratios: views×7.32):
  - Impressions ≈ 6.13M
  - Watch hours ≈ 140K
  - CTR ≈ 7% (kept same — CTR is rate, not volume)

Update `cases` in `YouTubeAdsSlide.tsx` with these values + new i18n keys (`youtube.case1Artist/Track`, `youtube.case2Artist/Track`). Replace thumb imports with placeholder paths (TODO — user to attach).

## 5. Files

- Edit: `src/components/deck/slides/TicketFunnelSlide.tsx`
- Edit: `src/components/deck/FunnelSignalVisualizer.tsx`
- Edit: `src/components/deck/slides/ClippingSlide.tsx`
- Edit: `src/components/deck/slides/CaseStudyClippingSlide.tsx`
- Edit: `src/components/deck/slides/YouTubeAdsSlide.tsx`
- Edit: `src/components/deck/slides/InstagramSeedingSlide.tsx`
- Edit: `src/i18n/en.ts` (new + replaced keys)

No changes to other slides, routing, or backend.

## Open items (will use placeholders for now)
- Clipping cover art for Skrillex / DoorDash / Super Mario Galaxy
- Space Laces cover (for YT + IG cards)
- VOYDOME 2025 + GORDO @ MUTE thumbnails
