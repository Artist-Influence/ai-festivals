const ServicesVisualizer = () => {
  // Modular blocks that connect — representing bundleable services
  const blocks = [
    { x: 40, y: 30, w: 50, h: 30 },
    { x: 110, y: 30, w: 50, h: 30 },
    { x: 40, y: 80, w: 50, h: 30 },
    { x: 110, y: 80, w: 50, h: 30 },
    { x: 75, y: 130, w: 50, h: 30 },
  ];

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4],
  ];

  return (
    <svg viewBox="0 0 200 190" className="w-full h-full max-w-[280px] max-h-[220px] mx-auto">
      {/* Connection lines */}
      {connections.map(([a, b], i) => {
        const from = blocks[a];
        const to = blocks[b];
        return (
          <line
            key={`conn-${i}`}
            x1={from.x + from.w / 2} y1={from.y + from.h / 2}
            x2={to.x + to.w / 2} y2={to.y + to.h / 2}
            stroke="hsl(195, 90%, 60%)" strokeWidth="0.8" opacity="0"
          >
            <animate attributeName="opacity" values="0;0.3;0.15" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </line>
        );
      })}

      {/* Module blocks */}
      {blocks.map((b, i) => (
        <g key={`block-${i}`}>
          <rect
            x={b.x} y={b.y} width={b.w} height={b.h} rx="6"
            fill="hsl(195, 90%, 60%)" opacity="0"
          >
            <animate attributeName="opacity" values="0;0.15;0.08" dur="3s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </rect>
          <rect
            x={b.x} y={b.y} width={b.w} height={b.h} rx="6"
            fill="none" stroke="hsl(195, 90%, 60%)" strokeWidth="1" opacity="0"
          >
            <animate attributeName="opacity" values="0;0.5;0.25" dur="3s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </rect>
          {/* Inner detail lines */}
          <line x1={b.x + 8} y1={b.y + 10} x2={b.x + b.w - 8} y2={b.y + 10}
            stroke="hsl(195, 90%, 60%)" strokeWidth="1.5" opacity="0">
            <animate attributeName="opacity" values="0;0.4;0.2" dur="3s" begin={`${i * 0.2 + 0.1}s`} repeatCount="indefinite" />
          </line>
          <line x1={b.x + 8} y1={b.y + 18} x2={b.x + b.w * 0.6} y2={b.y + 18}
            stroke="hsl(195, 90%, 60%)" strokeWidth="1" opacity="0">
            <animate attributeName="opacity" values="0;0.25;0.12" dur="3s" begin={`${i * 0.2 + 0.2}s`} repeatCount="indefinite" />
          </line>
        </g>
      ))}

      {/* Pulse at center */}
      <circle cx="100" cy="95" r="4" fill="hsl(195, 90%, 60%)" opacity="0.5">
        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default ServicesVisualizer;
