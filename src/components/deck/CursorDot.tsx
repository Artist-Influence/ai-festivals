import { useEffect, useRef } from 'react';

/**
 * Small red dot that trails the cursor, the signature pointer treatment on
 * www.artistinfluence.com. Fine-pointer + non-reduced-motion only; on touch or
 * reduced-motion it renders nothing meaningful (CSS also hides `.cursor-dot`).
 */
const CursorDot = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const dot = ref.current;
    if (!dot) return;

    const move = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.opacity = '1';
    };
    const hide = () => {
      dot.style.opacity = '0';
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseout', hide);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseout', hide);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
};

export default CursorDot;
