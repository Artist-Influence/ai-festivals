import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';

const TicketFunnelSlide = () => {
  const { t } = useTranslation();
  const stages = [0, 1, 2, 3, 4];
  // Funnel widths (descending)
  const widths = [100, 86, 72, 58, 44];

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
          {/* Funnel visual */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-3">
            {stages.map((i) => (
              <div
                key={i}
                style={{ width: `${widths[i]}%` }}
                className="relative h-12 md:h-16 rounded-md border border-primary/30 bg-gradient-to-r from-primary/[0.08] via-primary/[0.18] to-primary/[0.08] flex items-center justify-center"
              >
                <span className="text-xs md:text-base text-primary font-mono tracking-widest uppercase">
                  0{i + 1} · {t(`funnel.stage.${i}.label`)}
                </span>
              </div>
            ))}
          </div>

          {/* Stage descriptions */}
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
        </div>

        <GlassPanel variant="subtle" className="mt-4 md:mt-8 p-3 md:p-5">
          <p className="text-xs md:text-lg text-muted-foreground text-center">{t('funnel.footer')}</p>
        </GlassPanel>
      </div>
    </div>
  );
};

export default TicketFunnelSlide;
