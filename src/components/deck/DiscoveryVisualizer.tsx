const DiscoveryVisualizer = () => {
  const cx = 200;
  const cy = 200;

  // Cascade branches — signal splitting outward like algorithmic propagation
  const branches = [
    // Level 1: initial splits from center
    { x1: cx, y1: cy, x2: cx - 60, y2: cy - 70, delay: 0 },
    { x1: cx, y1: cy, x2: cx + 70, y2: cy - 55, delay: 0.3 },
    { x1: cx, y1: cy, x2: cx + 50, y2: cy + 65, delay: 0.6 },
    { x1: cx, y1: cy, x2: cx - 55, y2: cy + 60, delay: 0.15 },
    // Level 2: further splits
    { x1: cx - 60, y1: cy - 70, x2: cx - 120, y2: cy - 100, delay: 1.2 },
    { x1: cx - 60, y1: cy - 70, x2: cx - 30, y2: cy - 130, delay: 1.5 },
    { x1: cx + 70, y1: cy - 55, x2: cx + 140, y2: cy - 90, delay: 1.0 },
    { x1: cx + 70, y1: cy - 55, x2: cx + 120, y2: cy - 20, delay: 1.4 },
    { x1: cx + 50, y1: cy + 65, x2: cx + 120, y2: cy + 100, delay: 1.3 },
    { x1: cx + 50, y1: cy + 65, x2: cx + 30, y2: cy + 130, delay: 1.7 },
    { x1: cx - 55, y1: cy + 60, x2: cx - 130, y2: cy + 85, delay: 1.1 },
    { x1: cx - 55, y1: cy + 60, x2: cx - 80, y2: cy + 130, delay: 1.6 },
    // Level 3: edge reach
    { x1: cx - 120, y1: cy - 100, x2: cx - 165, y2: cy - 140, delay: 2.2 },
    { x1: cx - 30, y1: cy - 130, x2: cx - 10, y2: cy - 170, delay: 2.5 },
    { x1: cx + 140, y1: cy - 90, x2: cx + 175, y2: cy - 130, delay: 2.0 },
    { x1: cx + 120, y1: cy - 20, x2: cx + 170, y2: cy + 10, delay: 2.4 },
    { x1: cx + 120, y1: cy + 100, x2: cx + 165, y2: cy + 135, delay: 2.3 },
    { x1: cx + 30, y1: cy + 130, x2: cx + 15, y2: cy + 170, delay: 2.6 },
    { x1: cx - 130, y1: cy + 85, x2: cx - 170, y2: cy + 110, delay: 2.1 },
    { x1: cx - 80, y1: cy + 130, x2: cx - 100, y2: cy + 168, delay: 2.7 },
  ];

  // Endpoint nodes — "people" the song reaches
  const endpoints = branches.map(b => ({ x: b.x2, y: b.y2, delay: b.delay + 0.5 }));

  // Traveling dots along each branch
  const travelDots = branches.map((b, i) => ({
    ...b,
    id: i,
  }));

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[420px] max-h-[420px]">
        <defs>
          <radialGradient id="shiftGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(195, 90%, 60%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(195, 90%, 60%)" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft background glow */}
        <circle cx={cx} cy={cy} r="90" fill="url(#shiftGlow)" />

        {/* Branch lines — drawn with dash animation to show propagation */}
        {branches.map((b, i) => {
          const len = Math.hypot(b.x2 - b.x1, b.y2 - b.y1);
          return (
            <line key={`branch-${i}`}
              x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
              stroke="hsl(195, 90%, 60%)" strokeWidth="0.7"
              strokeDasharray={len}
              strokeDashoffset={len}
              opacity="0.25">
              <animate attributeName="stroke-dashoffset" from={len} to="0"
                dur="1.5s" begin={`${b.delay}s`} fill="freeze" />
              <animate attributeName="opacity" from="0" to="0.25"
                dur="0.3s" begin={`${b.delay}s`} fill="freeze" />
            </line>
          );
        })}

        {/* Traveling signal dots along branches */}
        {travelDots.map((b) => (
          <circle key={`dot-${b.id}`} r="2" fill="hsl(195, 90%, 75%)" opacity="0" filter="url(#softGlow)">
            <animate attributeName="cx" from={b.x1} to={b.x2} dur="1.5s"
              begin={`${b.delay}s`} repeatCount="indefinite" />
            <animate attributeName="cy" from={b.y1} to={b.y2} dur="1.5s"
              begin={`${b.delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.5s"
              begin={`${b.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Endpoint nodes — people reached */}
        {endpoints.map((ep, i) => (
          <g key={`ep-${i}`}>
            <circle cx={ep.x} cy={ep.y} r="4" fill="hsl(195, 90%, 60%)" opacity="0">
              <animate attributeName="opacity" from="0" to="0.6"
                dur="0.5s" begin={`${ep.delay}s`} fill="freeze" />
            </circle>
            <circle cx={ep.x} cy={ep.y} r="1.5" fill="hsl(195, 90%, 80%)" opacity="0">
              <animate attributeName="opacity" from="0" to="0.9"
                dur="0.5s" begin={`${ep.delay}s`} fill="freeze" />
            </circle>
            {/* Subtle ping when reached */}
            <circle cx={ep.x} cy={ep.y} r="4" fill="none"
              stroke="hsl(195, 90%, 60%)" strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="4" to="18" dur="2s"
                begin={`${ep.delay + 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur="2s"
                begin={`${ep.delay + 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Center origin — the song */}
        <circle cx={cx} cy={cy} r="14" fill="hsl(195, 90%, 60%)" opacity="0.2" />
        <circle cx={cx} cy={cy} r="8" fill="hsl(195, 90%, 60%)" opacity="0.85" filter="url(#softGlow)">
          <animate attributeName="opacity" values="0.75;1;0.75" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="3" fill="hsl(222, 47%, 6%)" opacity="0.7" />
      </svg>
    </div>
  );
};

export default DiscoveryVisualizer;
