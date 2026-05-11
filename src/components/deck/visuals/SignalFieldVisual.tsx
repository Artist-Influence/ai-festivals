import { cn } from '@/lib/utils';

interface SignalFieldVisualProps {
  className?: string;
  variant?: 'default' | 'mirrored' | 'corner';
}

/**
 * SignalFieldVisual — dynamic, layered backdrop for info-heavy slides.
 *
 * Layers (back-to-front):
 *  1. Drifting aurora blobs (primary-tinted, blurred, slow)
 *  2. Skewed signal lattice (subtle parallax)
 *  3. Concentric broadcast arcs from a variant-driven origin
 *  4. Traveling pulse particles along Bézier paths (animateMotion)
 *  5. Center radial mask to protect text legibility
 *
 * The `variant` prop rotates the broadcast origin so consecutive slides
 * don't read identically.
 */
const SignalFieldVisual = ({ className, variant = 'default' }: SignalFieldVisualProps) => {
  // Origin point for the broadcast arcs — keeps slides feeling distinct.
  const origin =
    variant === 'mirrored'
      ? { x: 1500, y: 820 }
      : variant === 'corner'
        ? { x: 280, y: 240 }
        : { x: 1640, y: 240 };

  // Bézier paths for the traveling pulse particles.
  const pulsePaths = [
    'M -50 200 C 400 120, 900 360, 1400 240 S 2000 380, 2050 320',
    'M 2050 600 C 1600 700, 1100 480, 600 620 S 100 760, -50 700',
    'M -50 880 C 350 820, 850 980, 1300 880 S 1900 760, 2050 820',
  ];

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* Layer 1 — Aurora blobs */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[1100px] max-h-[1100px] rounded-full bg-primary/[0.10] blur-[140px] animate-aurora-drift"
        style={{ willChange: 'transform' }}
      />
      <div
        className="absolute -bottom-[25%] -right-[15%] w-[65vw] h-[65vw] max-w-[1000px] max-h-[1000px] rounded-full bg-primary/[0.08] blur-[160px] animate-aurora-drift-rev"
        style={{ willChange: 'transform' }}
      />
      <div
        className="absolute top-[10%] right-[20%] w-[35vw] h-[35vw] max-w-[600px] max-h-[600px] rounded-full bg-foreground/[0.04] blur-[120px] animate-float-slow"
        style={{ willChange: 'transform' }}
      />

      {/* Layer 2-4 — SVG lattice + broadcast + pulses (desktop only for performance) */}
      <svg
        className="absolute inset-0 w-full h-full hidden md:block"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Skewed signal lattice */}
          <pattern
            id="signal-lattice"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
            patternTransform="skewX(-12)"
          >
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.05" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.2" fill="hsl(var(--primary))" fillOpacity="0.18" />
          </pattern>

          {/* Edge-fade mask so center stays clean */}
          <radialGradient id="signal-mask-grad" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0.7" />
          </radialGradient>
          <mask id="signal-edge-mask">
            <rect width="1920" height="1080" fill="url(#signal-mask-grad)" />
          </mask>

          {/* Pulse glow */}
          <radialGradient id="pulse-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>

          {/* Hidden pulse paths */}
          {pulsePaths.map((d, i) => (
            <path key={i} id={`signal-path-${i}`} d={d} />
          ))}
        </defs>

        {/* Skewed lattice with edge fade */}
        <g style={{ transformOrigin: 'center', animation: 'float 30s ease-in-out infinite' }}>
          <rect width="1920" height="1080" fill="url(#signal-lattice)" mask="url(#signal-edge-mask)" />
        </g>

        {/* Broadcast arcs from origin */}
        <g
          transform={`translate(${origin.x} ${origin.y})`}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        >
          {[140, 280, 460, 680, 940, 1240].map((r, i) => (
            <circle key={r} cx="0" cy="0" r={r} strokeOpacity={0.18 - i * 0.022}>
              <animate
                attributeName="r"
                values={`${r};${r + 40};${r}`}
                dur={`${10 + i * 0.8}s`}
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values={`${0.05};${0.18 - i * 0.022};${0.05}`}
                dur={`${10 + i * 0.8}s`}
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          {/* Origin dot */}
          <circle cx="0" cy="0" r="3" fill="hsl(var(--primary))" fillOpacity="0.5">
            <animate attributeName="fill-opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Visible signal lines — render the same Bézier paths as faint guides */}
        {pulsePaths.map((d, i) => (
          <path
            key={`line-${i}`}
            d={d}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity="0.08"
            strokeWidth="1"
            strokeDasharray="2 8"
          />
        ))}

        {/* Traveling pulses with trailing glow */}
        {pulsePaths.map((_, i) => (
          <g key={`pulse-${i}`}>
            <circle r="14" fill="url(#pulse-glow)" opacity="0.7">
              <animateMotion dur={`${9 + i * 2}s`} repeatCount="indefinite" begin={`${i * 1.5}s`}>
                <mpath href={`#signal-path-${i}`} />
              </animateMotion>
            </circle>
            <circle r="3" fill="hsl(var(--primary))">
              <animateMotion dur={`${9 + i * 2}s`} repeatCount="indefinite" begin={`${i * 1.5}s`}>
                <mpath href={`#signal-path-${i}`} />
              </animateMotion>
            </circle>
          </g>
        ))}
      </svg>

      {/* Mobile-only subtle grid (lighter, no SVG animations) */}
      <div
        className="absolute inset-0 md:hidden opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Center legibility shield — gentle vignette inward */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.15) 50%, transparent 80%)',
        }}
      />
    </div>
  );
};

export default SignalFieldVisual;
