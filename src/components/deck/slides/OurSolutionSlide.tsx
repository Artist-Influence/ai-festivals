import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { Users, Scissors, Megaphone, Zap } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

const icons = [Users, Scissors, Megaphone, Zap];

const OurSolutionSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden pt-14 pb-8 px-5 md:p-20 flex flex-col justify-start md:justify-center">
      <PatternVisual />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <p className="text-xs md:text-sm text-primary font-medium tracking-[0.25em] uppercase mb-2 md:mb-4">Our Solution</p>
        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4 leading-tight">
          {t('solution.title')}
        </h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-6 md:mb-12 max-w-[1100px]">
          {t('solution.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {icons.map((Icon, i) => (
            <GlassPanel key={i} variant="bright" className="p-5 md:p-8">
              <div className="flex items-start gap-4 md:gap-5">
                <div className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center bg-primary/[0.12] border border-primary/30">
                  <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2">{t(`solution.card.${i}.label`)}</p>
                  <p className="text-xs md:text-lg text-muted-foreground leading-relaxed">{t(`solution.card.${i}.desc`)}</p>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel variant="subtle" className="mt-4 md:mt-8 p-3 md:p-5">
          <p className="text-xs md:text-lg text-muted-foreground text-center">{t('solution.footer')}</p>
        </GlassPanel>
      </div>
    </div>
  );
};

export default OurSolutionSlide;
