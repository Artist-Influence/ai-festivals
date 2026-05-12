import { useEffect, useRef } from 'react';

/**
 * Abstract "narrowing signal" funnel — particles descending through
 * implied converging walls toward a soft glow at the bottom.
 * Same atmospheric language as OutcomesVisualizer, in primary red.
 */
const FunnelSignalVisualizer = () => {
  const ref = useRef<SVGSVGElement>(null);

  // viewBox geometry
  const W = 200;
  const H = 520;
  const topW = 170;
  const bottomW = 36;
  const topY = 20;
  const botY = 500;

  // x bounds at a given y on the funnel walls
  const widthAt = (y: number) => {
    const t = (y - topY) / (botY - topY);
    return topW - (topW - bottomW) * Math.max(0, Math.min(1, t));
  };

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const particles = svg.querySelectorAll<SVGCircleElement>('.falling-particle');
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      particles.forEach((p) => {
        const speed = parseFloat(p.dataset.speed || '40');
        const startY = parseFloat(p.dataset.startY || '0');
        const lane = parseFloat(p.dataset.lane || '0'); // -1..1
        const range = botY - topY + 40;
        const y = ((startY + elapsed * speed) % range) + topY - 20;

        const w = widthAt(y);
        const cx = W / 2 + lane * (w / 2) * 0.85;
        p.setAttribute('cy', String(y));
        p.setAttribute('cx', String(cx));

        const max = parseFloat(p.dataset.maxOpacity || '0.5');
        const fadeTop = y < topY + 40 ? (y - topY) / 40 : 1;
        const fadeBot = y > botY - 30 ? (botY + 10 - y) / 40 : 1;
        const o = Math.max(0, Math.min(fadeTop, fadeBot)) * max;
        p.setAttribute('opacity', String(o));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Particles seeded across lanes and start offsets
  const count = 28;
  const particles = Array.from({ length: count }, (_, i) => ({
    key: i,
    lane: Math.sin(i * 1.7) * 0.9,
    startY: (i * 23) % (botY - topY + 40),
    speed: 32 + (i % 5) * 8,
    r: 1.6 + (i % 3) * 0.6,
    maxOpacity: 0.6 + (i % 4) * 0.1,
  }));

  // Tier guide y-positions (5 tiers)
  const tiers = [0, 1, 2, 3, 4].map((i) => topY + ((botY - topY) * (i + 0.5)) / 5);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-[220px] h-auto max-h-[520px]"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Abstract funnel visualization"
    >
      {/* Implied funnel walls */}
      <line
        x1={W / 2 - topW / 2} y1={topY}
        x2={W / 2 - bottomW / 2} y2={botY}
        stroke="hsl(var(--primary))" strokeOpacity="0.55" strokeWidth="1"
      />
      <line
        x1={W / 2 + topW / 2} y1={topY}
        x2={W / 2 + bottomW / 2} y2={botY}
        stroke="hsl(var(--primary))" strokeOpacity="0.55" strokeWidth="1"
      />

      {/* Center guide */}
      <line
        x1={W / 2} y1={topY} x2={W / 2} y2={botY}
        stroke="hsl(var(--primary))" strokeOpacity="0.18" strokeWidth="0.5"
        strokeDasharray="1 4"
      />

      {/* Tier hints */}
      {tiers.map((y, i) => {
        const w = widthAt(y);
        return (
          <line
            key={`tier-${i}`}
            x1={W / 2 - w / 2} y1={y}
            x2={W / 2 + w / 2} y2={y}
            stroke="hsl(var(--primary))" strokeOpacity="0.32" strokeWidth="0.7"
          />
        );
      })}

      {/* Particles */}
      {particles.map((p) => (
        <circle
          key={p.key}
          className="falling-particle"
          cx={W / 2}
          cy={topY}
          r={p.r}
          fill="hsl(var(--primary))"
          opacity="0"
          data-speed={p.speed}
          data-start-y={p.startY}
          data-lane={p.lane}
          data-max-opacity={p.maxOpacity}
        />
      ))}

      {/* Conversion glow at the bottom */}
      <ellipse cx={W / 2} cy={botY + 6} rx="44" ry="14" fill="hsl(var(--primary))" opacity="0.22">
        <animate attributeName="opacity" values="0.16;0.32;0.16" dur="3.2s" repeatCount="indefinite" />
      </ellipse>
      <circle cx={W / 2} cy={botY + 4} r="4" fill="hsl(var(--primary))" opacity="0.9">
        <animate attributeName="r" values="3.5;6.5;3.5" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default FunnelSignalVisualizer;
