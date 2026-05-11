## Replace Client Portal video on Slide 6

The uploaded file `Unified_Ops_Client_Portal_Screen_Recording_for_Deck.mp4` is 1920x1080 (16:9), 58s, 60fps. It will replace the current cropped 1920x928 video.

### Steps

1. Copy upload to `public/client-portal.mp4`, replacing the existing file. Re-encode with ffmpeg (H.264, faststart, ~30fps, reasonable bitrate) so it streams well in the deck — preserve full 1920x1080 frame, no cropping.
2. Regenerate `public/client-portal-poster.jpg` from the new video (frame near start).
3. In `src/components/deck/slides/ClientPortalSlide.tsx`, change the video container back from `aspect-[1920/928]` to `aspect-video` (16:9) so the GlassPanel border sizes tightly around the new recording. Keep `object-contain`.

### Files touched
- `public/client-portal.mp4` (replaced)
- `public/client-portal-poster.jpg` (regenerated)
- `src/components/deck/slides/ClientPortalSlide.tsx` (aspect ratio)
