import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { Check, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

const WhatWeNeedSlide = () => {
  const { t } = useTranslation();
  const required = Array.from({ length: 11 }, (_, i) => i);
  const recommended = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden p-5 md:p-16 flex flex-col justify-start md:justify-center">
      <PatternVisual />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <p className="t-eyebrow text-xs md:text-sm mb-2 md:mb-4">{t('need.kicker')}</p>
        <h1 className="t-hero text-2xl md:text-6xl text-on-visual mb-6 md:mb-10">{t('need.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          <GlassPanel variant="bright" className="p-5 md:p-8">
            <p className="t-h3 text-sm md:text-2xl text-primary mb-3 md:mb-5">{t('need.requiredTitle')}</p>
            <div className="space-y-1.5 md:space-y-2">
              {required.map((i) => (
                <div key={i} className="flex items-start gap-2 md:gap-3">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-primary shrink-0 mt-1 md:mt-1.5" />
                  <p className="text-sm md:text-lg text-foreground">{t(`need.required.${i}`)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel variant="bright" className="p-5 md:p-8">
            <p className="t-h3 text-sm md:text-2xl text-primary mb-3 md:mb-5">{t('need.recommendedTitle')}</p>
            <div className="space-y-1.5 md:space-y-2">
              {recommended.map((i) => (
                <div key={i} className="flex items-start gap-2 md:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2.5" />
                  <p className="text-sm md:text-lg text-foreground">{t(`need.recommended.${i}`)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <GlassPanel variant="subtle" className="p-3 md:p-5 border border-primary/20">
          <div className="flex items-start gap-2 md:gap-3">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs md:text-base text-muted-foreground leading-relaxed">{t('need.callout')}</p>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};

export default WhatWeNeedSlide;
