import { cn } from '@/lib/utils';

interface CoverVisualProps {
  className?: string;
}

// Deterministic pseudo-random for stable positions
const seeded = (i: number) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

// Equalizer bars arranged in a ring
const BAR_COUNT = 56;
const RING_RADIUS = 380;
const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
  const angle = (i / BAR_COUNT) * Math.PI * 2;
  return {
    angle: (angle * 180) / Math.PI,
    delay: seeded(i + 3) * 1.2,
    dur: 0.9 + seeded(i + 11) * 1.1,
    height: 18 + seeded(i + 19) * 36,
  };
});

// Comets traveling along orbits
const comets = [
  { r: 320, dur: 14, delay: 0, opacity: 0.9 },
  { r: 320, dur: 14, delay: 7, opacity: 0.7 },
  { r: 460, dur: 22, delay: 0, opacity: 0.8 },
  { r: 460, dur: 22, delay: 11, opacity: 0.5 },
  { r: 600, dur: 30, delay: 5, opacity: 0.6 },
];

// Background pulse particles
const particles = Array.from({ length: 22 }, (_, i) => ({
  cx: seeded(i + 1) * 1920,
  cy: seeded(i + 17) * 1080,
  r: 1 + seeded(i + 31) * 1.8,
  delay: seeded(i + 53) * 4,
  dur: 3 + seeded(i + 71) * 3,
}));

const CoverVisual = ({ className }: CoverVisualProps) => (
  <div
    className={cn(
      'pointer-events-none absolute inset-0 overflow-hidden motion-reduce:animate-none',
      className
    )}
    aria-hidden
  >
    {/* Aurora mesh — slow drifting blurred conic blobs */}
    <div
      className="absolute -top-[20%] -right-[15%] w-[70vw] h-[70vw] max-w-[1100px] max-h-[1100px] rounded-full blur-[120px] opacity-50 animate-aurora-drift motion-reduce:animate-none"
      style={{
        background:
          'conic-gradient(from 0deg, hsl(var(--primary) / 0.55), hsl(var(--accent) / 0.25), transparent 60%, hsl(var(--primary) / 0.4))',
      }}
    />
    <div
      className="absolute -bottom-[20%] -left-[15%] w-[65vw] h-[65vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[140px] opacity-40 animate-aurora-drift-rev motion-reduce:animate-none"
      style={{
        background:
          'conic-gradient(from 180deg, hsl(var(--accent) / 0.45), transparent 50%, hsl(var(--primary) / 0.35))',
      }}
    />

    {/* Conic shimmer scan beam */}
    <div
      className="absolute inset-0 hidden md:block animate-conic-spin motion-reduce:animate-none"
      style={{
        background:
          'conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(var(--primary) / 0.08) 30deg, transparent 80deg, transparent 360deg)',
      }}
    />

    {/* Equalizer ring — hidden behind logo via radial mask */}
    <div
      className="absolute inset-0 hidden md:flex items-center justify-center"
      style={{
        WebkitMaskImage:
          'radial-gradient(ellipse 380px 240px at center, transparent 0%, transparent 55%, black 78%)',
        maskImage:
          'radial-gradient(ellipse 380px 240px at center, transparent 0%, transparent 55%, black 78%)',
      }}
    >
      <div className="relative w-0 h-0">
        {bars.map((b, i) => (
          <div
            key={i}
            className="absolute left-0 top-0 origin-bottom motion-reduce:animate-none"
            style={{
              transform: `rotate(${b.angle}deg) translateY(-${RING_RADIUS}px)`,
            }}
          >
            <div
              className="w-[3px] rounded-full bg-primary/60 animate-[equalizer_var(--dur)_ease-in-out_infinite] motion-reduce:animate-none"
              style={{
                height: `${b.height}px`,
                animationDelay: `${b.delay}s`,
                ['--dur' as string]: `${b.dur}s`,
                boxShadow: '0 0 8px hsl(var(--primary) / 0.5)',
              }}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Orbits + comets + particles */}
    <svg
      className="absolute inset-0 w-full h-full hidden md:block"
      viewBox="0 0 1920 1080"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="cometGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Concentric dashed orbits */}
      <circle
        cx="960"
        cy="540"
        r="320"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        opacity="0.10"
        strokeDasharray="40 20"
        style={{ animation: 'spin 60s linear infinite', transformOrigin: '960px 540px' }}
      />
      <circle
        cx="960"
        cy="540"
        r="460"
        stroke="hsl(var(--primary))"
        strokeWidth="0.6"
        opacity="0.07"
        strokeDasharray="60 30"
        style={{ animation: 'spin 90s linear infinite reverse', transformOrigin: '960px 540px' }}
      />
      <circle
        cx="960"
        cy="540"
        r="600"
        stroke="hsl(var(--accent))"
        strokeWidth="0.4"
        opacity="0.05"
        strokeDasharray="2 14"
        style={{ animation: 'spin 120s linear infinite', transformOrigin: '960px 540px' }}
      />

      {/* Comets along orbits */}
      {comets.map((c, i) => (
        <g key={`comet-${i}`} opacity={c.opacity}>
          <circle r="6" fill="url(#cometGradient)">
            <animateMotion
              dur={`${c.dur}s`}
              repeatCount="indefinite"
              begin={`${c.delay}s`}
              path={`M 960 ${540 - c.r} A ${c.r} ${c.r} 0 1 1 ${960 - 0.01} ${540 - c.r}`}
            />
          </circle>
          <circle r="2" fill="hsl(var(--primary))">
            <animateMotion
              dur={`${c.dur}s`}
              repeatCount="indefinite"
              begin={`${c.delay}s`}
              path={`M 960 ${540 - c.r} A ${c.r} ${c.r} 0 1 1 ${960 - 0.01} ${540 - c.r}`}
            />
          </circle>
        </g>
      ))}

      {/* Background pulse particles */}
      {particles.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="hsl(var(--primary))" opacity="0.5">
          <animate
            attributeName="opacity"
            values="0.1;0.85;0.1"
            dur={`${p.dur}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>

    {/* Center vignette to guarantee text legibility */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 700px 420px at center, hsl(var(--background) / 0.75) 0%, hsl(var(--background) / 0.4) 40%, transparent 70%)',
      }}
    />
  </div>
);

export default CoverVisual;
