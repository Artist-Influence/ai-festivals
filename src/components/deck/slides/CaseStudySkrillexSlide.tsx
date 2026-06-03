import GlassPanel from '../GlassPanel';
import { useTranslation } from '@/i18n/LanguageContext';
import skrillClip1 from '@/assets/skrillex-clip1.png';
import skrillClip2 from '@/assets/skrillex-clip2.jpeg';
import skrillClip3 from '@/assets/skrillex-clip3.jpeg';

const clipImages = [skrillClip1, skrillClip2, skrillClip3];

const CaseStudySkrillexSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden pt-14 pb-8 px-5 md:p-24 flex flex-col items-center justify-center">
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4">{t('csSkrillex.title')}</h1>
          <p className="text-sm md:text-xl text-on-visual-soft mb-6 md:mb-12">{t('csSkrillex.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-[1200px] mx-auto">
          <GlassPanel variant="bright" className="p-4 md:p-8 flex flex-col">
            <p className="text-xs md:text-base text-primary font-mono mb-2 md:mb-4 tracking-widest">{t('csSkrillex.tag')}</p>
            <p className="text-xl md:text-4xl font-bold text-foreground">Skrillex</p>
            <p className="text-xs md:text-base text-muted-foreground mb-4 md:mb-6">FUS Album</p>

            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <p className="text-sm md:text-lg text-muted-foreground">
                <span className="text-primary font-medium">{t('csSkrillex.goalLabel')}</span> {t('csSkrillex.goal')}
              </p>
            </div>

            <p className="text-xs md:text-base text-primary font-medium mb-2 md:mb-3">{t('csSkrillex.strategyTitle')}</p>
            <ol className="list-decimal list-inside space-y-1 md:space-y-2 text-sm md:text-lg text-muted-foreground">
              {[0, 1, 2].map((i) => (
                <li key={i}>{t(`csSkrillex.strategy.${i}`)}</li>
              ))}
            </ol>
          </GlassPanel>

          <div className="flex flex-col gap-4 md:gap-6">
            <div>
              <p className="text-xs md:text-sm text-primary font-medium mb-2 md:mb-3">{t('csSkrillex.sampleClips')}</p>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {clipImages.map((img, i) => (
                  <div key={i} className="aspect-[9/16] rounded-xl bg-white/[0.06] border border-white/[0.08] overflow-hidden">
                    <img loading="lazy" decoding="async" src={img} alt={`Skrillex clip ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <GlassPanel variant="bright" className="p-4 md:p-6">
              <p className="text-xs md:text-base text-primary font-medium mb-2 md:mb-4">{t('csSkrillex.results')}</p>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {[
                  { val: '2,100,000+', labelKey: 'kpi.views' },
                  { val: '1,557', labelKey: 'kpi.posts' },
                  { val: '6.84%', labelKey: 'kpi.engagement' },
                  { val: '~42%', labelKey: 'kpi.albumUgcMonth1' },
                  { val: '1,300,000+', labelKey: 'kpi.topPostViews' },
                  { val: '10,000+', labelKey: 'kpi.followersOneMo' },
                ].map((m) => (
                  <div key={m.labelKey} className="bg-white/[0.04] rounded-lg p-2 md:p-4 text-center">
                    <p className="text-sm md:text-xl font-bold text-foreground">{m.val}</p>
                    <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySkrillexSlide;
