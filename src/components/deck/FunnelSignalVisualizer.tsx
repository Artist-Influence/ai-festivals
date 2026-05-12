import { useEffect, useRef } from 'react';

/**
 * Audio-equalizer style funnel — vertical EQ bars whose count narrows
 * top-to-bottom, animated like a live music visualizer. Cool→warm gradient
 * (cyan → violet → magenta) intentionally distinct from the brand red.
 */
const FunnelSignalVisualizer = () => {
  const ref = useRef<SVGSVGElement>(null);

  // viewBox geometry
  const W = 220;
  const H = 520;
  const topY = 24;
  const botY = 496;

  // Funnel rows — column count narrows from top (9) to bottom (3).
  // Each row defines: y center, bar count, bar width, gap.
  const rows = [
    { y: 60,  count: 9, bw: 12, gap: 6 },
    { y: 130, count: 8, bw: 13, gap: 6 },
    { y: 200, count: 7, bw: 14, gap: 7 },
    { y: 270, count: 6, bw: 15, gap: 8 },
    { y: 335, count: 5, bw: 16, gap: 9 },
    { y: 395, count: 4, bw: 17, gap: 10 },
    { y: 450, count: 3, bw: 18, gap: 12 },
  ];

  // Pre-compute bar specs with deterministic phase offsets so animation looks organic.
  const bars: { id: string; x: number; cy: number; w: number; phase: number; speed: number; rowIdx: number }[] = [];
  rows.forEach((r, rIdx) => {
    const totalW = r.count * r.bw + (r.count - 1) * r.gap;
    const startX = (W - totalW) / 2;
    for (let i = 0; i < r.count; i++) {
      const x = startX + i * (r.bw + r.gap);
      bars.push({
        id: `b-${rIdx}-${i}`,
        x,
        cy: r.y,
        w: r.bw,
        phase: (rIdx * 0.7 + i * 0.9) % (Math.PI * 2),
        speed: 1.6 + (i % 3) * 0.4 + rIdx * 0.05,
        rowIdx: rIdx,
      });
    }
  });

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const els = svg.querySelectorAll<SVGRectElement>('.eq-bar');
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      els.forEach((el) => {
        const phase = parseFloat(el.dataset.phase || '0');
        const speed = parseFloat(el.dataset.speed || '1.5');
        const cy = parseFloat(el.dataset.cy || '0');
        const w = parseFloat(el.dataset.w || '12');
        const rowIdx = parseFloat(el.dataset.row || '0');

        // amplitude shrinks as we go down the funnel
        const maxAmp = 44 - rowIdx * 4.2;
        const a = (Math.sin(t * speed + phase) * 0.5 + 0.5) * maxAmp + 6;
        el.setAttribute('height', String(a));
        el.setAttribute('y', String(cy - a / 2));
        el.setAttribute('width', String(w));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-[240px] h-auto max-h-[520px]"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Audio equalizer funnel visualization"
    >
      <defs>
        <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="hsl(190 95% 60%)" />
          <stop offset="50%" stopColor="hsl(265 90% 65%)" />
          <stop offset="100%" stopColor="hsl(330 90% 60%)" />
        </linearGradient>
        <radialGradient id="eqGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="hsl(330 90% 60%)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="hsl(330 90% 60%)" stopOpacity="0" />
        </radialGradient>
        <filter id="eqBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* Soft side rails — implied funnel shape */}
      <line x1={W/2 - 95} y1={topY} x2={W/2 - 30} y2={botY}
            stroke="hsl(220 30% 90%)" strokeOpacity="0.12" strokeWidth="0.6" />
      <line x1={W/2 + 95} y1={topY} x2={W/2 + 30} y2={botY}
            stroke="hsl(220 30% 90%)" strokeOpacity="0.12" strokeWidth="0.6" />

      {/* EQ bars */}
      {bars.map((b) => (
        <rect
          key={b.id}
          className="eq-bar"
          x={b.x}
          y={b.cy - 6}
          width={b.w}
          height={12}
          rx={b.w / 2}
          fill="url(#eqGrad)"
          filter="url(#eqBlur)"
          data-phase={b.phase}
          data-speed={b.speed}
          data-cy={b.cy}
          data-w={b.w}
          data-row={b.rowIdx}
        />
      ))}

      {/* Conversion glow at the bottom */}
      <ellipse cx={W/2} cy={botY + 10} rx="70" ry="22" fill="url(#eqGlow)">
        <animate attributeName="ry" values="18;26;18" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3.2s" repeatCount="indefinite" />
      </ellipse>
      <circle cx={W/2} cy={botY + 8} r="4" fill="hsl(330 95% 70%)">
        <animate attributeName="r" values="3.5;6.5;3.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default FunnelSignalVisualizer;
