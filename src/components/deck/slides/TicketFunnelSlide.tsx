import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';

const TicketFunnelSlide = () => {
  const { t } = useTranslation();
  const stages = [0, 1, 2, 3, 4];

  // Funnel geometry (SVG viewBox 400 x 520)
  const vbW = 400;
  const vbH = 520;
  const topW = 360;
  const bottomW = 120;
  const bandH = vbH / stages.length;

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden p-5 md:p-16 flex flex-col justify-start md:justify-center">
      <PatternVisual />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <p className="text-xs md:text-sm text-primary font-medium tracking-[0.25em] uppercase mb-2 md:mb-4">Ticket Sales Funnel</p>
        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4 leading-tight">
          {t('funnel.title')}
        </h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-6 md:mb-10 max-w-[1100px]">{t('funnel.subtitle')}</p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-stretch">
          {/* Stage descriptions — now on the LEFT */}
          <div className="flex-1 flex flex-col gap-2 md:gap-3">
            {stages.map((i) => (
              <GlassPanel key={i} variant="subtle" className="p-3 md:p-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-primary font-mono text-xs md:text-base tracking-widest shrink-0 w-20 md:w-32">{t(`funnel.stage.${i}.label`)}</span>
                  <p className="text-xs md:text-base text-muted-foreground leading-relaxed">{t(`funnel.stage.${i}.desc`)}</p>
                </div>
              </GlassPanel>
            ))}
          </div>

          {/* Funnel visualizer — now on the RIGHT (desktop only) */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <svg
              viewBox={`0 0 ${vbW} ${vbH}`}
              className="w-full max-w-[460px] h-auto"
              role="img"
              aria-label="Ticket sales funnel visualization"
            >
              <defs>
                <linearGradient id="funnelBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
                  <stop offset="100%" stopColor="hsl(var(--primary) / 0.28)" />
                </linearGradient>
              </defs>

              {stages.map((i) => {
                const yTop = i * bandH;
                const yBot = (i + 1) * bandH;
                const wTop = topW - ((topW - bottomW) * i) / stages.length;
                const wBot = topW - ((topW - bottomW) * (i + 1)) / stages.length;
                const cx = vbW / 2;
                const points = [
                  `${cx - wTop / 2},${yTop}`,
                  `${cx + wTop / 2},${yTop}`,
                  `${cx + wBot / 2},${yBot}`,
                  `${cx - wBot / 2},${yBot}`,
                ].join(' ');

                const labelY = yTop + bandH / 2;
                const tickX = cx + wTop / 2;
                const tickXEnd = vbW - 4;

                return (
                  <g key={i}>
                    <polygon
                      points={points}
                      fill="url(#funnelBand)"
                      stroke="hsl(var(--primary) / 0.45)"
                      strokeWidth="1"
                    />
                    {/* Connector tick on the right edge */}
                    <line
                      x1={tickX}
                      y1={labelY}
                      x2={tickXEnd}
                      y2={labelY}
                      stroke="hsl(var(--primary) / 0.35)"
                      strokeWidth="0.75"
                      strokeDasharray="2 3"
                    />
                    <circle cx={tickXEnd} cy={labelY} r="2" fill="hsl(var(--primary))" />

                    {/* Index inside the band */}
                    <text
                      x={cx}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-primary"
                      style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        fontSize: 11,
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {`0${i + 1} · ${t(`funnel.stage.${i}.label`)}`}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <GlassPanel variant="subtle" className="mt-4 md:mt-8 p-3 md:p-5">
          <p className="text-xs md:text-lg text-muted-foreground text-center">{t('funnel.footer')}</p>
        </GlassPanel>
      </div>
    </div>
  );
};

export default TicketFunnelSlide;
