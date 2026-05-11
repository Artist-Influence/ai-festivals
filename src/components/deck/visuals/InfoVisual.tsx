import { cn } from '@/lib/utils';

interface InfoVisualProps {
  className?: string;
}

const InfoVisual = ({ className }: InfoVisualProps) => (
  <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
    {/* Symmetric soft glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.05] blur-[160px]" />
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px]" />

    {/* Centered dot grid + concentric rings — fully symmetric, no traveling lines */}
    <svg
      className="absolute inset-0 w-full h-full hidden md:block"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="info-dots" width="48" height="48" patternUnits="userSpaceOnUse" x="0" y="0">
          <circle cx="24" cy="24" r="1" fill="hsl(var(--foreground))" fillOpacity="0.18" />
        </pattern>
        <radialGradient id="info-dot-mask" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="55%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="info-dot-fade">
          <rect width="1920" height="1080" fill="url(#info-dot-mask)" />
        </mask>
      </defs>

      <rect width="1920" height="1080" fill="url(#info-dots)" mask="url(#info-dot-fade)" />

      {/* Concentric rings, centered, slow opacity pulse */}
      <g transform="translate(960 540)" fill="none" stroke="hsl(var(--primary))" strokeWidth="1">
        {[260, 420, 600, 800].map((r, i) => (
          <circle key={r} cx="0" cy="0" r={r} strokeOpacity={0.08 - i * 0.012}>
            <animate
              attributeName="stroke-opacity"
              values={`${0.04 - i * 0.005};${0.1 - i * 0.012};${0.04 - i * 0.005}`}
              dur="9s"
              begin={`${i * 0.6}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  </div>
);

export default InfoVisual;
