import GlassPanel from '../GlassPanel';
import { useTranslation } from '@/i18n/LanguageContext';
import richBrianImg from '@/assets/rich-brian-jumpy-tiktok.webp';
import mlShorts from '@/assets/major-lazer-canada-shorts.jpeg';
import mlFacebook from '@/assets/major-lazer-facebook-trending.jpeg';
import mlTiktok from '@/assets/major-lazer-tiktok-popular.jpeg';
import mlIg from '@/assets/major-lazer-ig-trending.jpeg';

const majorLazerScreenshots = [
  { src: mlShorts, alt: 'YouTube Shorts, #11 Canada Daily Top Songs' },
  { src: mlFacebook, alt: 'Facebook, For You audio listing' },
  { src: mlTiktok, alt: 'TikTok, Popular tab, 1739 videos' },
  { src: mlIg, alt: 'Instagram, #4 Trending, 15K reels' },
];

const CaseStudyCreatorFloodSlide = () => {
  const { t } = useTranslation();

  const richBrianMetrics = [
    { val: '10,000+', labelKey: 'kpi.initialPosts' },
    { val: '23,000+', labelKey: 'kpi.postsDriven' },
    { val: '29,900+', labelKey: 'kpi.totalCreates' },
  ];

  const majorLazerMetrics = [
    { val: '5,000+', labelKey: 'kpi.ytCreates' },
    { val: '14,900+', labelKey: 'kpi.igReelsCreates' },
    { val: '2,000+', labelKey: 'kpi.tiktokCreates' },
    { val: 'US / CA', labelKey: 'kpi.trendingRegions' },
  ];

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden px-5 pt-5 pb-3 md:px-8 md:pt-6 md:pb-4 flex flex-col items-center">
      <div className="relative z-10 flex flex-col h-full w-full max-w-[1400px]">
        <h1 className="text-xl md:text-4xl font-bold text-on-visual mb-1 md:mb-2">{t('csCreatorFlood.title')}</h1>
        <p className="text-sm md:text-lg text-on-visual-soft mb-3 md:mb-4">{t('csCreatorFlood.subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[1400px] mx-auto flex-1 min-h-0">
          {/* Rich Brian */}
          <GlassPanel variant="bright" className="p-3 md:p-4 flex flex-col h-full">
            <p className="text-xs md:text-base text-primary font-mono mb-1 md:mb-2 tracking-widest">{t('csCreatorFlood.tag.0')}</p>
            <p className="text-lg md:text-3xl font-bold text-foreground">Rich Brian</p>
            <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">Jumpy (feat. Ski Mask The Slump God)</p>
            <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-3">{t('csCreatorFlood.overview.0')}</p>
            <div className="flex-1 min-h-0 mb-2 md:mb-3 rounded-lg border border-white/[0.08] overflow-hidden max-h-[150px] md:max-h-none">
              <img loading="lazy" decoding="async" src={richBrianImg} alt="Rich Brian, Jumpy TikTok sound page" className="w-full h-full object-cover object-top" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 md:gap-2 mt-auto">
              {richBrianMetrics.map((m) => (
                <div key={m.labelKey} className="bg-white/[0.04] rounded-lg p-1.5 md:p-2 text-center">
                  <p className="text-xs md:text-base font-bold text-foreground">{m.val}</p>
                  <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* Major Lazer */}
          <GlassPanel variant="bright" className="p-3 md:p-4 flex flex-col h-full">
            <p className="text-xs md:text-base text-primary font-mono mb-1 md:mb-2 tracking-widest">{t('csCreatorFlood.tag.1')}</p>
            <p className="text-lg md:text-3xl font-bold text-foreground">Major Lazer</p>
            <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">MINI SKIRT</p>
            <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-3">{t('csCreatorFlood.overview.1')}</p>
            <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-2 md:mb-3 flex-1 min-h-0">
              <div className="rounded-lg border border-white/[0.08] overflow-hidden h-full">
                <img loading="lazy" decoding="async" src={mlShorts} alt="YouTube Shorts, Canada Trending" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between h-full gap-1">
                {[mlFacebook, mlTiktok, mlIg].map((src, i) => (
                  <div key={i} className="rounded-lg border border-white/[0.08] overflow-hidden">
                    <img loading="lazy" decoding="async" src={src} alt={majorLazerScreenshots[i + 1]?.alt} className="w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
              {majorLazerMetrics.map((m) => (
                <div key={m.labelKey} className="bg-white/[0.04] rounded-lg p-1.5 md:p-2 text-center">
                  <p className="text-xs md:text-base font-bold text-foreground">{m.val}</p>
                  <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCreatorFloodSlide;
