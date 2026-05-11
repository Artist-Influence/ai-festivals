import GlassPanel from '../GlassPanel';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import ariesCover from '@/assets/aries-in-the-flesh.jpg';
import gorgonCityCover from '@/assets/gorgon-city-mitsubishi.jpg';
import nashRlyCover from '@/assets/nash-rly-u-and-me.jpg';

const cases = [
  {
    artist: 'Aries', track: 'In The Flesh', coverArt: ariesCover, overviewKey: 'csClipping.overview.0',
    metrics: [
      { val: '$0.50', labelKey: 'kpi.cpm' }, { val: '1.1M+', labelKey: 'kpi.views' },
      { val: '13.65%', labelKey: 'kpi.engagement' }, { val: '133K+', labelKey: 'kpi.likes' },
    ],
    clips: [
      { url: 'https://www.tiktok.com/@chestercorneliusthethird/video/7567109238930050317' },
      { url: 'https://www.tiktok.com/@chestercorneliusthethird/video/7568640706928069902' },
    ],
  },
  {
    artist: 'Gorgon City', track: 'Mitsubishi', coverArt: gorgonCityCover, overviewKey: 'csClipping.overview.1',
    metrics: [
      { val: '$0.60', labelKey: 'kpi.cpm' }, { val: '3.08M+', labelKey: 'kpi.views' },
      { val: '102K+', labelKey: 'kpi.likes' }, { val: '3.64%', labelKey: 'kpi.engagement' },
    ],
    clips: [
      { url: 'https://www.instagram.com/p/DQmP6-JkvLS' },
      { url: 'https://www.instagram.com/p/DQkQTC_D1kJ' },
    ],
  },
  {
    artist: 'Nash Rly', track: 'U & Me', coverArt: nashRlyCover, overviewKey: 'csClipping.overview.2',
    metrics: [
      { val: '$0.49', labelKey: 'kpi.cpm' }, { val: '1.55M+', labelKey: 'kpi.views' },
      { val: '48K+', labelKey: 'kpi.likes' }, { val: '3.78%', labelKey: 'kpi.engagement' },
    ],
    clips: [],
  },
];

const CaseStudyClippingSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden p-5 md:p-24 flex flex-col items-center justify-center">
      <div className="relative z-10 w-full max-w-[1400px] text-center">
        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4">{t('csClipping.title')}</h1>
        <p className="text-sm md:text-xl text-on-visual-soft mb-6 md:mb-12">{t('csClipping.subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[1200px] mx-auto">
          {cases.map((c) => (
            <GlassPanel key={c.artist} variant="bright" className="p-4 md:p-6 flex flex-col">
              <div className="aspect-square rounded-xl overflow-hidden border border-white/[0.08] mb-3 md:mb-4">
                <img loading="lazy" decoding="async" src={c.coverArt} alt={`${c.artist} - ${c.track}`} className="w-full h-full object-cover" />
              </div>

              <p className="text-[10px] md:text-base text-primary font-mono mb-1 md:mb-3 tracking-widest">{t('csClipping.tag')}</p>
              <p className="text-sm md:text-lg font-bold text-foreground leading-tight">{c.artist}</p>
              <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">{c.track}</p>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-5 leading-relaxed">{t(c.overviewKey)}</p>

              <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-3 md:mb-4">
                {c.metrics.map((m) => (
                  <div key={m.labelKey} className="bg-white/[0.04] rounded-lg p-1.5 md:p-2.5 text-center">
                    <p className="text-xs md:text-base font-bold text-foreground">{m.val}</p>
                    <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
                  </div>
                ))}
              </div>

              {c.clips.length > 0 && (
                <div className="flex gap-1.5 md:gap-2 mt-auto">
                  {c.clips.map((clip, i) => (
                    <a key={clip.url} href={clip.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] md:text-xs text-primary border border-primary/20 rounded-lg px-2 py-1 md:px-3 md:py-1.5 hover:bg-primary/10 transition-colors">
                      <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      {t('csClipping.watchClip')} {i + 1}
                    </a>
                  ))}
                </div>
              )}
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyClippingSlide;
