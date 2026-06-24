import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bright' | 'subtle';
  noShimmer?: boolean;
  noCorner?: boolean;
  /** Disable the pointer-driven 3D tilt (e.g. for dense/secondary cards). */
  noTilt?: boolean;
}

const variantStyles = {
  default:
    'bg-white/[0.05] shadow-[inset_0_1px_0_hsl(var(--foreground)/0.09),0_20px_50px_-12px_hsl(225_45%_1%/0.65),0_0_44px_hsl(var(--primary)/0.07)]',
  bright:
    'bg-primary/[0.09] shadow-[inset_0_1px_0_hsl(var(--foreground)/0.12),0_22px_55px_-12px_hsl(225_45%_1%/0.7),0_0_52px_hsl(var(--primary)/0.16)]',
  subtle: 'bg-white/[0.03] shadow-[inset_0_1px_0_hsl(var(--foreground)/0.05),0_12px_32px_-12px_hsl(225_45%_1%/0.5)]',
};

const variantBorder = {
  default:
    'linear-gradient(135deg, hsl(var(--primary)/0.35), hsl(0 0% 100% / 0.10) 45%, transparent 75%)',
  bright:
    'linear-gradient(135deg, hsl(var(--primary)/0.55), hsl(var(--primary)/0.18) 45%, hsl(0 0% 100% / 0.08) 80%)',
  subtle:
    'linear-gradient(135deg, hsl(0 0% 100% / 0.12), hsl(0 0% 100% / 0.04) 50%, transparent 80%)',
};

const GlassPanel = ({
  children,
  className,
  variant = 'default',
  noShimmer,
  noCorner,
  noTilt,
}: GlassPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const showShimmer = !noShimmer && variant !== 'subtle';
  const showCorner = !noCorner && variant !== 'subtle';

  useEffect(() => {
    if (!showShimmer || !ref.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.4) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: [0, 0.4, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [showShimmer]);

  // Pointer-driven 3D tilt. Reads screen-space pointer position against the
  // card rect, so it stays correct even inside the scaled slide canvas.
  useEffect(() => {
    if (noTilt || !ref.current) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    const el = ref.current;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add('tilting');
      el.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-2px)`;
    };
    const onLeave = () => {
      el.classList.remove('tilting');
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [noTilt]);

  return (
    <div
      ref={ref}
      className={cn(
        'gp-card relative isolate overflow-hidden rounded-2xl backdrop-blur-xl',
        variantStyles[variant],
        inView && 'gp-in-view',
        className
      )}
      style={
        {
          // expose variant border gradient to ::before via CSS var
          ['--gp-border' as string]: variantBorder[variant],
        } as React.CSSProperties
      }
    >
      <style>{`
        .gp-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: var(--gp-border);
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .gp-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            115deg,
            transparent 40%,
            hsl(var(--primary) / 0.10) 50%,
            transparent 60%
          );
          transform: translateX(-120%);
          pointer-events: none;
          opacity: 0;
          z-index: 2;
        }
        .gp-card.gp-in-view::after {
          animation: gp-shimmer 1.4s ease-out forwards;
        }
        @keyframes gp-shimmer {
          0%   { transform: translateX(-120%); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gp-card.gp-in-view::after { animation: none; }
        }
      `}</style>

      {showCorner && (
        <svg
          aria-hidden
          className="absolute top-2 right-2 w-3.5 h-3.5 z-[3] pointer-events-none"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M2 2 H12 M12 2 V12"
            stroke="hsl(var(--primary) / 0.55)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      )}

      <div className="relative z-[2] h-full flex flex-col">{children}</div>
    </div>
  );
};

export default GlassPanel;
