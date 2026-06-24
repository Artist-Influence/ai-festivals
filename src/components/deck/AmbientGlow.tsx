/**
 * Global brand backdrop: three drifting oxblood/red glows + a fine film grain,
 * fixed behind all content (z-0). Matches the ambient layer on
 * www.artistinfluence.com. Purely decorative, never interactive.
 *
 * Mount once at the app root. Content must sit in a `relative z-[1]` (or higher)
 * container so it paints above this layer.
 */
const AmbientGlow = () => (
  <>
    <div className="ambient" aria-hidden="true">
      <i className="g1" />
      <i className="g2" />
      <i className="g3" />
    </div>
    <div className="grain" aria-hidden="true" />
  </>
);

export default AmbientGlow;
