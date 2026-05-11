import { TrendingUp } from 'lucide-react';

import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';
import mlShorts from '@/assets/major-lazer-canada-shorts-2.jpeg';

const metricsData = [
  { val: '5,000+', labelKey: 'kpi.ytShortsCreates' },
  { val: '14,900+', labelKey: 'kpi.igReelsCreatesLong' },
  { val: '2,000+', labelKey: 'kpi.tiktokCreatesPopular' },
  { val: '3,000+', labelKey: 'kpi.fbReelsCreates' },
  { val: 'US, CA, UK, KR', labelKey: 'kpi.ytShortsAudioTrending' },
  { val: 'US / CA', labelKey: 'kpi.igReelsAudioTrending' },
];

const Top50TrendingSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-12 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row gap-4 md:gap-10 md:items-stretch">
        <div className="flex-1 flex flex-col gap-3 md:gap-4 md:min-h-[720px]">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <TrendingUp size={20} className="text-primary md:w-7 md:h-7" />
              <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
            </div>
            <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4 leading-tight">
              {t('trending.title')}<br className="hidden md:block" />{t('trending.titleLine2')}
            </h1>
            <p className="text-sm md:text-2xl text-on-visual-soft mb-4 md:mb-6 max-w-[700px]">{t('trending.subtitle')}</p>
          </div>

          <GlassPanel variant="bright" className="p-4 md:p-8 flex-1 flex flex-col justify-center">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t('trending.howTitle')}</p>
            <p className="text-xs md:text-lg text-muted-foreground leading-relaxed">{t('trending.howDesc')}</p>
          </GlassPanel>

          <GlassPanel variant="subtle" className="p-4 md:p-8 flex-1 flex flex-col justify-center">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-3 md:mb-5">{t('trending.whenTitle')}</p>
            <div className="space-y-2 md:space-y-3.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2" />
                  <p className="text-xs md:text-lg text-muted-foreground">{t(`trending.when.${i}`)}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 md:pt-5 border-t border-white/[0.06] mt-3 md:mt-5">
              <p className="text-xs md:text-lg text-primary font-medium">{t('trending.timeframe')}</p>
            </div>
          </GlassPanel>
        </div>

        <div className="flex-1 flex flex-col md:min-h-[720px] md:items-center md:justify-center">
          <GlassPanel variant="bright" className="w-full p-4 md:p-7">
            <p className="text-xs md:text-base text-primary font-mono mb-1 md:mb-2 tracking-widest uppercase">{t('trending.caseStudy')}</p>
            <p className="text-lg md:text-2xl font-bold text-foreground">Major Lazer</p>
            <p className="text-sm md:text-xl text-muted-foreground mb-2 md:mb-3">MINI SKIRT</p>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch">
              <div className="flex-[0.9] grid grid-cols-2 md:grid-cols-1 md:flex md:flex-col gap-2 md:gap-3">
                {metricsData.map((m) => (
                  <div key={m.labelKey} className="bg-white/[0.04] rounded-xl p-3 md:p-4 border border-white/[0.06] flex flex-col items-center justify-center text-center md:flex-1">
                    <p className="text-sm md:text-xl font-bold text-foreground">{m.val}</p>
                    <p className="text-[9px] md:text-sm text-muted-foreground uppercase tracking-wider leading-tight">{t(m.labelKey)}</p>
                  </div>
                ))}
              </div>

              <div className="hidden md:flex flex-1 items-stretch justify-center min-h-0">
                <img src={mlShorts} alt="YouTube Shorts, Canada Trending" loading="eager" decoding="sync" className="h-full w-auto max-h-full max-w-full object-contain rounded-lg" />
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

export default Top50TrendingSlide;
