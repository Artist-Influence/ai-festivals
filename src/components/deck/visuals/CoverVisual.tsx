import { cn } from '@/lib/utils';

interface CoverVisualProps {
  className?: string;
}

// Deterministic pseudo-random for stable positions
const seeded = (i: number) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

/**
 * CoverVisual — a refined live-events backdrop (used by the cover + closing
 * slides). Soft stage-light beams fan up from a single source, a warm glow
 * "horizon" sits at the base like stage/crowd light, fine embers drift up, and
 * a couple of hairline arcs frame the logo. Premium and evocative rather than
 * the busy equalizer-ring/comet look. Beams + embers are desktop-only for
 * performance; the glow horizon, arcs, and vignette render everywhere.
 */

// Search-light beams, all emanating from one source below center, fanned out.
const BEAMS = [
  { angle: -28, w: 16, hue: 'red-deep', op: 0.5, dur: 15, delay: 0 },
  { angle: -11, w: 11, hue: 'coral', op: 0.32, dur: 19, delay: -5 },
  { angle: 6, w: 12, hue: 'coral', op: 0.3, dur: 17, delay: -9 },
  { angle: 22, w: 17, hue: 'red-deep', op: 0.46, dur: 21, delay: -3 },
];

// Rising embers (fine drifting light over the crowd).
const EMBERS = Array.from({ length: 30 }, (_, i) => ({
  left: seeded(i + 1) * 100,
  size: 1.4 + seeded(i + 7) * 2.6,
  delay: -seeded(i + 13) * 18,
  dur: 13 + seeded(i + 19) * 14,
  op: 0.18 + seeded(i + 29) * 0.42,
}));

const CoverVisual = ({ className }: CoverVisualProps) => (
  <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
    <style>{`
      @keyframes cv-beam {
        0%, 100% { transform: translateX(-50%) rotate(var(--a)); opacity: var(--o); }
        50% { transform: translateX(-50%) rotate(calc(var(--a) + 5deg)); opacity: calc(var(--o) * 1.45); }
      }
      @keyframes cv-ember {
        0% { bottom: -2%; opacity: 0; }
        12%, 84% { opacity: var(--eo); }
        100% { bottom: 104%; opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .cv-beam, .cv-ember { animation: none !important; }
        .cv-ember { opacity: var(--eo); bottom: 50%; }
      }
    `}</style>

    {/* Stage-light beams (one source, fanned) */}
    {BEAMS.map((b, i) => (
      <div
        key={`beam-${i}`}
        className="cv-beam absolute left-1/2 bottom-[6%] origin-bottom hidden md:block"
        style={{
          width: `${b.w}%`,
          height: '128%',
          ['--a' as string]: `${b.angle}deg`,
          ['--o' as string]: b.op,
          transform: `translateX(-50%) rotate(${b.angle}deg)`,
          background: `linear-gradient(to top, hsl(var(--${b.hue}) / 0.6), transparent 70%)`,
          clipPath: 'polygon(45% 100%, 55% 100%, 100% 0, 0 0)',
          filter: 'blur(38px)',
          opacity: b.op,
          mixBlendMode: 'screen',
          animation: `cv-beam ${b.dur}s ease-in-out ${b.delay}s infinite`,
        }}
      />
    ))}

    {/* Glow horizon at the base (stage / crowd glow) */}
    <div
      className="absolute inset-x-0 bottom-0 h-[58%]"
      style={{
        background:
          'radial-gradient(ellipse 75% 100% at 50% 125%, hsl(var(--coral) / 0.26), hsl(var(--red-deep) / 0.16) 38%, transparent 68%)',
      }}
    />

    {/* Rising embers */}
    {EMBERS.map((e, i) => (
      <span
        key={`ember-${i}`}
        className="cv-ember absolute rounded-full hidden md:block"
        style={{
          left: `${e.left}%`,
          bottom: '-2%',
          width: `${e.size}px`,
          height: `${e.size}px`,
          background: 'hsl(var(--coral))',
          boxShadow: '0 0 7px hsl(var(--coral) / 0.85)',
          ['--eo' as string]: e.op,
          animation: `cv-ember ${e.dur}s linear ${e.delay}s infinite`,
        }}
      />
    ))}

    {/* Hairline arcs framing the logo */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1920 1080"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="960" cy="540" r="300" stroke="hsl(var(--coral))" strokeWidth="1" opacity="0.07" />
      <circle cx="960" cy="540" r="440" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.045" />
      <circle cx="960" cy="540" r="610" stroke="hsl(var(--coral))" strokeWidth="0.5" opacity="0.03" strokeDasharray="2 16" />
    </svg>

    {/* Center vignette to keep the logo + text crisp */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 620px 380px at 50% 46%, hsl(var(--background) / 0.5) 0%, hsl(var(--background) / 0.12) 46%, transparent 72%)',
      }}
    />
  </div>
);

export default CoverVisual;
