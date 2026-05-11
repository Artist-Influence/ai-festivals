import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface NetworkVisualProps {
  nodeCount?: number;
  className?: string;
  seed?: number;
}

const NetworkVisual = ({ nodeCount = 40, className, seed = 1 }: NetworkVisualProps) => {
  const { nodes, edges } = useMemo(() => {
    const n = Array.from({ length: nodeCount }, (_, i) => ({
      x: ((i * 317 * seed + 127) % 1720) + 100,
      y: ((i * 523 * seed + 89) % 880) + 100,
      r: 1.5 + (i % 4),
    }));
    const e: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    for (let i = 0; i < n.length; i++) {
      for (let j = i + 1; j < n.length; j++) {
        const d = Math.hypot(n[i].x - n[j].x, n[i].y - n[j].y);
        if (d < 200) e.push({ x1: n[i].x, y1: n[i].y, x2: n[j].x, y2: n[j].y });
      }
    }
    return { nodes: n, edges: e };
  }, [nodeCount, seed]);

  return (
    <svg className={cn('absolute inset-0 w-full h-full', className)} viewBox="0 0 1920 1080" fill="none">
      {edges.map((edge, i) => (
        <line key={`e${i}`} x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2}
          stroke="hsl(195, 90%, 60%)" strokeWidth="0.5" opacity="0.12" />
      ))}
      {nodes.map((n, i) => (
        <circle key={`n${i}`} cx={n.x} cy={n.y} r={n.r}
          fill="hsl(195, 90%, 60%)" opacity={0.25 + (i % 3) * 0.15} />
      ))}
    </svg>
  );
};

export default NetworkVisual;
