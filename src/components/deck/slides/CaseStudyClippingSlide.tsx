import GlassPanel from '../GlassPanel';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import skrillexCover from '@/assets/case-clipping-skrillex.jpg';
import doordashCover from '@/assets/case-clipping-doordash.jpg';
import marioCover from '@/assets/case-clipping-mario.jpg';

const cases = [
  {
    artist: 'Skrillex', track: 'FUS Album', coverArt: skrillexCover, overviewKey: 'csClipping.overview.0',
    metrics: [
      { val: '$1.20', labelKey: 'kpi.cpm' }, { val: '2.08M', labelKey: 'kpi.views' },
      { val: '6.84%', labelKey: 'kpi.engagement' }, { val: '136K', labelKey: 'kpi.likes' },
    ],
    clips: [],
  },
  {
    artist: 'DoorDash × 50 Cent', track: 'Brand Spot', coverArt: doordashCover, overviewKey: 'csClipping.overview.1',
    metrics: [
      { val: '4.74M', labelKey: 'kpi.views' }, { val: '206K', labelKey: 'kpi.likes' },
      { val: '65.7K', labelKey: 'kpi.shares' }, { val: '5.77%', labelKey: 'kpi.engagement' },
    ],
    clips: [],
  },
  {
    artist: 'Super Mario Galaxy Movie', track: 'Film Launch', coverArt: marioCover, overviewKey: 'csClipping.overview.2',
    metrics: [
      { val: '$0.57', labelKey: 'kpi.cpm' }, { val: '8.75M', labelKey: 'kpi.views' },
      { val: '521K', labelKey: 'kpi.likes' }, { val: '105', labelKey: 'kpi.clips' },
    ],
    clips: [],
  },
];

const CaseStudyClippingSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden pt-14 pb-8 px-5 md:p-24 flex flex-col items-center justify-center">
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
