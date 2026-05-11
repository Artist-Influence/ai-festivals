import GlassPanel from '../GlassPanel';
import { useTranslation } from '@/i18n/LanguageContext';
import subClip1 from '@/assets/subtronics-clip1.jpg';
import subClip2 from '@/assets/subtronics-clip2.jpg';
import subClip3 from '@/assets/subtronics-clip3.jpg';

const clipImages = [subClip1, subClip2, subClip3];

const CaseStudySlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden p-5 md:p-24 flex flex-col items-center justify-center">
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4">{t('csSubtronics.title')}</h1>
          <p className="text-sm md:text-xl text-on-visual-soft mb-6 md:mb-12">{t('csSubtronics.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-[1200px] mx-auto">
          <GlassPanel variant="bright" className="p-4 md:p-8 flex flex-col">
            <p className="text-xs md:text-base text-primary font-mono mb-2 md:mb-4 tracking-widest">{t('csSubtronics.tag')}</p>
            <p className="text-xl md:text-4xl font-bold text-foreground">Subtronics</p>
            <p className="text-xs md:text-base text-muted-foreground mb-4 md:mb-6">{t('csSubtronics.client')}</p>

            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <p className="text-xs md:text-lg text-muted-foreground">
                <span className="text-primary font-medium">{t('csSubtronics.goalLabel')}</span> {t('csSubtronics.goal')}
              </p>
            </div>

            <p className="text-xs md:text-base text-primary font-medium mb-2 md:mb-3">{t('csSubtronics.strategyTitle')}</p>
            <ol className="list-decimal list-inside space-y-1 md:space-y-2 text-xs md:text-lg text-muted-foreground">
              {[0, 1, 2, 3].map((i) => (
                <li key={i}>{t(`csSubtronics.strategy.${i}`)}</li>
              ))}
            </ol>
          </GlassPanel>

          <div className="flex flex-col gap-4 md:gap-6">
            <div>
              <p className="text-xs md:text-sm text-primary font-medium mb-2 md:mb-3">{t('csSubtronics.sampleClips')}</p>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {clipImages.map((img, i) => (
                  <div key={i} className="aspect-[9/16] rounded-xl bg-white/[0.06] border border-white/[0.08] overflow-hidden">
                    <img src={img} alt={`Subtronics clip ${i + 1}`} loading="eager" decoding="sync" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <GlassPanel variant="bright" className="p-4 md:p-6">
              <p className="text-xs md:text-base text-primary font-medium mb-2 md:mb-4">{t('csSubtronics.results')}</p>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {[
                  { val: '5,000,000+', labelKey: 'kpi.views' },
                  { val: '150,000+', labelKey: 'kpi.likes' },
                  { val: '15,000+', labelKey: 'kpi.followers' },
                  { val: '600+', labelKey: 'kpi.clips' },
                ].map((m) => (
                  <div key={m.labelKey} className="bg-white/[0.04] rounded-lg p-2 md:p-4 text-center">
                    <p className="text-sm md:text-xl font-bold text-foreground">{m.val}</p>
                    <p className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
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

export default CaseStudySlide;
