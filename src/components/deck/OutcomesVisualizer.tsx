import { useEffect, useRef } from 'react';

const OutcomesVisualizer = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate particles rising using requestAnimationFrame
    const svg = ref.current;
    if (!svg) return;
    const particles = svg.querySelectorAll<SVGCircleElement>('.rising-particle');
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      particles.forEach((p) => {
        const speed = parseFloat(p.dataset.speed || '40');
        const startY = parseFloat(p.dataset.startY || '500');
        const range = 520;
        const y = ((startY - elapsed * speed) % range + range) % range + 10;
        p.setAttribute('cy', String(y));
        // Fade near edges
        const opacity = y < 60 ? y / 60 : y > 470 ? (530 - y) / 60 : 1;
        p.setAttribute('opacity', String(Math.max(0, Math.min(opacity * parseFloat(p.dataset.maxOpacity || '0.5'), 1))));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Generate streams of particles in vertical lanes
  const lanes = [
    { cx: 30, count: 8, speed: 35, r: 3, opacity: 0.3 },
    { cx: 55, count: 10, speed: 50, r: 4, opacity: 0.5 },
    { cx: 80, count: 12, speed: 65, r: 5, opacity: 0.7 },
    { cx: 105, count: 10, speed: 55, r: 4, opacity: 0.5 },
    { cx: 130, count: 7, speed: 40, r: 3, opacity: 0.35 },
  ];

  const particles = lanes.flatMap((lane, li) =>
    Array.from({ length: lane.count }, (_, i) => ({
      cx: lane.cx + (Math.sin(i * 2.3) * 8),
      startY: (i * (520 / lane.count)) + (li * 13) % 40,
      speed: lane.speed + (i % 3) * 5,
      r: lane.r - (i % 2) * 0.8,
      maxOpacity: lane.opacity,
      key: `${li}-${i}`,
    }))
  );

  return (
    <svg ref={ref} viewBox="0 0 160 530" className="h-full w-auto max-h-[580px]" preserveAspectRatio="xMidYMid meet">
      {/* Vertical guide lines */}
      {lanes.map((lane, i) => (
        <line key={`guide-${i}`} x1={lane.cx} y1="0" x2={lane.cx} y2="530"
          stroke="hsl(195, 90%, 60%)" strokeWidth="0.5" opacity="0.06" />
      ))}

      {/* Rising connector arcs between lanes */}
      {[0, 1, 2, 3].map(i => (
        <path key={`arc-${i}`}
          d={`M${lanes[i].cx},${200 + i * 60} Q${(lanes[i].cx + lanes[i + 1].cx) / 2},${180 + i * 60} ${lanes[i + 1].cx},${190 + i * 60}`}
          fill="none" stroke="hsl(195, 90%, 60%)" strokeWidth="0.6" opacity="0">
          <animate attributeName="opacity" values="0;0.2;0" dur="3s"
            begin={`${i * 0.5}s`} repeatCount="indefinite" />
        </path>
      ))}

      {/* Particles */}
      {particles.map(p => (
        <circle key={p.key} className="rising-particle"
          cx={p.cx} cy={p.startY} r={p.r}
          fill="hsl(195, 90%, 60%)" opacity="0"
          data-speed={p.speed} data-start-y={p.startY} data-max-opacity={p.maxOpacity}
        />
      ))}

      {/* Glow at top — destination */}
      <ellipse cx="80" cy="25" rx="50" ry="15" fill="hsl(195, 90%, 60%)" opacity="0.06">
        <animate attributeName="opacity" values="0.04;0.1;0.04" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="80" cy="25" r="5" fill="hsl(195, 90%, 60%)" opacity="0.4">
        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default OutcomesVisualizer;
