import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';
import sidepieceImg from '@/assets/sidepiece-cash-out.jpg';
import johnSummitImg from '@/assets/john-summit-gorgon-city-is-everybody-having-fun.jpg';
import sonnyFoderaImg from '@/assets/sonny-fodera-all-this-time.jpg';

const SoundCloudIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-primary">
    <path d="M11.56 8.87V17h8.76c1.85 0 3.35-1.61 3.35-3.61 0-2-1.5-3.61-3.35-3.61-.34 0-.68.05-1 .14C19.04 7.15 16.81 5 14.11 5c-.93 0-1.8.28-2.55.76v3.11zM8.56 17h1.5V9.6c-.47-.2-.97-.32-1.5-.36V17zm-3 0h1.5v-6.5c-.24.07-.47.17-.69.3l-.04.02c-.27.16-.52.36-.77.58V17zm-3 0h1.5v-4.21c-.46.68-.79 1.43-.99 2.22-.15.58-.26 1.19-.31 1.8L3.56 17z" fill="currentColor"/>
  </svg>
);

const cases = [
  {
    artist: 'SIDEPIECE', track: 'Cash Out', artwork: sidepieceImg,
    metrics: [{ val: '563K', labelKey: 'kpi.plays' }, { val: '18.1K', labelKey: 'kpi.likes' }, { val: '407', labelKey: 'kpi.reposts' }, { val: '166', labelKey: 'kpi.comments' }],
  },
  {
    artist: 'John Summit & Gorgon City', track: 'Is Everybody Having Fun?', artwork: johnSummitImg,
    metrics: [{ val: '537K', labelKey: 'kpi.plays' }, { val: '15.3K', labelKey: 'kpi.likes' }, { val: '420', labelKey: 'kpi.reposts' }, { val: '187', labelKey: 'kpi.comments' }],
  },
  {
    artist: 'Sonny Fodera', track: 'All This Time', artwork: sonnyFoderaImg,
    metrics: [{ val: '667K', labelKey: 'kpi.plays' }, { val: '12.6K', labelKey: 'kpi.likes' }, { val: '239', labelKey: 'kpi.reposts' }, { val: '76', labelKey: 'kpi.comments' }],
  },
];

const SoundCloudRepostsSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-6 px-5 md:p-12 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 flex flex-col gap-3 md:gap-4 w-full max-w-[1600px] mx-auto">
        {/* Header — full width above the two-column row */}
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-4">
            <SoundCloudIcon size={18} />
            <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
          </div>
          <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-1 md:mb-4 leading-tight">{t('soundcloud.title')}</h1>
          <p className="text-sm md:text-2xl text-on-visual-soft mb-0 max-w-[700px]">{t('soundcloud.subtitle')}</p>
        </div>

        {/* Mobile summary */}
        <GlassPanel variant="bright" className="p-4 md:hidden">
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-start gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5" />
                <p className="text-xs text-muted-foreground">{t(`soundcloud.mobileSummary.${i}`)}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Two-column row: left panels + right case study cards */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-10 items-stretch flex-1">
          <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">
            <GlassPanel variant="bright" className="p-4 md:p-8 hidden md:flex md:flex-col flex-1">
              <p className="text-2xl font-semibold text-primary mb-3">{t('soundcloud.whatTitle')}</p>
              <div className="space-y-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-3" />
                    <p className="text-2xl text-muted-foreground">{t(`soundcloud.what.${i}`)}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel variant="bright" className="p-4 md:p-8 flex-1 hidden md:flex md:flex-col">
              <p className="text-2xl font-semibold text-primary mb-3">{t('soundcloud.whyTitle')}</p>
              <div className="space-y-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-3" />
                    <p className="text-2xl text-muted-foreground">{t(`soundcloud.why.${i}`)}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/[0.06] mt-3">
                <p className="text-2xl text-primary font-medium">{t('soundcloud.timeframe')}</p>
              </div>
            </GlassPanel>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-2 md:gap-3 justify-between">
            {cases.map((c, idx) => (
              <GlassPanel key={idx} variant="bright" className="p-3 md:p-6 flex flex-col">
                <div className="flex gap-2.5 md:gap-4 mb-1 md:mb-3">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden border border-white/[0.08] shrink-0">
                    <img loading="lazy" decoding="async" src={c.artwork} alt={`${c.artist} - ${c.track}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] md:text-lg text-primary font-mono tracking-widest mb-0.5">{t('soundcloud.tagLabel')}</p>
                    <p className="text-sm md:text-2xl font-bold text-foreground leading-tight">{c.artist}</p>
                    <p className="text-sm md:text-lg text-muted-foreground">{c.track}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1 md:gap-2">
                  {c.metrics.map((m) => (
                    <div key={m.labelKey} className="bg-white/[0.04] rounded p-1.5 md:p-3 text-center">
                      <p className="text-sm md:text-2xl font-bold text-foreground">{m.val}</p>
                      <p className="text-[8px] md:text-lg text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
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

export default SoundCloudRepostsSlide;
