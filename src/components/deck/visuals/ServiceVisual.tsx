import { cn } from '@/lib/utils';

interface ServiceVisualProps {
  className?: string;
  seed?: number;
}

// Build six fanning Bezier paths from a central left node to right-side endpoints
const buildPaths = (seed: number) => {
  const sx = 220;
  const sy = 540;
  const offset = (seed * 37) % 60;
  return [
    { ey: 140 + offset, ctrl: -80 },
    { ey: 320 + offset, ctrl: -40 },
    { ey: 480 - offset, ctrl: 20 },
    { ey: 640 + offset, ctrl: -20 },
    { ey: 800 - offset, ctrl: 40 },
    { ey: 960 - offset, ctrl: 80 },
  ].map((p, i) => {
    const ex = 1740;
    const cx1 = sx + 420;
    const cy1 = sy + p.ctrl * 4;
    const cx2 = ex - 420;
    const cy2 = p.ey - p.ctrl * 4;
    return {
      d: `M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${ex} ${p.ey}`,
      ex,
      ey: p.ey,
      dur: 4 + (i % 3),
      delay: i * 0.7,
    };
  });
};

const ServiceVisual = ({ className, seed = 1 }: ServiceVisualProps) => {
  const paths = buildPaths(seed);

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* Soft ambient warmth */}
      <div className="absolute top-[15%] right-[8%] w-[360px] h-[360px] md:w-[520px] md:h-[520px] rounded-full bg-primary/[0.05] blur-[140px]" />
      <div className="absolute bottom-[10%] left-[10%] w-[260px] h-[260px] md:w-[400px] md:h-[400px] rounded-full bg-primary/[0.03] blur-[120px]" />

      <svg
        className="absolute inset-0 w-full h-full hidden md:block"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={`sv-glow-${seed}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central source node */}
        <circle cx="220" cy="540" r="14" fill="hsl(var(--primary))" opacity="0.15" />
        <circle
          cx="220"
          cy="540"
          r="6"
          fill="hsl(var(--primary))"
          opacity="0.7"
          filter={`url(#sv-glow-${seed})`}
        >
          <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
        </circle>

        {paths.map((p, i) => (
          <g key={i}>
            <path
              id={`sv-path-${seed}-${i}`}
              d={p.d}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeOpacity="0.18"
              strokeWidth="1"
            />
            {/* Endpoint */}
            <circle cx={p.ex} cy={p.ey} r="4" fill="hsl(var(--primary))" opacity="0.5" filter={`url(#sv-glow-${seed})`} />
            {/* Traveling packet */}
            <circle r="3" fill="hsl(var(--primary))" opacity="0.85" filter={`url(#sv-glow-${seed})`}>
              <animateMotion
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href={`#sv-path-${seed}-${i}`} />
              </animateMotion>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ServiceVisual;
