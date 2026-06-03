import { Scissors } from 'lucide-react';
import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';
import skrillexCover from '@/assets/case-clipping-skrillex.jpg';
import doordashCover from '@/assets/case-clipping-doordash.jpg';
import marioCover from '@/assets/case-clipping-mario.jpg';

const casesData = [
  {
    artistKey: 'clipping.case1Artist', trackKey: 'clipping.case1Track', img: skrillexCover, overviewKey: 'clipping.case1Overview',
    metrics: [{ val: '2.08M', labelKey: 'kpi.views' }, { val: '6.84%', labelKey: 'kpi.engagement' }, { val: '136K', labelKey: 'kpi.likes' }, { val: '1,557', labelKey: 'kpi.posts' }],
  },
  {
    artistKey: 'clipping.case2Artist', trackKey: 'clipping.case2Track', img: doordashCover, overviewKey: 'clipping.case2Overview',
    metrics: [{ val: '4.74M', labelKey: 'kpi.views' }, { val: '5.77%', labelKey: 'kpi.engagement' }, { val: '206K', labelKey: 'kpi.likes' }, { val: '267', labelKey: 'kpi.posts' }],
  },
  {
    artistKey: 'clipping.case3Artist', trackKey: 'clipping.case3Track', img: marioCover, overviewKey: 'clipping.case3Overview',
    metrics: [{ val: '8.75M', labelKey: 'kpi.views' }, { val: '5.99%', labelKey: 'kpi.engagement' }, { val: '521K', labelKey: 'kpi.likes' }, { val: '105', labelKey: 'kpi.clips' }],
  },
];

const ClippingSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-16 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <Scissors size={20} className="text-primary md:w-7 md:h-7" />
          <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
        </div>
        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4">{t('clipping.title')}</h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-4 md:mb-8 max-w-[900px]">{t('clipping.subtitle')}</p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex-1 flex flex-col gap-3 md:gap-4">
            <GlassPanel className="p-4 md:p-7 flex-1">
              <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t('clipping.prosTitle')}</p>
              <div className="space-y-1.5 md:space-y-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                    <p className="text-sm md:text-2xl text-muted-foreground">{t(`clipping.pros.${i}`)}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-4 md:p-7 flex-1">
              <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t('clipping.diffTitle')}</p>
              <div className="space-y-1.5 md:space-y-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                    <p className="text-sm md:text-2xl text-muted-foreground">{t(`clipping.diff.${i}`)}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/[0.06] mt-3">
                <p className="text-sm md:text-2xl text-primary font-medium">{t('clipping.timeframe')}</p>
              </div>
            </GlassPanel>
          </div>

          <div className="flex-1 flex flex-col gap-2 md:gap-3 md:justify-between">
            {casesData.map((c) => (
              <GlassPanel key={c.artistKey} variant="bright" className="p-2 md:p-5 md:flex-1 md:flex md:flex-col md:justify-center">
                <div className="flex gap-2 md:gap-4">
                  <img loading="lazy" decoding="async" src={c.img} alt={t(c.artistKey)}
                    className="w-10 h-10 md:w-20 md:h-20 rounded-lg md:rounded-xl object-cover border border-white/[0.08] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] md:text-lg text-primary font-mono tracking-widest mb-0.5">{t('clipping.tagLabel')}</p>
                    <p className="text-sm md:text-xl font-bold text-foreground leading-tight">{t(c.artistKey)}</p>
                    <p className="text-[10px] md:text-lg text-muted-foreground">{t(c.trackKey)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-0.5 md:gap-2 mt-1.5 md:mt-3">
                  {c.metrics.map((m) => (
                    <div key={m.labelKey} className="bg-white/[0.04] rounded p-1 md:p-2 text-center">
                      <p className="text-[10px] md:text-lg font-bold text-foreground">{m.val}</p>
                      <p className="text-[7px] md:text-sm text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClippingSlide;
