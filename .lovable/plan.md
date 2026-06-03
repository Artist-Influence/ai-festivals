
# Replace Gordo case study with MashBit on the Meta + TikTok Ads slide

## File
`src/components/deck/slides/AdditionalServicesSlide.tsx` — the slide that currently shows two cards (Gordo / TikTok Ads + Zeds Dead / Meta Ads).

## What changes

Replace the first case study (Gordo) with MashBit Houston, condensed to the ticket-sales angle and matching the Zeds Dead card format (label, artist, descriptor, 1-line bullet, metrics grid).

### New MashBit card
- Thumbnail: new asset from uploaded press photo, saved to `src/assets/case-mashbit.webp` (cropped to face, square).
- Platform label: `META ADS` (replaces `TIKTOK ADS`). Both case studies will now be Meta Ads — this is honest to the campaign data; the slide's headline still covers Meta + TikTok as services.
- Artist: `MashBit`
- Track / descriptor: `Houston 5.29.26 — Persians + Charity Push · 14-day flight`
- Description bullet (`metaTiktok.case1Desc` in en.ts): rewrite to ticket-sales framing, e.g. `Houston event push: drove +228 net new ticket sales in 14 days (46 → 274), turning $785 of ad spend into $3,949 in ticket revenue.`
- Metrics (5, matching Zeds Dead's 5-col grid):
  1. `$785` — Spend
  2. `274` — Tickets sold (label: `kpi.ticketsSold`, new)
  3. `$3,949` — Revenue (label: `kpi.revenue`, new)
  4. `5.03×` — ROAS (label: `kpi.roas`, new)
  5. `9.06%` — CTR

Drop the existing Gordo-only metric labels (sixSecViews, viewRate, cpm) from the card; keep their translation keys intact since other slides may use them — only the array contents change.

### i18n
Update `metaTiktok.case1Desc` in all 9 locale files with the new MashBit copy (English authored; other languages get the English string as a placeholder unless localized copies exist for Zeds Dead — match whatever pattern is already used).
Add 3 new KPI keys (`kpi.ticketsSold`, `kpi.revenue`, `kpi.roas`) in every locale file. Use natural translations where the file already has full localization; fall back to English where it doesn't.

### Asset
Save the uploaded artist photo to `src/assets/case-mashbit.webp` (or `.jpg` if conversion adds friction — the existing case study assets use both). Replace the `gordoImg` import with `mashbitImg`. Leave `@/assets/gordo-meta-tiktok.webp` in place (still referenced nowhere else after this change; can be deleted later, out of scope here).

## Out of scope
- YouTube slide (Gordo @ MUTE case study stays).
- Layout/typography changes to the slide itself.
- Mobile-specific tweaks beyond what already exists.
- Deleting the now-unused Gordo image asset.

## Open question (will assume default unless told otherwise)
Both cards will read `META ADS`. If you'd rather one card show `TIKTOK ADS` to keep the slide visually balanced across both platforms, say so and I'll find/swap in a TikTok-native case study instead — but the MashBit data you sent is Meta-only, so labelling it TikTok would be inaccurate.
