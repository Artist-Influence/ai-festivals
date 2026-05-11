const BrokenSystemVisualizer = () => {
  const cx = 200;
  const cy = 200;

  // Disconnected clusters — isolated silos that don't connect
  const clusters = [
    // Cluster A — top-left
    { nodes: [{ x: 75, y: 70 }, { x: 110, y: 55 }, { x: 95, y: 105 }, { x: 130, y: 90 }] },
    // Cluster B — top-right
    { nodes: [{ x: 280, y: 65 }, { x: 315, y: 80 }, { x: 295, y: 110 }] },
    // Cluster C — bottom-left
    { nodes: [{ x: 60, y: 280 }, { x: 95, y: 295 }, { x: 80, y: 330 }, { x: 115, y: 315 }] },
    // Cluster D — bottom-right
    { nodes: [{ x: 290, y: 290 }, { x: 325, y: 310 }, { x: 305, y: 340 }] },
    // Cluster E — center-right (drifting)
    { nodes: [{ x: 330, y: 185 }, { x: 355, y: 200 }] },
  ];

  // Broken connections between clusters — dashed, fading, incomplete
  const brokenLinks = [
    { x1: 130, y1: 90, x2: 280, y2: 65 },
    { x1: 95, y1: 105, x2: 60, y2: 280 },
    { x1: 315, y1: 80, x2: 330, y2: 185 },
    { x1: 290, y1: 290, x2: 115, y2: 315 },
    { x1: 325, y1: 310, x2: 355, y2: 200 },
    { x1: 110, y1: 55, x2: 200, y2: 170 },
  ];

  // Scattered solo nodes — things that don't belong anywhere
  const strayNodes = [
    { x: 200, y: 170, size: 3 },
    { x: 175, y: 220, size: 2.5 },
    { x: 230, y: 240, size: 2 },
    { x: 155, y: 160, size: 2 },
    { x: 245, y: 175, size: 2.5 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[420px] max-h-[420px]">
        <defs>
          <filter id="brokenGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Broken inter-cluster links — dashed, flickering */}
        {brokenLinks.map((link, i) => {
          const len = Math.hypot(link.x2 - link.x1, link.y2 - link.y1);
          // Only draw part of the line (broken/incomplete)
          const midX = (link.x1 + link.x2) / 2 + (i % 2 === 0 ? -15 : 15);
          const midY = (link.y1 + link.y2) / 2 + (i % 2 === 0 ? 10 : -10);
          return (
            <g key={`broken-${i}`}>
              {/* First half — fades out */}
              <line x1={link.x1} y1={link.y1} x2={midX} y2={midY}
                stroke="hsl(0, 60%, 55%)" strokeWidth="0.6"
                strokeDasharray="4 6" opacity="0.15">
                <animate attributeName="opacity" values="0.1;0.25;0.1" dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite" />
              </line>
              {/* Gap — nothing drawn */}
              {/* Second half — also faint */}
              <line x1={midX + (link.x2 - midX) * 0.3} y1={midY + (link.y2 - midY) * 0.3}
                x2={link.x2} y2={link.y2}
                stroke="hsl(0, 60%, 55%)" strokeWidth="0.5"
                strokeDasharray="3 8" opacity="0.1">
                <animate attributeName="opacity" values="0.05;0.18;0.05" dur={`${4 + i * 0.3}s`}
                  begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </line>
            </g>
          );
        })}

        {/* Intra-cluster connections — these work but are isolated */}
        {clusters.map((cluster, ci) =>
          cluster.nodes.map((n1, i) =>
            cluster.nodes.slice(i + 1).map((n2, j) => (
              <line key={`intra-${ci}-${i}-${j}`}
                x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                stroke="hsl(195, 90%, 60%)" strokeWidth="0.5" opacity="0.12" />
            ))
          )
        )}

        {/* Cluster nodes */}
        {clusters.map((cluster, ci) =>
          cluster.nodes.map((node, ni) => (
            <g key={`node-${ci}-${ni}`}>
              <circle cx={node.x} cy={node.y} r="4" fill="hsl(195, 90%, 60%)" opacity="0.3">
                <animate attributeName="opacity" values="0.2;0.45;0.2"
                  dur={`${3 + (ci + ni) % 3}s`} begin={`${ni * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={node.x} cy={node.y} r="1.8" fill="hsl(195, 90%, 70%)" opacity="0.7" />
            </g>
          ))
        )}

        {/* Stray disconnected nodes — floating, unlinked */}
        {strayNodes.map((node, i) => (
          <g key={`stray-${i}`}>
            <circle cx={node.x} cy={node.y} r={node.size} fill="hsl(195, 90%, 60%)" opacity="0.15">
              <animate attributeName="opacity" values="0.1;0.3;0.1"
                dur={`${4 + i}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={node.x} cy={node.y} r={node.size * 0.4} fill="hsl(195, 90%, 60%)" opacity="0.4" />
            {/* Subtle drift */}
            <animateTransform attributeName="transform" type="translate"
              values={`0,0; ${(i % 2 === 0 ? 3 : -3)},${(i % 3 === 0 ? -2 : 2)}; 0,0`}
              dur={`${6 + i}s`} repeatCount="indefinite" />
          </g>
        ))}

        {/* "Error" flicker dots — representing failure/confusion */}
        {[
          { x: 185, y: 195 }, { x: 215, y: 205 }, { x: 200, y: 185 },
        ].map((dot, i) => (
          <circle key={`err-${i}`} cx={dot.x} cy={dot.y} r="1.5"
            fill="hsl(0, 60%, 55%)" opacity="0">
            <animate attributeName="opacity" values="0;0.5;0;0;0.3;0"
              dur={`${2.5 + i * 0.7}s`} begin={`${i * 1.2}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default BrokenSystemVisualizer;
