import { useRef, useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScaledSlideProps {
  children: ReactNode;
  className?: string;
  isMobile?: boolean;
  forceFullSize?: boolean;
}

const ScaledSlide = ({ children, className, isMobile = false, forceFullSize = false }: ScaledSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    if (isMobile || forceFullSize) return; // No scaling needed
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile, forceFullSize]);

  // Mobile: render as a normal responsive page that fills its container.
  // Parent (mobile pager) provides h-dvh + vertical scroll, so we just need
  // to make sure the slide background covers the full panel.
  if (isMobile) {
    return (
      <div className={cn('slide-content-m w-full min-h-full bg-background', className)}>
        {children}
      </div>
    );
  }

  // Force full size: render at native 1920x1080 with no scaling/clipping (for PDF export)
  if (forceFullSize) {
    return (
      <div
        id="export-capture"
        className={cn('slide-content', className)}
        style={{
          width: 1920,
          height: 1080,
          position: 'relative',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full overflow-hidden', className)}
    >
      <div
        className="slide-content"
        style={{
          width: 1920,
          height: 1080,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScaledSlide;
