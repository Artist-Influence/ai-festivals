import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';
import mashbitImg from '@/assets/case-mashbit.png';
import zedsDeadImg from '@/assets/zeds-dead-logo.png';

const TikTokIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-primary">
    <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0015.54 3h-3.09v12.4a2.59 2.59 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.3 1.38V7.3s-1.88.09-3.24-1.48z" fill="currentColor"/>
  </svg>
);

const FacebookIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-primary">
    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7A10 10 0 0022 12.06C22 6.53 17.5 2.04 12 2.04z" fill="currentColor"/>
  </svg>
);

const MetaTikTokIcon = () => (
  <div className="flex items-center gap-2 md:gap-3">
    <FacebookIcon size={20} />
    <TikTokIcon size={20} />
  </div>
);

const cases = [
  {
    platform: 'META ADS', artist: 'MashBit', track: 'Houston 5.29.26, Persians + Charity Push · 14-day flight',
    descKey: 'metaTiktok.case1Desc', thumb: mashbitImg, imgPosition: 'object-top',
    metrics: [
      { val: '$785', labelKey: 'kpi.spend' },
      { val: '274', labelKey: 'kpi.ticketsSold' },
      { val: '$3,949', labelKey: 'kpi.revenue' },
      { val: '5.03×', labelKey: 'kpi.roas' },
      { val: '9.06%', labelKey: 'kpi.ctr' },
    ],
  },
  {
    platform: 'META ADS', artist: 'Zeds Dead', track: 'Journey of a Lifetime Tour 2026 · 6 city campaigns · Phase 2',
    descKey: 'metaTiktok.case2Desc', thumb: zedsDeadImg, imgPosition: 'object-center',
    metrics: [
      { val: '$1,230', labelKey: 'kpi.spend' },
      { val: '385K', labelKey: 'kpi.impressions' },
      { val: '17.6K', labelKey: 'kpi.linkClicks' },
      { val: '5.61%', labelKey: 'kpi.ctr' },
      { val: '$0.057', labelKey: 'kpi.cpc' },
    ],
  },
];

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-2 md:mt-3" />
    <p className="text-sm md:text-xl text-muted-foreground">{children}</p>
  </div>
);

const AdditionalServicesSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden pt-14 pb-8 px-4 md:p-12 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 flex flex-col gap-4 md:gap-4 w-full max-w-[1600px] mx-auto">
        {/* Header — full width above the two-column row */}
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
            <MetaTikTokIcon />
            <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
          </div>
          <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4 leading-tight">{t('metaTiktok.title')}</h1>
          <p className="text-base md:text-2xl text-on-visual-soft mb-0 max-w-[700px]">{t('metaTiktok.subtitle')}</p>
        </div>

        {/* Two-column row: left panels + right case study cards */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-stretch flex-1">
          <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">
            <GlassPanel variant="bright" className="p-4 md:p-8 flex-1">
              <p className="text-base md:text-2xl font-semibold text-primary mb-3 md:mb-3">{t('metaTiktok.whatTitle')}</p>
              <div className="space-y-2 md:space-y-2.5">
                {[0, 1, 2].map((i) => (
                  <BulletPoint key={i}>{t(`metaTiktok.what.${i}`)}</BulletPoint>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel variant="bright" className="p-4 md:p-8 flex-1 flex flex-col">
              <p className="text-base md:text-2xl font-semibold text-primary mb-3 md:mb-3">{t('metaTiktok.howTitle')}</p>
              <div className="space-y-2 md:space-y-2.5">
                {[0, 1, 2].map((i) => (
                  <BulletPoint key={i}>{t(`metaTiktok.how.${i}`)}</BulletPoint>
                ))}
              </div>
              <div className="pt-3 border-t border-white/[0.06] mt-3">
                <p className="text-sm md:text-lg text-primary font-medium">{t('metaTiktok.timeframe')}</p>
              </div>
            </GlassPanel>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-3 justify-between">
            {cases.map((c, idx) => (
              <GlassPanel key={idx} variant="bright" className="p-3 md:p-5 flex flex-col">
                <div className="flex flex-row gap-3 md:gap-5 mb-3 md:mb-3">
                  <div className="w-[72px] h-[72px] md:w-[150px] md:h-[150px] shrink-0 rounded-lg md:rounded-xl overflow-hidden border border-white/[0.08]">
                    <img loading="lazy" decoding="async" src={c.thumb} alt={c.artist} className={`w-full h-full object-cover rounded-lg md:rounded-xl ${c.imgPosition || 'object-center'}`} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <p className="text-[10px] md:text-base text-primary font-mono mb-0.5 tracking-widest uppercase">{c.platform}</p>
                    <p className="text-base md:text-3xl font-bold text-foreground leading-tight">{c.artist}</p>
                    <p className="text-sm md:text-xl text-muted-foreground">{c.track}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2.5" />
                  <p className="text-sm md:text-lg text-muted-foreground">{t(c.descKey)}</p>
                </div>

                <div className={`grid gap-1.5 md:gap-3 ${c.metrics.length === 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
                  {c.metrics.map((m) => (
                    <div key={m.labelKey} className="bg-white/[0.04] rounded p-1.5 md:px-2 md:py-3 text-center flex flex-col items-center justify-center">
                      <p className="text-[11px] md:text-xl font-bold text-foreground">{m.val}</p>
                      <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wider leading-tight">{t(m.labelKey)}</p>
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

export default AdditionalServicesSlide;
