import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import FunnelSignalVisualizer from '../FunnelSignalVisualizer';
import { useTranslation } from '@/i18n/LanguageContext';

const TicketFunnelSlide = () => {
  const { t } = useTranslation();
  const stages = [0, 1, 2, 3, 4];

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden p-5 md:p-16 flex flex-col justify-start md:justify-center">
      <PatternVisual />

      <div className="relative z-10 w-full max-w-[1750px] mx-auto">
        <p className="text-xs md:text-sm text-primary font-medium tracking-[0.25em] uppercase mb-2 md:mb-4">Ticket Sales Funnel</p>
        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4 leading-tight">
          {t('funnel.title')}
        </h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-6 md:mb-10 max-w-[1100px]">{t('funnel.subtitle')}</p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-stretch">
          {/* Stage descriptions — primary content on the LEFT */}
          <div className="flex-1 md:max-w-[900px] flex flex-col gap-2 md:gap-5">
            {stages.map((i) => (
              <GlassPanel key={i} variant="subtle" className="p-3 md:p-6">
                <div className="flex items-start gap-3 md:gap-6">
                  <span className="text-primary font-mono text-xs md:text-xl tracking-widest shrink-0 w-20 md:w-40">{t(`funnel.stage.${i}.label`)}</span>
                  <p className="text-xs md:text-2xl text-muted-foreground leading-relaxed">{t(`funnel.stage.${i}.desc`)}</p>
                </div>
              </GlassPanel>
            ))}
          </div>

          {/* Abstract funnel signal — accent on the RIGHT (desktop only) */}
          <div className="hidden md:flex md:w-[480px] relative items-center justify-center">
            <div className="absolute inset-0 m-auto w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <FunnelSignalVisualizer />
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
