import { cn } from '@/lib/utils';

interface SystemLoopDiagramProps {
  className?: string;
  labels?: {
    inputs: string;
    engine: string;
    reporting: string;
    learnings: string;
  };
}

const defaultLabels = {
  inputs: 'Inputs',
  engine: 'Campaign Engine',
  reporting: 'Reporting',
  learnings: 'Learnings',
};

const SystemLoopDiagram = ({ className, labels = defaultLabels }: SystemLoopDiagramProps) => {
  const nodes = [
    { x: 200, y: 50, label: labels.inputs },
    { x: 350, y: 200, label: labels.engine, primary: true },
    { x: 200, y: 350, label: labels.reporting },
    { x: 50, y: 200, label: labels.learnings },
  ];

  return (
    <svg viewBox="0 0 400 400" className={cn('w-full h-full', className)}>
      <defs>
        <filter id="loopGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="loopRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="200" cy="200" r="158" fill="none" stroke="url(#loopRing)" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.4" />

      {/* Connecting arcs */}
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        return (
          <g key={`arc-${i}`}>
            <path
              d={`M ${n.x},${n.y} Q 200,200 ${next.x},${next.y}`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeDasharray="4 4"
            />
            {/* Pulse moving along path */}
            <circle r="3" fill="hsl(var(--primary))" filter="url(#loopGlow)">
              <animateMotion dur="6s" repeatCount="indefinite" begin={`${i * 1.5}s`}
                path={`M ${n.x},${n.y} Q 200,200 ${next.x},${next.y}`} />
              <animate attributeName="opacity" values="0;1;1;0" dur="6s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Central engine pulse */}
      <circle cx="200" cy="200" r="40" fill="hsl(var(--primary))" fillOpacity="0.06"
        stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3">
        <animate attributeName="r" values="38;46;38" dur="4s" repeatCount="indefinite" />
        <animate attributeName="fillOpacity" values="0.04;0.12;0.04" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="6" fill="hsl(var(--primary))" filter="url(#loopGlow)">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={`node-${i}`}>
          <circle cx={n.x} cy={n.y} r={n.primary ? 44 : 40}
            fill="hsl(var(--background))"
            stroke="hsl(var(--primary))"
            strokeWidth={n.primary ? 1.4 : 0.9}
            strokeOpacity={n.primary ? 0.7 : 0.4}
            filter="url(#loopGlow)" />
          <circle cx={n.x} cy={n.y} r={n.primary ? 44 : 40}
            fill="hsl(var(--primary))"
            fillOpacity={n.primary ? 0.12 : 0.06} />
          <text x={n.x} y={n.y + 4} textAnchor="middle"
            fontSize="12" fontWeight="700"
            fill="hsl(var(--foreground))" fillOpacity="0.92">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default SystemLoopDiagram;
