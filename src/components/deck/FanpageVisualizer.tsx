import { useEffect, useRef } from 'react';

const FanpageVisualizer = () => {
  const refs = useRef<(SVGGElement | null)[]>([]);

  const feeds = [
    { y: 4, speed: 30, cards: 6 },
    { y: 32, speed: 24, cards: 5 },
  ];

  const cardW = 70;
  const gap = 12;
  const cardH = 22;

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      feeds.forEach((feed, i) => {
        const totalW = feed.cards * (cardW + gap);
        const offset = (elapsed * feed.speed) % totalW;
        refs.current[i]?.setAttribute('transform', `translate(${-offset}, 0)`);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 500 56" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="fpClip">
            <rect x="0" y="0" width="500" height="56" />
          </clipPath>
          <linearGradient id="fpFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(222, 47%, 6%)" stopOpacity="1" />
            <stop offset="8%" stopColor="hsl(222, 47%, 6%)" stopOpacity="0" />
            <stop offset="92%" stopColor="hsl(222, 47%, 6%)" stopOpacity="0" />
            <stop offset="100%" stopColor="hsl(222, 47%, 6%)" stopOpacity="1" />
          </linearGradient>
        </defs>

        <g clipPath="url(#fpClip)">
          {feeds.map((feed, fi) => {
            const totalW = feed.cards * (cardW + gap);
            return (
              <g key={fi} ref={el => { refs.current[fi] = el; }}>
                {[0, 1].map(loop =>
                  Array.from({ length: feed.cards }, (_, ci) => {
                    const x = loop * totalW + ci * (cardW + gap);
                    const variant = (fi + ci) % 3;
                    return (
                      <g key={`${loop}-${ci}`}>
                        <rect x={x} y={feed.y} width={cardW} height={cardH} rx="3"
                          fill="hsl(195, 90%, 60%)" opacity="0.12"
                          stroke="hsl(195, 90%, 60%)" strokeWidth="0.8" strokeOpacity="0.3">
                          <animate attributeName="opacity" values="0.08;0.18;0.08"
                            dur={`${3 + ci * 0.5}s`} begin={`${fi * 0.6 + ci * 0.3}s`}
                            repeatCount="indefinite" />
                        </rect>

                        {variant === 0 && (
                          <rect x={x + 4} y={feed.y + 4} width="28" height="14" rx="2"
                            fill="hsl(195, 90%, 60%)" opacity="0.2" />
                        )}
                        {variant === 1 && (
                          <>
                            <rect x={x + 4} y={feed.y + 4} width="12" height="14" rx="2"
                              fill="hsl(195, 90%, 60%)" opacity="0.18" />
                            <rect x={x + 18} y={feed.y + 4} width="20" height="6" rx="1.5"
                              fill="hsl(195, 90%, 60%)" opacity="0.14" />
                            <rect x={x + 18} y={feed.y + 12} width="16" height="6" rx="1.5"
                              fill="hsl(195, 90%, 60%)" opacity="0.14" />
                          </>
                        )}
                        {variant === 2 && (
                          <circle cx={x + 35} cy={feed.y + 11} r="7"
                            fill="hsl(195, 90%, 60%)" opacity="0.18" />
                        )}

                        {/* activity dot */}
                        <circle cx={x + cardW - 6} cy={feed.y + cardH - 5} r="2"
                          fill="hsl(150, 60%, 50%)" opacity="0">
                          <animate attributeName="opacity" values="0;0.6;0"
                            dur={`${2.5 + ci * 0.4}s`} begin={`${fi * 0.5 + ci * 0.3}s`}
                            repeatCount="indefinite" />
                        </circle>
                      </g>
                    );
                  })
                )}
              </g>
            );
          })}
        </g>

        <rect x="0" y="0" width="500" height="56" fill="url(#fpFade)" pointerEvents="none" />
      </svg>
    </div>
  );
};

export default FanpageVisualizer;
