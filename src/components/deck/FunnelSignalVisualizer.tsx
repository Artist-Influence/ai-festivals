import { useEffect, useRef } from 'react';

/**
 * Concentric "signal capture" funnel — brand-red palette.
 * Top: scattered drifting signal field. Mid: focusing capture rings.
 * Center: vertical signal beam with a traveling pulse. Bottom: conversion ping.
 */
const FunnelSignalVisualizer = () => {
  const ref = useRef<SVGSVGElement>(null);

  const W = 220;
  const H = 520;
  const cx = W / 2;

  // Scattered signal field (top band)
  const fieldDots = Array.from({ length: 42 }, (_, i) => {
    const seed = i * 9301 + 49297;
    const rx = ((seed % 233280) / 233280);
    const ry = (((seed * 1.7) % 233280) / 233280);
    const rs = (((seed * 2.3) % 233280) / 233280);
    return {
      id: `f-${i}`,
      x: 18 + rx * (W - 36),
      y: 20 + ry * 150,
      r: 0.8 + rs * 1.8,
      op: 0.18 + rs * 0.45,
      phase: rx * Math.PI * 2,
      speed: 0.25 + rs * 0.45,
      sway: 4 + rs * 6,
    };
  });

  // Concentric capture rings (mid)
  const rings = [
    { cy: 230, rx: 95, op: 0.22, dur: 4.2, delay: 0 },
    { cy: 280, rx: 72, op: 0.32, dur: 3.8, delay: 0.4 },
    { cy: 325, rx: 52, op: 0.42, dur: 3.4, delay: 0.8 },
    { cy: 365, rx: 32, op: 0.55, dur: 3.0, delay: 1.2 },
  ];

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const dots = svg.querySelectorAll<SVGCircleElement>('.field-dot');
    const beamPulse = svg.querySelector<SVGRectElement>('.beam-pulse');
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      dots.forEach((d) => {
        const phase = parseFloat(d.dataset.phase || '0');
        const speed = parseFloat(d.dataset.speed || '0.3');
        const sway = parseFloat(d.dataset.sway || '4');
        const baseX = parseFloat(d.dataset.bx || '0');
        const baseY = parseFloat(d.dataset.by || '0');
        const dx = Math.sin(t * speed + phase) * sway;
        const dy = ((t * speed * 8) % 30) - 15;
        d.setAttribute('cx', String(baseX + dx));
        d.setAttribute('cy', String(baseY + dy));
      });
      if (beamPulse) {
        const period = 2.4;
        const p = (t % period) / period;
        // travel from y=20 to y=420
        const y = 20 + p * 400;
        beamPulse.setAttribute('y', String(y));
        const fade = Math.sin(p * Math.PI);
        beamPulse.setAttribute('opacity', String(0.85 * fade));
      }
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
      aria-label="Signal capture funnel"
    >
      <defs>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.85" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nodeHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.45" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Center vertical beam — faint baseline */}
      <line x1={cx} y1={20} x2={cx} y2={440}
            stroke="hsl(var(--primary))" strokeOpacity="0.12" strokeWidth="1" />

      {/* Traveling pulse on the beam */}
      <rect className="beam-pulse" x={cx - 1.2} y={20} width={2.4} height={70}
            fill="url(#beamGrad)" rx={1.2} opacity={0} />

      {/* Top scattered signal field */}
      {fieldDots.map((d) => (
        <circle
          key={d.id}
          className="field-dot"
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="hsl(var(--primary))"
          opacity={d.op}
          data-phase={d.phase}
          data-speed={d.speed}
          data-sway={d.sway}
          data-bx={d.x}
          data-by={d.y}
        />
      ))}

      {/* Concentric capture rings */}
      {rings.map((r, i) => (
        <ellipse
          key={`ring-${i}`}
          cx={cx}
          cy={r.cy}
          rx={r.rx}
          ry={r.rx * 0.18}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeOpacity={r.op}
          strokeWidth={1}
        >
          <animate attributeName="ry"
                   values={`${r.rx * 0.16};${r.rx * 0.22};${r.rx * 0.16}`}
                   dur={`${r.dur}s`} begin={`${r.delay}s`} repeatCount="indefinite" />
          <animate attributeName="stroke-opacity"
                   values={`${r.op * 0.7};${r.op};${r.op * 0.7}`}
                   dur={`${r.dur}s`} begin={`${r.delay}s`} repeatCount="indefinite" />
        </ellipse>
      ))}

      {/* Conversion node halo */}
      <circle cx={cx} cy={448} r={40} fill="url(#nodeHalo)">
        <animate attributeName="r" values="34;46;34" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Conversion node ping rings */}
      <circle cx={cx} cy={448} r={6} fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.6" strokeWidth="1">
        <animate attributeName="r" values="6;24;6" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={448} r={6} fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1">
        <animate attributeName="r" values="6;24;6" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
      </circle>

      {/* Conversion node core */}
      <circle cx={cx} cy={448} r={6} fill="hsl(var(--primary))">
        <animate attributeName="r" values="5.5;7;5.5" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default FunnelSignalVisualizer;
