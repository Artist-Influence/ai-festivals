import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';

const TheProblemSlide = () => {
  const { t } = useTranslation();
  const cards = [0, 1, 2, 3];

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden pt-14 pb-8 px-5 md:p-20 flex flex-col justify-start md:justify-center">
      <PatternVisual />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <p className="text-xs md:text-sm text-primary font-medium tracking-[0.25em] uppercase mb-2 md:mb-4">The Problem</p>
        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4 leading-tight max-w-[1300px]">
          {t('problem.title')}
        </h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-6 md:mb-12 max-w-[1100px]">
          {t('problem.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {cards.map((i) => (
            <GlassPanel key={i} variant="bright" className="p-5 md:p-8">
              <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t(`problem.card.${i}.label`)}</p>
              <p className="text-xs md:text-xl text-muted-foreground leading-relaxed">{t(`problem.card.${i}.desc`)}</p>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel variant="subtle" className="mt-4 md:mt-8 p-3 md:p-5">
          <p className="text-xs md:text-lg text-muted-foreground leading-relaxed text-center">{t('problem.footer')}</p>
        </GlassPanel>
      </div>
    </div>
  );
};

export default TheProblemSlide;
