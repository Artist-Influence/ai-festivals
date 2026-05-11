import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { Youtube } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import spicyMargaritaThumb from '@/assets/jason-derulo-spicy-margarita-thumb.jpg';
import markTuanThumb from '@/assets/mark-tuan-sunsets-cigarettes-thumb.jpg';

const cases = [
  {
    artistKey: 'youtube.case1Artist', trackKey: 'youtube.case1Track', thumb: spicyMargaritaThumb,
    metrics: [
      { val: '—', labelKey: 'kpi.views' }, { val: '—', labelKey: 'kpi.uniqueViewers' },
      { val: '—', labelKey: 'kpi.watchTime' }, { val: '—', labelKey: 'kpi.ctr' },
      { val: '—', labelKey: 'kpi.clicks' }, { val: '—', labelKey: 'kpi.audienceGrowth' },
    ],
  },
  {
    artistKey: 'youtube.case2Artist', trackKey: 'youtube.case2Track', thumb: markTuanThumb,
    metrics: [
      { val: '—', labelKey: 'kpi.views' }, { val: '—', labelKey: 'kpi.uniqueViewers' },
      { val: '—', labelKey: 'kpi.watchTime' }, { val: '—', labelKey: 'kpi.lpv' },
      { val: '—', labelKey: 'kpi.audienceGrowth' }, { val: '—', labelKey: 'kpi.clicks' },
    ],
  },
];

const YouTubeAdsSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-12 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row gap-4 md:gap-10 md:items-stretch">
        <div className="flex-1 flex flex-col gap-3 md:gap-4 md:min-h-[720px]">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <Youtube size={20} className="text-primary md:w-7 md:h-7" />
              <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
            </div>
            <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4 leading-tight">{t('youtube.title')}</h1>
            <p className="text-sm md:text-2xl text-on-visual-soft mb-4 md:mb-6 max-w-[700px]">{t('youtube.subtitle')}</p>
          </div>

          <GlassPanel variant="bright" className="p-4 md:p-8 flex-1 flex flex-col justify-center">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t('youtube.whatTitle')}</p>
            <div className="space-y-1.5 md:space-y-2.5">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                  <p className="text-xs md:text-2xl text-muted-foreground">{t(`youtube.what.${i}`)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel variant="bright" className="p-4 md:p-8 flex-1 flex flex-col justify-center">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t('youtube.howTitle')}</p>
            <div className="space-y-1.5 md:space-y-2.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2.5" />
                  <p className="text-xs md:text-xl text-muted-foreground">{t(`youtube.how.${i}`)}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-white/[0.06] mt-3">
              <p className="text-xs md:text-xl text-primary font-medium">{t('youtube.timeframe')}</p>
            </div>
          </GlassPanel>
        </div>

        <div className="flex-1 flex flex-col gap-2 md:gap-4 md:min-h-[720px]">
          {cases.map((c) => (
            <GlassPanel key={c.artistKey} variant="bright" className="p-2 md:p-5 md:flex-1 md:min-h-0">
              <div className="flex flex-row gap-2 md:gap-5 mb-1.5 md:mb-4">
                  <div className="w-[70px] h-[50px] md:w-[240px] md:h-[150px] shrink-0 rounded-lg md:rounded-xl overflow-hidden border border-white/[0.08]">
                    <img src={c.thumb} alt={t(c.artistKey)} loading="eager" decoding="sync" className="w-full h-full object-cover rounded-lg md:rounded-xl" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[10px] md:text-base text-primary font-mono mb-0.5 tracking-widest uppercase">{t('youtube.caseStudy')}</p>
                    <p className="text-sm md:text-3xl font-bold text-foreground leading-tight">{t(c.artistKey)}</p>
                    <p className="text-xs md:text-xl text-muted-foreground">{t(c.trackKey)}</p>
                  </div>
                </div>

              <div className="grid grid-cols-3 gap-1 md:gap-2 md:mt-auto">
                {c.metrics.map((m) => (
                  <div key={m.labelKey} className="bg-white/[0.04] rounded p-1 md:py-3 md:px-2 text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] md:text-xl font-bold text-foreground">{m.val}</p>
                    <p className="text-[7px] md:text-sm md:mt-0.5 text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouTubeAdsSlide;
