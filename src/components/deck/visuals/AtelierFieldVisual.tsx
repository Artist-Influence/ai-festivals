import { cn } from '@/lib/utils';
import logomark from '@/assets/ai-logomark-white.png';

interface AtelierFieldVisualProps {
  className?: string;
  variant?: 'default' | 'mirrored' | 'corner' | 'centered';
}

/**
 * AtelierFieldVisual — luxury editorial backdrop for info-heavy slides.
 *
 * Sister visual to PatternVisual (the monogram). Same restraint, same
 * champagne+red palette, but a single anchor monogram + guillochage cross-hatch
 * + diamond lattice nodes instead of a tiled monogram. Static (no traveling
 * particles, no broadcast arcs) — calm and editorial.
 */
const AtelierFieldVisual = ({ className, variant = 'default' }: AtelierFieldVisualProps) => {
  // Anchor monogram — locked to top-right whitespace across all variants for consistency.
  // `centered` variant uses a medallion instead (Pricing slide).
  const anchor = variant === 'centered' ? null : { x: 1640, y: 60, w: 240, rot: -8 };

  // Lattice skew — varies subtly per variant for rhythm without moving the anchor.
  const skew = variant === 'mirrored' ? 8 : variant === 'corner' ? 4 : variant === 'centered' ? 0 : -8;

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* Aurora wash blobs — bold oxblood/red drift, the brand's signature glow */}
      <div className="absolute top-[6%] left-[2%] w-[860px] h-[860px] rounded-full bg-[hsl(var(--coral)/0.13)] blur-[150px] animate-aurora-drift" />
      <div className="absolute bottom-[2%] right-[0%] w-[800px] h-[800px] rounded-full bg-[hsl(var(--red-deep)/0.55)] blur-[150px] animate-aurora-drift-rev" />

      <svg
        className="absolute inset-0 w-full h-full hidden md:block"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Editorial guillochage — fine cross-hatch, Hermès engraved-metal */}
          <pattern
            id="atelier-hatch"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
            patternTransform={`skewX(${skew})`}
          >
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.04" strokeWidth="0.6" />
            <path d="M 0 0 L 56 56" stroke="hsl(var(--foreground))" strokeOpacity="0.025" strokeWidth="0.4" />
          </pattern>

          {/* Diamond lattice nodes — champagne accents */}
          <pattern
            id="atelier-diamonds"
            width="168"
            height="168"
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${skew})`}
          >
            <path
              d="M 84 78 L 90 84 L 84 90 L 78 84 Z"
              stroke="hsl(40 55% 80%)"
              strokeOpacity="0.18"
              strokeWidth="0.7"
              fill="none"
            />
            <circle cx="84" cy="84" r="0.9" fill="hsl(var(--primary))" fillOpacity="0.30" />
          </pattern>

          {/* Edge-fade mask */}
          <radialGradient id="atelier-mask-grad" cx="50%" cy="50%" r="68%">
            <stop offset="0%" stopColor="white" stopOpacity="0.15" />
            <stop offset="55%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0.85" />
          </radialGradient>
          <mask id="atelier-edge-mask">
            <rect width="1920" height="1080" fill="url(#atelier-mask-grad)" />
          </mask>

          {/* Canvas grain */}
          <filter id="atelier-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>

        {/* Guillochage layer */}
        <rect width="1920" height="1080" fill="url(#atelier-hatch)" mask="url(#atelier-edge-mask)" />

        {/* Diamond lattice layer */}
        <rect width="1920" height="1080" fill="url(#atelier-diamonds)" mask="url(#atelier-edge-mask)" />

        {/* Anchor monogram (watermark) */}
        {anchor && (
          <g transform={`translate(${anchor.x} ${anchor.y}) rotate(${anchor.rot})`} opacity="0.045">
            <image href={logomark} x="0" y="0" width={anchor.w} height={anchor.w * (772 / 632)} />
          </g>
        )}

        {/* Centered medallion (PricingSlide) */}
        {variant === 'centered' && (
          <g transform="translate(960 540)" opacity="0.5">
            <circle r="280" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.10" strokeWidth="1" strokeDasharray="3 6" />
            <circle r="320" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.06" strokeWidth="0.5" />
            <circle r="360" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.06" strokeWidth="0.5" strokeDasharray="1 4" />
            {/* Compass diamonds at 4 cardinal points */}
            {[0, 90, 180, 270].map((deg) => (
              <g key={deg} transform={`rotate(${deg}) translate(0 -300)`}>
                <path d="M -6 0 L 0 -6 L 6 0 L 0 6 Z" stroke="hsl(40 55% 80%)" strokeOpacity="0.35" strokeWidth="0.8" fill="none" />
              </g>
            ))}
          </g>
        )}

        {/* Grain overlay */}
        <rect width="1920" height="1080" fill="hsl(var(--foreground))" filter="url(#atelier-grain)" opacity="0.4" />
      </svg>

      {/* Mobile-only subtle hatch (no SVG animations) */}
      <div
        className="absolute inset-0 md:hidden opacity-45"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, hsl(var(--foreground)/0.04) 0 1px, transparent 1px 40px), repeating-linear-gradient(45deg, hsl(var(--foreground)/0.03) 0 1px, transparent 1px 40px)',
          maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 80%)',
        }}
      />

      <div className="absolute inset-x-0 -bottom-[10%] md:hidden h-[48%] bg-primary/[0.06] blur-[120px]" />

      {/* Champagne shimmer wash — broad, soft luxury highlight */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -inset-y-1/2 -left-1/2 w-[140%] h-[200%] animate-shimmer-sweep"
          style={{
            background:
              'linear-gradient(105deg, transparent 0%, transparent 25%, hsl(40 55% 80% / 0.05) 50%, transparent 75%, transparent 100%)',
            mixBlendMode: 'soft-light',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Edge-only vignette: frames content, keeps the center glow bright */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 118% 108% at 50% 45%, transparent 46%, hsl(var(--bg)/0.5) 100%)',
        }}
      />
    </div>
  );
};

export default AtelierFieldVisual;
