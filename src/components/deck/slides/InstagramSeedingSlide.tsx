import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { Instagram } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import francisMercierImg from '@/assets/francis-mercier-sauti-artwork.jpg';
import spaceLacesImg from '@/assets/case-space-laces-vaultage-004.jpeg';

const cases = [
  {
    artist: 'Francis Mercier', track: 'Sauti', artwork: francisMercierImg,
    metrics: [{ val: '16.8M', labelKey: 'kpi.views' }, { val: '1.18M', labelKey: 'kpi.likes' }, { val: '$0.042', labelKey: 'kpi.cpm' }],
  },
  {
    artist: 'Space Laces', track: 'Vaultage 004', artwork: spaceLacesImg,
    metrics: [{ val: '292K', labelKey: 'kpi.views' }, { val: '6.7K', labelKey: 'kpi.likes' }, { val: '2.43%', labelKey: 'kpi.engagement' }],
  },
];

const InstagramSeedingSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-6 px-5 md:p-12 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 flex flex-col gap-3 md:gap-4 w-full max-w-[1600px] mx-auto">
        {/* Header — full width above the two-column row */}
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-4">
            <Instagram size={18} className="text-primary md:w-7 md:h-7" />
            <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
          </div>
          <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-1 md:mb-4 leading-tight">{t('instagram.title')}</h1>
          <p className="text-sm md:text-2xl text-on-visual-soft mb-0 max-w-[700px]">{t('instagram.subtitle')}</p>
        </div>

        {/* Mobile summary */}
        <GlassPanel variant="bright" className="p-4 md:hidden">
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-start gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5" />
                <p className="text-xs text-muted-foreground">{t(`instagram.mobileSummary.${i}`)}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Two-column row: left panels + right case study cards */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-10 items-stretch flex-1">
          <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">
            <GlassPanel variant="bright" className="p-4 md:p-8 hidden md:flex md:flex-col flex-1">
              <p className="text-2xl font-semibold text-primary mb-3">{t('instagram.whatTitle')}</p>
              <div className="space-y-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-3" />
                    <p className="text-2xl text-muted-foreground">{t(`instagram.what.${i}`)}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel variant="bright" className="p-4 md:p-8 flex-1 hidden md:flex md:flex-col">
              <p className="text-2xl font-semibold text-primary mb-3">{t('instagram.whyTitle')}</p>
              <div className="space-y-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-3" />
                    <p className="text-2xl text-muted-foreground">{t(`instagram.why.${i}`)}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/[0.06] mt-3">
                <p className="text-2xl text-primary font-medium">{t('instagram.timeframe')}</p>
              </div>
            </GlassPanel>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-2 md:gap-3 justify-between">
            {cases.map((c, idx) => (
              <GlassPanel key={idx} variant="bright" className="p-3 md:p-6 flex flex-col md:flex-1 md:justify-center">
                <div className="flex gap-2.5 md:gap-5 mb-1 md:mb-4">
                  <div className="w-12 h-12 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden border border-white/[0.08] shrink-0">
                    <img loading="lazy" decoding="async" src={c.artwork} alt={`${c.artist} - ${c.track}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] md:text-lg text-primary font-mono tracking-widest mb-0.5">{t('instagram.tagLabel')}</p>
                    <p className="text-sm md:text-2xl font-bold text-foreground leading-tight">{c.artist}</p>
                    <p className="text-sm md:text-lg text-muted-foreground">{c.track}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 md:gap-2">
                  {c.metrics.map((m) => (
                    <div key={m.labelKey} className="bg-white/[0.04] rounded p-1.5 md:p-3 flex flex-col items-center justify-center text-center">
                      <p className="text-sm md:text-2xl font-bold text-foreground">{m.val}</p>
                      <p className="text-[8px] md:text-base text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
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

export default InstagramSeedingSlide;
