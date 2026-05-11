import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';

const cityBudgets = [
  { city: 'Toronto', budget: '$2,282.27' },
  { city: 'Austin', budget: '$2,356.38' },
  { city: 'Dallas', budget: '$2,351.79' },
  { city: 'Miami', budget: '$778.09' },
  { city: 'NYC', budget: '$781.34' },
  { city: 'LA', budget: '$786.13' },
];

const FinalPushStrategySlide = () => {
  const { t } = useTranslation();
  const points = [0, 1, 2, 3, 4, 5];

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden py-3 px-3 md:p-16 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 md:mb-5 rounded-full border border-primary/40 bg-primary/[0.08]">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[10px] md:text-xs text-primary font-mono tracking-[0.25em] uppercase">{t('finalPush.kicker')}</p>
        </div>

        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4 leading-tight">{t('finalPush.title')}</h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-4 md:mb-8 max-w-[1100px]">{t('finalPush.subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-6">
          <GlassPanel variant="bright" className="p-5 md:p-7">
            <p className="text-xs md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-5">{t('finalPush.body')}</p>
            <div className="space-y-1.5 md:space-y-2.5">
              {points.map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2" />
                  <p className="text-xs md:text-base text-foreground">{t(`finalPush.point.${i}`)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel variant="bright" className="p-5 md:p-7">
            <p className="text-sm md:text-xl font-semibold text-primary mb-3 md:mb-4">{t('finalPush.budgetTitle')}</p>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {cityBudgets.map((c) => (
                <div key={c.city} className="bg-white/[0.04] border border-white/[0.06] rounded-md p-2.5 md:p-3">
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">{c.city}</p>
                  <p className="text-sm md:text-xl font-bold text-foreground">{c.budget}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <GlassPanel variant="subtle" className="p-3 md:p-5">
          <p className="text-xs md:text-lg text-muted-foreground text-center">{t('finalPush.footer')}</p>
        </GlassPanel>
      </div>
    </div>
  );
};

export default FinalPushStrategySlide;
