import GlassPanel from '../GlassPanel';
import AtelierFieldVisual from '../visuals/AtelierFieldVisual';
import { useTranslation } from '@/i18n/LanguageContext';

const HubDiagram = () => {
  const nodes = [
    { label: ['Your', 'Event'], cx: 300, cy: 260, r: 72, primary: true },
    { label: ['Short-form', 'Content'], cx: 470, cy: 90, r: 54, primary: false },
    { label: ['Local', 'Culture'], cx: 95, cy: 170, r: 54, primary: false },
    { label: ['Ticketing', 'Platforms'], cx: 130, cy: 430, r: 54, primary: false },
    { label: ['Retargeting'], cx: 470, cy: 430, r: 54, primary: false },
    { label: ['Creators'], cx: 300, cy: 70, r: 50, primary: false },
  ];

  const connections = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]];

  return (
    <svg viewBox="0 0 560 540" className="w-[480px] h-[480px]">
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={nodes[0].cx} cy={nodes[0].cy} r="140" fill="url(#centerGlow)" />
      {connections.map(([a, b], i) => (
        <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.25" />
      ))}
      {nodes.slice(1).map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r}
            fill="hsl(var(--primary))" fillOpacity="0.06"
            stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
          {n.label.length > 1 ? (
            <>
              <text x={n.cx} y={n.cy - 4} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="15" fontWeight="500" opacity="0.9">{n.label[0]}</text>
              <text x={n.cx} y={n.cy + 14} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="13" fontWeight="400" opacity="0.65">{n.label[1]}</text>
            </>
          ) : (
            <text x={n.cx} y={n.cy + 4} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="500" opacity="0.85">{n.label[0]}</text>
          )}
        </g>
      ))}
      <circle cx={nodes[0].cx} cy={nodes[0].cy} r={nodes[0].r}
        fill="hsl(var(--primary))" fillOpacity="0.12"
        stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.5"
        filter="url(#softGlow)" />
      <text x={nodes[0].cx} y={nodes[0].cy - 8} textAnchor="middle" fill="hsl(var(--primary))" fontSize="22" fontWeight="700">Your</text>
      <text x={nodes[0].cx} y={nodes[0].cy + 18} textAnchor="middle" fill="hsl(var(--primary))" fontSize="22" fontWeight="700">Event</text>
      <circle cx={nodes[0].cx} cy={nodes[0].cy} r="180" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 6">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${nodes[0].cx} ${nodes[0].cy}`} to={`360 ${nodes[0].cx} ${nodes[0].cy}`} dur="60s" repeatCount="indefinite" />
      </circle>
      {connections.map(([a, b], i) => (
        <circle key={`pulse-${i}`} r="3" fill="hsl(var(--primary))" filter="url(#softGlow)">
          <animate attributeName="cx" values={`${nodes[a].cx};${nodes[b].cx};${nodes[a].cx}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values={`${nodes[a].cy};${nodes[b].cy};${nodes[a].cy}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.7;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
};

const WhatCloutedDoesSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden p-5 md:p-24 flex items-start md:items-center justify-start md:justify-center">
      <AtelierFieldVisual variant="corner" />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-16 items-start w-full max-w-[1600px]">
        <div className="flex-1 max-w-[700px]">
          <h1 className="text-xl md:text-5xl font-bold text-on-visual mb-4 md:mb-8 leading-tight md:whitespace-nowrap">
            {t('whatWeDo.title')}
          </h1>
          <p className="text-sm md:text-[21px] text-primary text-on-visual-accent font-medium mb-4 md:mb-8 tracking-wider uppercase">{t('whatWeDo.section')}</p>
          <div className="space-y-3 md:space-y-4">
            {[0, 1, 2].map((i) => (
              <GlassPanel key={i} variant="subtle" className="p-5 md:p-7 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-12">
                <span className="text-primary font-semibold text-sm md:text-[21px] shrink-0 md:w-40">{t(`whatWeDo.pillar.${i}.label`)}</span>
                <p className="text-sm md:text-[21px] text-muted-foreground">{t(`whatWeDo.pillar.${i}.desc`)}</p>
              </GlassPanel>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-1 items-start justify-center mt-[120px]">
          <HubDiagram />
        </div>
      </div>
    </div>
  );
};

export default WhatCloutedDoesSlide;
