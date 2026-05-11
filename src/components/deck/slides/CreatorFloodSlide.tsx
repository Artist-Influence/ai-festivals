import { Zap } from 'lucide-react';

import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';
import richBrianImg from '@/assets/rich-brian-jumpy-tiktok.webp';

const metricsData = [
  { val: '10,000+', labelKey: 'kpi.minimumPosts' },
  { val: '23,000+', labelKey: 'kpi.postsDriven' },
  { val: '33,000+', labelKey: 'kpi.totalCreates' },
];

const CreatorFloodSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-12 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row gap-4 md:gap-10 md:items-stretch">
        <div className="flex-1 flex flex-col gap-3 md:gap-4 md:min-h-[720px]">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <Zap size={20} className="text-primary md:w-7 md:h-7" />
              <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
            </div>
            <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4 leading-tight">{t('creatorFlood.title')}</h1>
            <p className="text-sm md:text-2xl text-on-visual-soft mb-4 md:mb-6 max-w-[700px]">{t('creatorFlood.subtitle')}</p>
          </div>

          <GlassPanel className="p-4 md:p-8 flex-1 flex flex-col">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t('creatorFlood.prosTitle')}</p>
            <div className="space-y-1.5 md:space-y-2.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                  <p className="text-xs md:text-2xl text-muted-foreground">{t(`creatorFlood.pros.${i}`)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 md:p-8 flex-1 flex flex-col">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t('creatorFlood.whenTitle')}</p>
            <div className="space-y-1.5 md:space-y-2.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                  <p className="text-xs md:text-2xl text-muted-foreground">{t(`creatorFlood.when.${i}`)}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 md:pt-3 border-t border-white/[0.06] mt-2 md:mt-3">
              <p className="text-xs md:text-2xl text-primary font-medium">{t('creatorFlood.timeframe')}</p>
            </div>
          </GlassPanel>
        </div>

        <div className="flex-1 flex flex-col md:min-h-[720px]">
          <GlassPanel variant="bright" className="w-full p-4 md:p-5 md:flex-1 md:h-full md:flex md:flex-col">
            <p className="text-xs md:text-base text-primary font-mono mb-1 tracking-widest uppercase">{t('creatorFlood.caseStudy')}</p>
            <p className="text-lg md:text-2xl font-bold text-foreground">Rich Brian</p>
            <p className="text-sm md:text-xl text-muted-foreground mb-2">Jumpy (feat. Ski Mask The Slump God)</p>

            <div className="mb-2 rounded-lg border border-white/[0.08] overflow-hidden max-h-[90px] md:max-h-none md:flex-1 md:min-h-0">
              <img src={richBrianImg} alt="Rich Brian, Jumpy TikTok sound page, 33K+ videos" loading="eager" decoding="sync" className="w-full h-full object-cover object-left-top" />
            </div>

            <div className="grid grid-cols-3 gap-1 md:gap-3">
              {metricsData.map((m) => (
                <div key={m.labelKey} className="bg-white/[0.04] rounded p-1.5 md:p-3 text-center">
                  <p className="text-xs md:text-lg font-bold text-foreground">{m.val}</p>
                  <p className="text-[8px] md:text-sm text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

export default CreatorFloodSlide;
