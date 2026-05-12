I found slide 10 is `ClippingSlide`, and its Skrillex thumbnail is still importing the old `skrillex-clip1.png` placeholder.

Plan:
1. Copy the uploaded image `skrillex_-_FUS-3.jpg` into `src/assets/case-clipping-skrillex.jpg`, replacing the current asset used for the Skrillex clipping case study.
2. Update `ClippingSlide.tsx` so slide 10 imports `case-clipping-skrillex.jpg` for the Skrillex thumbnail instead of `skrillex-clip1.png`.
3. Leave the rest of the slide and other thumbnails unchanged.