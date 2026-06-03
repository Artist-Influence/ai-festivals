import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';

const accountStats = [
  { val: '$785', label: 'Spend (of $1,000)' },
  { val: '60,006', label: 'Reach' },
  { val: '85,614', label: 'Impressions' },
  { val: '$9.17', label: 'CPM' },
  { val: '$0.14', label: 'Cost / LPV' },
];

const benchmarks = [
  { tag: 'EXCEPTIONAL', val: '9.06%', label: 'Click-through rate', vs: 'vs 0.90% industry avg · 10× above' },
  { tag: 'EXCEPTIONAL', val: '$0.101', label: 'Cost per click', vs: 'vs $0.45 Spotify-traffic avg · 4.4× below' },
  { tag: 'EXCELLENT', val: '$0.14', label: 'Cost per landing page view', vs: 'vs $0.50 event RSVP avg · 3.6× below' },
];

const ticketStats = [
  { val: '274', label: 'Tickets sold', sub: 'of 907 (30.2%)' },
  { val: '+228', label: 'Net new since takeover', sub: '46 → 274 in 14 days' },
  { val: '$3,949', label: 'Ticket revenue', sub: 'AOV $14.41' },
  { val: '5.03×', label: 'ROAS', sub: 'revenue / ad spend' },
  { val: '$3.44', label: 'CAC (ads)', sub: 'May 16 to 29 window' },
];

// Daily timeline data (approx from dashboard charts)
const daily = [
  { d: '5/17', spend: 55, ctr: 6.5, clicks: 4000 },
  { d: '5/18', spend: 95, ctr: 7.0, clicks: 11000 },
  { d: '5/19', spend: 95, ctr: 7.5, clicks: 11000 },
  { d: '5/20', spend: 75, ctr: 8.0, clicks: 6000 },
  { d: '5/21', spend: 10, ctr: 8.5, clicks: 1000 },
  { d: '5/22', spend: 10, ctr: 8.5, clicks: 1000 },
  { d: '5/23', spend: 10, ctr: 9.0, clicks: 1000 },
  { d: '5/24', spend: 10, ctr: 9.5, clicks: 1000 },
  { d: '5/25', spend: 10, ctr: 11.8, clicks: 1000 },
  { d: '5/26', spend: 60, ctr: 11.5, clicks: 4000 },
  { d: '5/27', spend: 95, ctr: 11.0, clicks: 8000 },
  { d: '5/28', spend: 110, ctr: 10.5, clicks: 12000 },
  { d: '5/29', spend: 150, ctr: 9.5, clicks: 15000 },
];
const maxSpend = Math.max(...daily.map((x) => x.spend));
const maxClicks = Math.max(...daily.map((x) => x.clicks));
const maxCtr = Math.max(...daily.map((x) => x.ctr));

const MashBitPhase2Slide = () => {
  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden pt-14 pb-8 px-4 md:p-12 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <p className="text-xs md:text-sm text-primary font-medium tracking-[0.25em] uppercase mb-2 md:mb-3">Campaign Report</p>
        <h1 className="text-3xl md:text-5xl font-bold text-on-visual mb-2 md:mb-3 leading-tight">MashBit · Houston 5.29.26</h1>
        <p className="text-base md:text-xl text-on-visual-soft mb-5 md:mb-6 max-w-[1200px]">
          Persian diaspora event push. 14 day Meta flight built to drive ticket page traffic and event-day conversions.
        </p>

        {/* Meta row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
          <GlassPanel variant="subtle" className="p-3 md:p-4">
            <p className="text-[11px] md:text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Objective</p>
            <p className="text-base md:text-xl text-foreground font-semibold">Traffic / Ticket Sales</p>
          </GlassPanel>
          <GlassPanel variant="subtle" className="p-3 md:p-4">
            <p className="text-[11px] md:text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Timeline</p>
            <p className="text-base md:text-xl text-foreground font-semibold">May 16 to May 29, 2026 · 14 days</p>
          </GlassPanel>
        </div>

        {/* Account summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 mb-4 md:mb-6">
          {accountStats.map((s) => (
            <GlassPanel key={s.label} variant="bright" className="p-3 md:p-4 text-center">
              <p className="text-xl md:text-3xl font-bold text-foreground leading-tight">{s.val}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</p>
            </GlassPanel>
          ))}
        </div>

        {/* Ticket outcomes */}
        <p className="text-xs md:text-sm text-primary font-medium tracking-widest uppercase mb-2 md:mb-3">Ticket outcomes</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 mb-4 md:mb-6">
          {ticketStats.map((s) => (
            <GlassPanel key={s.label} variant="bright" className="p-3 text-center">
              <p className="text-lg md:text-2xl font-bold text-foreground leading-tight">{s.val}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
              <p className="text-[10px] md:text-[10px] text-muted-foreground/80 mt-0.5">{s.sub}</p>
            </GlassPanel>
          ))}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4 items-stretch">
          <div className="flex flex-col h-full">
            <p className="text-[10px] md:text-sm text-primary font-medium tracking-widest uppercase mb-2 md:mb-3">Benchmarks vs industry</p>
            <div className="flex flex-col gap-2 md:gap-3 flex-1">
              {benchmarks.map((b) => (
                <GlassPanel key={b.label} variant="bright" className="p-2.5 md:p-3 flex items-center gap-3 flex-1">
                  <span className="text-[8px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 md:px-2 md:py-1 rounded border bg-primary/20 text-primary border-primary/40 shrink-0">
                    {b.tag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <p className="text-base md:text-2xl font-bold text-foreground leading-tight">{b.val}</p>
                      <p className="text-[10px] md:text-sm text-foreground/80 truncate">{b.label}</p>
                    </div>
                    <p className="text-[8px] md:text-[11px] text-muted-foreground">{b.vs}</p>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <p className="text-[10px] md:text-sm text-primary font-medium tracking-widest uppercase mb-2 md:mb-3">Daily pacing · spend, clicks, CTR</p>
            <GlassPanel variant="bright" className="p-3 md:p-4 flex-1 flex flex-col">
              <div className="flex items-end gap-[2px] md:gap-1 h-[120px] md:h-auto md:flex-1 md:min-h-0">

                {daily.map((day) => {
                  const spendH = (day.spend / maxSpend) * 100;
                  const clicksH = (day.clicks / maxClicks) * 100;
                  const ctrH = (day.ctr / maxCtr) * 100;
                  return (
                    <div key={day.d} className="flex-1 flex flex-col justify-end items-center gap-[1px] h-full">
                      <div className="w-full flex items-end gap-[1px] h-full">
                        <div className="flex-1 bg-primary/80 rounded-sm" style={{ height: `${spendH}%` }} title={`Spend $${day.spend}`} />
                        <div className="flex-1 bg-primary/40 rounded-sm" style={{ height: `${clicksH}%` }} title={`Clicks ${day.clicks}`} />
                        <div className="flex-1 bg-foreground/60 rounded-sm" style={{ height: `${ctrH}%` }} title={`CTR ${day.ctr}%`} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 md:mt-2 px-0.5">
                {daily.map((day) => (
                  <span key={day.d} className="text-[7px] md:text-[9px] text-muted-foreground">{day.d}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-3 text-[8px] md:text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary/80 rounded-sm" /> Spend</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary/40 rounded-sm" /> Link clicks</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-foreground/60 rounded-sm" /> CTR %</span>
              </div>
            </GlassPanel>
          </div>
        </div>

        <p className="text-[10px] md:text-sm text-muted-foreground italic text-center">
          Source: Meta Ads Manager + Eventim live ticketing, May 30, 2026. 100% sold online plus 10 guest list comps.
        </p>
      </div>
    </div>
  );
};

export default MashBitPhase2Slide;
