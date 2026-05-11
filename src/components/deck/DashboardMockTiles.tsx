import { cn } from '@/lib/utils';

type Variant = 'sparkline' | 'pills' | 'rows' | 'bars';

interface DashboardMockTileProps {
  variant: Variant;
  className?: string;
}

/**
 * Subtle SVG dashboard mockups used as decorative background art in product slides.
 * Renders at low opacity behind module cards.
 */
const DashboardMockTile = ({ variant, className }: DashboardMockTileProps) => {
  return (
    <svg viewBox="0 0 200 120" className={cn('w-full h-full', className)} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>

      {variant === 'sparkline' && (
        <>
          <path d="M 10,90 L 30,70 L 50,75 L 70,55 L 90,60 L 110,40 L 130,45 L 150,25 L 170,30 L 190,15"
            fill="none" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeOpacity="0.7" />
          <path d="M 10,90 L 30,70 L 50,75 L 70,55 L 90,60 L 110,40 L 130,45 L 150,25 L 170,30 L 190,15 L 190,110 L 10,110 Z"
            fill={`url(#spark-${variant})`} />
          <text x="10" y="20" fontSize="8" fill="hsl(var(--foreground))" fillOpacity="0.6" fontWeight="600">PACING</text>
          <text x="170" y="20" fontSize="8" fill="hsl(var(--primary))" fillOpacity="0.8">+24%</text>
        </>
      )}

      {variant === 'pills' && (
        <>
          {[
            { x: 10, w: 50, label: 'LIVE', primary: true },
            { x: 70, w: 60, label: 'PACING', primary: false },
            { x: 140, w: 50, label: 'OK', primary: false },
            { x: 10, y: 60, w: 70, label: 'TIKTOK', primary: false },
            { x: 90, y: 60, w: 60, label: 'IG', primary: true },
            { x: 10, y: 90, w: 100, label: '12 CAMPAIGNS', primary: false },
          ].map((p, i) => (
            <g key={i}>
              <rect x={p.x} y={p.y ?? 30} width={p.w} height="18" rx="9"
                fill={p.primary ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'}
                fillOpacity={p.primary ? 0.18 : 0.06}
                stroke={p.primary ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'}
                strokeWidth="0.5"
                strokeOpacity={p.primary ? 0.5 : 0.15} />
              <text x={p.x + 6} y={(p.y ?? 30) + 12} fontSize="8" fontWeight="600"
                fill={p.primary ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'}
                fillOpacity={p.primary ? 0.9 : 0.5}>{p.label}</text>
            </g>
          ))}
        </>
      )}

      {variant === 'rows' && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="10" y={15 + i * 24} width="180" height="18" rx="3"
                fill="hsl(var(--foreground))" fillOpacity="0.03"
                stroke="hsl(var(--foreground))" strokeWidth="0.4" strokeOpacity="0.1" />
              <circle cx="20" cy={24 + i * 24} r="3" fill="hsl(var(--primary))" fillOpacity="0.5" />
              <rect x="30" y={22 + i * 24} width="60" height="4" rx="2"
                fill="hsl(var(--foreground))" fillOpacity="0.3" />
              <rect x="100" y={22 + i * 24} width="40" height="4" rx="2"
                fill="hsl(var(--foreground))" fillOpacity="0.15" />
              <rect x={150 + (i % 2) * 10} y={20 + i * 24} width={30 - (i % 2) * 10} height="8" rx="2"
                fill="hsl(var(--primary))" fillOpacity="0.2" />
            </g>
          ))}
        </>
      )}

      {variant === 'bars' && (
        <>
          {[55, 70, 40, 85, 60, 95, 75].map((h, i) => (
            <rect key={i} x={15 + i * 26} y={110 - h} width="16" height={h} rx="2"
              fill="hsl(var(--primary))" fillOpacity={0.15 + (i % 3) * 0.1} />
          ))}
          <line x1="10" y1="110" x2="195" y2="110" stroke="hsl(var(--foreground))" strokeWidth="0.4" strokeOpacity="0.2" />
          <text x="10" y="14" fontSize="8" fill="hsl(var(--foreground))" fillOpacity="0.6" fontWeight="600">SIGNALS</text>
        </>
      )}
    </svg>
  );
};

export default DashboardMockTile;
