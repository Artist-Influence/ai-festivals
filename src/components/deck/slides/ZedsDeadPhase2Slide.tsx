import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';

const accountStats = [
  { val: '$1,230', label: 'Spent to date' },
  { val: '385,236', label: 'Impressions' },
  { val: '17,620', label: 'Link Clicks' },
  { val: '5.61%', label: 'Avg CTR' },
  { val: '$0.057', label: 'Avg CPC' },
];

const cities = [
  { city: 'NYC', tag: 'Top Performer', tagColor: 'bg-primary/20 text-primary border-primary/40', stats: [['2,706', 'Link Clicks'], ['10.75%', 'CTR'], ['$0.0334', 'CPC']] },
  { city: 'LA', tag: 'High Efficiency', tagColor: 'bg-primary/15 text-primary border-primary/30', stats: [['2,368', 'Link Clicks'], ['8.93%', 'CTR'], ['$0.0397', 'CPC']] },
  { city: 'Toronto', tag: 'Highest Volume', tagColor: 'bg-primary/15 text-primary border-primary/30', stats: [['137,793', 'Impressions'], ['4,387', 'Link Clicks'], ['$0.0526', 'CPC']] },
  { city: 'Austin', tag: 'High Volume', tagColor: 'bg-white/[0.06] text-foreground border-white/10', stats: [['3,424', 'Link Clicks'], ['2,974', 'LPV']] },
  { city: 'Dallas', tag: 'High Volume', tagColor: 'bg-white/[0.06] text-foreground border-white/10', stats: [['3,402', 'Link Clicks'], ['2,920', 'LPV']] },
  { city: 'Miami', tag: '', tagColor: 'bg-white/[0.06] text-foreground border-white/10', stats: [['1,333', 'Link Clicks'], ['1,071', 'LPV']] },
];

const ZedsDeadPhase2Slide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-3 px-3 md:p-12 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <p className="text-xs md:text-sm text-primary font-medium tracking-[0.25em] uppercase mb-2 md:mb-3">{t('zd2.kicker')}</p>
        <h1 className="text-xl md:text-5xl font-bold text-on-visual mb-1 md:mb-3 leading-tight">{t('zd2.title')}</h1>
        <p className="text-sm md:text-xl text-on-visual-soft mb-4 md:mb-6 max-w-[1200px]">{t('zd2.subtitle')}</p>

        {/* Meta row: objective + timeline */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
          <GlassPanel variant="subtle" className="p-3 md:p-4">
            <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Objective</p>
            <p className="text-sm md:text-xl text-foreground font-semibold">{t('zd2.objective')}</p>
          </GlassPanel>
          <GlassPanel variant="subtle" className="p-3 md:p-4">
            <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Timeline</p>
            <p className="text-sm md:text-xl text-foreground font-semibold">{t('zd2.timeline')}</p>
          </GlassPanel>
        </div>

        {/* Account summary stats */}
        <div className="grid grid-cols-5 gap-1.5 md:gap-3 mb-4 md:mb-6">
          {accountStats.map((s) => (
            <GlassPanel key={s.label} variant="bright" className="p-2 md:p-4 text-center">
              <p className="text-sm md:text-3xl font-bold text-foreground leading-tight">{s.val}</p>
              <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wider mt-0.5 md:mt-1">{s.label}</p>
            </GlassPanel>
          ))}
        </div>

        {/* City highlights */}
        <p className="text-[10px] md:text-sm text-primary font-medium tracking-widest uppercase mb-2 md:mb-3">{t('zd2.cityHighlights')}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
          {cities.map((c) => (
            <GlassPanel key={c.city} variant="bright" className="p-2.5 md:p-4">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <p className="text-sm md:text-xl font-bold text-foreground">{c.city}</p>
                {c.tag && (
                  <span className={`text-[8px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 md:px-2 md:py-1 rounded border ${c.tagColor}`}>{c.tag}</span>
                )}
              </div>
              <div className={`grid gap-1 md:gap-2 ${c.stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {c.stats.map(([val, label]) => (
                  <div key={label} className="bg-white/[0.04] rounded p-1 md:p-2 text-center">
                    <p className="text-[10px] md:text-base font-bold text-foreground leading-tight">{val}</p>
                    <p className="text-[7px] md:text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>

        <p className="text-[10px] md:text-sm text-muted-foreground italic text-center">{t('zd2.note')}</p>
      </div>
    </div>
  );
};

export default ZedsDeadPhase2Slide;
