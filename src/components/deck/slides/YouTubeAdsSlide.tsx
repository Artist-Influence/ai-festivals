import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { Youtube } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
// TODO: replace with final thumbnails for SVDDEN DEATH (VOYDOME 2025), GORDO @ MUTE, Space Laces Vaultage 004
import voydomeThumb from '@/assets/jason-derulo-spicy-margarita-thumb.jpg';
import gordoMuteThumb from '@/assets/mark-tuan-sunsets-cigarettes-thumb.jpg';
import spaceLacesThumb from '@/assets/dack-janiels-shock-therapy.jpg';

const cases = [
  {
    artistKey: 'youtube.case1Artist', trackKey: 'youtube.case1Track', thumb: voydomeThumb,
    metrics: [
      { val: '164K', labelKey: 'kpi.views' }, { val: '8.4K', labelKey: 'kpi.likes' },
      { val: '19.1K hrs', labelKey: 'kpi.watchTime' }, { val: '7%', labelKey: 'kpi.ctr' },
      { val: '837K', labelKey: 'kpi.impressions' }, { val: '+634K', labelKey: 'kpi.subscriberGrowth' },
    ],
  },
  {
    artistKey: 'youtube.case2Artist', trackKey: 'youtube.case2Track', thumb: gordoMuteThumb,
    metrics: [
      { val: '1.2M', labelKey: 'kpi.views' }, { val: '29K', labelKey: 'kpi.likes' },
      { val: '140K hrs', labelKey: 'kpi.watchTime' }, { val: '7%', labelKey: 'kpi.ctr' },
      { val: '6.13M', labelKey: 'kpi.impressions' }, { val: '+2.1K', labelKey: 'kpi.subscriberGrowth' },
    ],
  },
  {
    artistKey: 'youtube.case3Artist', trackKey: 'youtube.case3Track', thumb: spaceLacesThumb,
    metrics: [
      { val: '290K', labelKey: 'kpi.displayViews' }, { val: '452K', labelKey: 'kpi.totalViews' },
      { val: '16K', labelKey: 'kpi.likes' }, { val: '9.2%', labelKey: 'kpi.ctr' },
      { val: '145K', labelKey: 'kpi.viewsPerCampaign' }, { val: '#2', labelKey: 'kpi.searchRank' },
    ],
  },
];

const YouTubeAdsSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-12 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row gap-4 md:gap-10 md:items-stretch md:h-full md:max-h-[1000px]">
        <div className="flex-1 flex flex-col gap-3 md:gap-4 md:min-h-0">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <Youtube size={20} className="text-primary md:w-7 md:h-7" />
              <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-on-visual mb-2 md:mb-3 leading-tight">{t('youtube.title')}</h1>
            <p className="text-sm md:text-xl text-on-visual-soft mb-2 md:mb-4 max-w-[700px]">{t('youtube.subtitle')}</p>
          </div>

          <GlassPanel variant="bright" className="p-4 md:p-6 flex-1 flex flex-col justify-center">
            <p className="text-sm md:text-xl font-semibold text-primary mb-2 md:mb-3">{t('youtube.whatTitle')}</p>
            <div className="space-y-1.5 md:space-y-2">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2.5" />
                  <p className="text-xs md:text-lg text-muted-foreground">{t(`youtube.what.${i}`)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel variant="bright" className="p-4 md:p-6 flex-1 flex flex-col justify-center">
            <p className="text-sm md:text-xl font-semibold text-primary mb-2 md:mb-3">{t('youtube.howTitle')}</p>
            <div className="space-y-1.5 md:space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2.5" />
                  <p className="text-xs md:text-lg text-muted-foreground">{t(`youtube.how.${i}`)}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-white/[0.06] mt-2">
              <p className="text-xs md:text-base text-primary font-medium">{t('youtube.timeframe')}</p>
            </div>
          </GlassPanel>
        </div>

        <div className="flex-1 flex flex-col gap-2 md:gap-3 md:min-h-0">
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
