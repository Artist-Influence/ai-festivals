import { cn } from '@/lib/utils';
import logomark from '@/assets/ai-logomark-white.png';

interface PatternVisualProps {
  className?: string;
  variant?: 'default' | 'mirrored' | 'corner';
}

/**
 * Goyard-style monogram backdrop using the Artist Influence "AI" logomark.
 * Half-drop staggered lattice with two-tone foil-stamp effect (white over red
 * hairline offset), champagne shimmer wave, canvas grain, aurora warmth, and
 * radial mask for legibility.
 */
const PatternVisual = ({ className, variant = 'default' }: PatternVisualProps) => {
  const rotation = variant === 'mirrored' ? -6 : variant === 'corner' ? 8 : 6;

  // Tile geometry — Goyard half-drop. Two marks per tile, both fully contained.
  const tileW = 220;
  const tileH = 260;
  const markW = 64;
  const markH = 78;
  // Mark A: upper-left quadrant center
  const ax = tileW * 0.25 - markW / 2;
  const ay = tileH * 0.25 - markH / 2;
  // Mark B: lower-right quadrant center (half-drop offset)
  const bx = tileW * 0.75 - markW / 2;
  const by = tileH * 0.75 - markH / 2;
  const shadowOffset = 0.7;

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* Aurora wash blobs — slow drift for ambient warmth */}
      <div className="absolute top-[12%] left-[8%] w-[720px] h-[720px] rounded-full bg-primary/[0.07] blur-[180px] animate-aurora-drift" />
      <div className="absolute bottom-[8%] right-[4%] w-[640px] h-[640px] rounded-full bg-primary/[0.05] blur-[160px] animate-aurora-drift-rev" />

      {/* Drifting monogram lattice — softened with blur for readability. Hidden on mobile for perf. */}
      <div
        className="absolute inset-0 animate-pattern-drift hidden md:block"
        style={{
          maskImage:
            'radial-gradient(ellipse 95% 85% at 50% 50%, black 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.2) 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 95% 85% at 50% 50%, black 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.2) 100%)',
          filter: 'blur(1.4px)',
        }}
      >
        <svg
          className="absolute inset-0 w-[calc(100%+240px)] h-[calc(100%+240px)] -left-[120px] -top-[120px]"
          viewBox="0 0 2160 1320"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Subtle canvas grain to read as printed/foil-stamped fabric */}
            <filter id="ai-grain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
              <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0" />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>

            {/* Half-drop tile */}
            <pattern
              id="ai-monogram-tile"
              width={tileW}
              height={tileH}
              patternUnits="userSpaceOnUse"
              patternTransform={`rotate(${rotation})`}
            >
              {/* Mark A — upper-left quadrant */}
              <image
                href={logomark}
                x={ax + shadowOffset}
                y={ay + shadowOffset}
                width={markW}
                height={markH}
                opacity="0.18"
                style={{ filter: 'brightness(0) saturate(100%) invert(20%) sepia(95%) saturate(5800%) hue-rotate(348deg) brightness(95%) contrast(105%)' }}
              />
              <image
                href={logomark}
                x={ax}
                y={ay}
                width={markW}
                height={markH}
                opacity="0.10"
              />

              {/* Mark B — lower-right quadrant (half-drop) */}
              <image
                href={logomark}
                x={bx + shadowOffset}
                y={by + shadowOffset}
                width={markW}
                height={markH}
                opacity="0.18"
                style={{ filter: 'brightness(0) saturate(100%) invert(20%) sepia(95%) saturate(5800%) hue-rotate(348deg) brightness(95%) contrast(105%)' }}
              />
              <image
                href={logomark}
                x={bx}
                y={by}
                width={markW}
                height={markH}
                opacity="0.10"
              />

              {/* Diamond accents at tile mid-edges */}
              <g
                stroke="hsl(var(--primary))"
                strokeOpacity="0.14"
                strokeWidth="1"
                fill="none"
              >
                <path d={`M ${tileW / 2 - 6} ${tileH / 2} L ${tileW / 2} ${tileH / 2 - 6} L ${tileW / 2 + 6} ${tileH / 2} L ${tileW / 2} ${tileH / 2 + 6} Z`} />
              </g>

              {/* Hollow inner diamonds for refinement */}
              <path
                d={`M ${tileW / 2 - 5} 6 L ${tileW / 2} 1 L ${tileW / 2 + 5} 6 L ${tileW / 2} 11 Z`}
                stroke="hsl(var(--foreground))"
                strokeOpacity="0.06"
                strokeWidth="0.7"
                fill="none"
              />

              {/* Anchor dots — lattice nodes */}
              <g fill="hsl(var(--foreground))" fillOpacity="0.06">
                <circle cx="0" cy="0" r="1.3" />
                <circle cx={tileW} cy="0" r="1.3" />
                <circle cx="0" cy={tileH} r="1.3" />
                <circle cx={tileW} cy={tileH} r="1.3" />
              </g>
              <circle cx={tileW / 2} cy={tileH / 2} r="1.6" fill="hsl(var(--primary))" fillOpacity="0.28" />
            </pattern>
          </defs>

          <rect width="2160" height="1320" fill="url(#ai-monogram-tile)" />
          {/* Grain overlay — pulls the whole pattern into a printed-canvas feel */}
          <rect width="2160" height="1320" fill="hsl(var(--foreground))" filter="url(#ai-grain)" opacity="0.5" />
        </svg>
      </div>

      {/* Champagne shimmer wash — desktop only for perf */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
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

      {/* Mobile monogram fallback — static + lighter for performance */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          maskImage:
            'radial-gradient(ellipse 100% 88% at 50% 50%, black 0%, rgba(0,0,0,0.8) 42%, rgba(0,0,0,0.4) 74%, rgba(0,0,0,0.16) 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 88% at 50% 50%, black 0%, rgba(0,0,0,0.8) 42%, rgba(0,0,0,0.4) 74%, rgba(0,0,0,0.16) 100%)',
        }}
      >
        <svg
          className="absolute inset-0 w-[calc(100%+120px)] h-[calc(100%+120px)] -left-[60px] -top-[60px] opacity-50"
          viewBox="0 0 2160 1320"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="ai-monogram-tile-mobile"
              width={tileW}
              height={tileH}
              patternUnits="userSpaceOnUse"
              patternTransform={`rotate(${rotation})`}
            >
              <image
                href={logomark}
                x={ax + shadowOffset}
                y={ay + shadowOffset}
                width={markW}
                height={markH}
                opacity="0.16"
                style={{ filter: 'brightness(0) saturate(100%) invert(20%) sepia(95%) saturate(5800%) hue-rotate(348deg) brightness(95%) contrast(105%)' }}
              />
              <image href={logomark} x={ax} y={ay} width={markW} height={markH} opacity="0.08" />
              <image
                href={logomark}
                x={bx + shadowOffset}
                y={by + shadowOffset}
                width={markW}
                height={markH}
                opacity="0.16"
                style={{ filter: 'brightness(0) saturate(100%) invert(20%) sepia(95%) saturate(5800%) hue-rotate(348deg) brightness(95%) contrast(105%)' }}
              />
              <image href={logomark} x={bx} y={by} width={markW} height={markH} opacity="0.08" />
              <path
                d={`M ${tileW / 2 - 6} ${tileH / 2} L ${tileW / 2} ${tileH / 2 - 6} L ${tileW / 2 + 6} ${tileH / 2} L ${tileW / 2} ${tileH / 2 + 6} Z`}
                stroke="hsl(var(--primary))"
                strokeOpacity="0.12"
                strokeWidth="1"
                fill="none"
              />
              <circle cx={tileW / 2} cy={tileH / 2} r="1.4" fill="hsl(var(--primary))" fillOpacity="0.18" />
            </pattern>
          </defs>
          <rect width="2160" height="1320" fill="url(#ai-monogram-tile-mobile)" />
        </svg>
      </div>

      <div
        className="absolute inset-0 md:hidden opacity-35"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, hsl(var(--foreground)/0.04) 0 1px, transparent 1px 40px), repeating-linear-gradient(45deg, hsl(var(--foreground)/0.03) 0 1px, transparent 1px 40px)',
        }}
      />

      <div className="absolute inset-x-0 -bottom-[10%] md:hidden h-[48%] bg-primary/[0.06] blur-[120px]" />

      {/* Vignette + inward legibility shield to lift text off the pattern */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 105% 100% at 50% 50%, hsl(var(--background)/0.26) 0%, transparent 62%, hsl(var(--background)/0.18) 100%)',
        }}
      />
    </div>
  );
};

export default PatternVisual;
