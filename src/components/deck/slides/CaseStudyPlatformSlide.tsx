import GlassPanel from '../GlassPanel';
import { useTranslation } from '@/i18n/LanguageContext';
import spicyMargaritaImg from '@/assets/jason-derulo-spicy-margarita-views.png';
import dackJanielsImg from '@/assets/dack-janiels-streams.png';
import francisMercierImg from '@/assets/francis-mercier-sauti.webp';

const CaseStudyPlatformSlide = () => {
  const { t } = useTranslation();

  const cases = [
    {
      tagKey: 'csPlatform.tag.0', artist: 'Jason Derulo & Michael Bublé', track: 'Spicy Margarita',
      overviewKey: 'csPlatform.overview.0', screenshot: spicyMargaritaImg, imgClass: 'object-contain',
      metrics: [
        { val: '11M', labelKey: 'kpi.views' }, { val: '6.5M', labelKey: 'kpi.uniqueViewers' },
        { val: '1.1M+ hrs', labelKey: 'kpi.watchTime' }, { val: '76.4%', labelKey: 'kpi.avgViewed' },
      ],
    },
    {
      tagKey: 'csPlatform.tag.1', artist: 'Dack Janiels', track: 'Shock Therapy',
      overviewKey: 'csPlatform.overview.1', screenshot: dackJanielsImg, imgClass: 'object-cover object-left',
      metrics: [
        { val: '185,700', labelKey: 'kpi.streams' }, { val: '9,950', labelKey: 'kpi.playlistAdds' },
        { val: '3.6%', labelKey: 'kpi.saveRate' }, { val: '42K', labelKey: 'kpi.algoStreams' },
      ],
    },
    {
      tagKey: 'csPlatform.tag.2', artist: 'Francis Mercier', track: 'Sauti',
      overviewKey: 'csPlatform.overview.2', screenshot: francisMercierImg, imgClass: 'object-cover object-top',
      metrics: [
        { val: '16.4M', labelKey: 'kpi.views' }, { val: '$0.03', labelKey: 'kpi.cpm' },
        { val: '89.2K', labelKey: 'kpi.saves' }, { val: '7.16%', labelKey: 'kpi.engagement' },
      ],
    },
  ];

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden pt-14 pb-8 px-5 md:p-24 flex flex-col items-center justify-center">
      <div className="relative z-10 w-full max-w-[1400px] text-center">
        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4">{t('csPlatform.title')}</h1>
        <p className="text-sm md:text-xl text-on-visual-soft mb-6 md:mb-12">{t('csPlatform.subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[1200px] mx-auto">
          {cases.map((c) => (
            <GlassPanel key={c.artist} variant="bright" className="p-4 md:p-5 flex flex-col h-full">
              <p className="text-[10px] md:text-base text-primary font-mono mb-1 md:mb-2 tracking-widest">{t(c.tagKey)}</p>
              <p className="text-sm md:text-lg font-bold text-foreground leading-tight">{c.artist}</p>
              <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">{c.track}</p>
              <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 leading-relaxed">{t(c.overviewKey)}</p>

              {c.screenshot && (
                <div className="flex-1 min-h-0 rounded-lg border border-white/[0.08] overflow-hidden mb-2 md:mb-3 bg-black/30 max-h-[120px] md:max-h-none">
                  <img src={c.screenshot} alt={`${c.artist} — ${c.track}`} loading="eager" decoding="sync" className={`w-full h-full ${c.imgClass}`} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                {c.metrics.map((m) => (
                  <div key={m.labelKey} className="bg-white/[0.04] rounded-lg p-1.5 md:p-2 text-center">
                    <p className="text-xs md:text-base font-bold text-foreground">{m.val}</p>
                    <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
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

export default CaseStudyPlatformSlide;
