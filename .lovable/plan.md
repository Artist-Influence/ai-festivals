## Problem

You uploaded 6 thumbnails named after their case-study sections, but only 3 (Skrillex / DoorDash / Mario) were slotted into the Clipping slide. The other 3 (Space Laces, GORDO @ MUTE, SVDDEN DEATH) are still pointing at unrelated placeholder art on the YouTube Ads + Instagram Seeding slides.

Uploads found:
- `skrillex_-_FUS.jpg` → Clipping slide (Skrillex FUS)
- `doordash_x_50_cent.jpg` → Clipping slide (DoorDash × 50 Cent)
- `super_mario_galaxy.jpg` → Clipping slide (Super Mario Galaxy)
- `svdden_death.webp` → YouTube Ads slide, case 1 (SVDDEN DEATH — VOYDOME 2025)
- `gordo_@_mute.jpg` → YouTube Ads slide, case 2 (GORDO @ MUTE)
- `space_laces_vaultage_004.jpeg` → YouTube Ads slide, case 3 AND Instagram Seeding slide (Space Laces — Vaultage 004)

## Fix

1. **Re-copy clipping thumbnails** (in case last copy got cached/corrupted) to:
   - `src/assets/case-clipping-skrillex.jpg`
   - `src/assets/case-clipping-doordash.jpg`
   - `src/assets/case-clipping-mario.jpg`

2. **Add 3 new asset files**:
   - `src/assets/case-yt-svdden-death.webp`
   - `src/assets/case-yt-gordo-mute.jpg`
   - `src/assets/case-space-laces-vaultage-004.jpeg`

3. **`YouTubeAdsSlide.tsx`** (lines 5-8): replace the three TODO placeholder imports with the three new files above and remove the TODO comment.

4. **`InstagramSeedingSlide.tsx`** (lines 6-7): swap the `dack-janiels-shock-therapy.jpg` placeholder for the new Space Laces cover and remove the TODO comment.

No copy, layout, or styling changes — image swaps only.

## Files touched
- `src/assets/case-clipping-{skrillex,doordash,mario}.jpg` (overwrite)
- `src/assets/case-yt-svdden-death.webp` (new)
- `src/assets/case-yt-gordo-mute.jpg` (new)
- `src/assets/case-space-laces-vaultage-004.jpeg` (new)
- `src/components/deck/slides/YouTubeAdsSlide.tsx`
- `src/components/deck/slides/InstagramSeedingSlide.tsx`
