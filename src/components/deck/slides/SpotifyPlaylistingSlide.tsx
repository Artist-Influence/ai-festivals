import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import ero808Img from '@/assets/ero808-genie.jpg';
import ozzGoldWorryImg from '@/assets/ozz-gold-worry.jpg';
import allAmericanRejectsImg from '@/assets/all-american-rejects-get-this.jpg';

const SpotifyIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-primary">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.224-2.719a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.453-1.493c3.632-1.102 8.147-.568 11.234 1.329a.78.78 0 01.256 1.073zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.934.934 0 11-.542-1.79c3.533-1.072 9.404-.865 13.115 1.338a.934.934 0 01-.955 1.612z" fill="currentColor"/>
  </svg>
);

const cases = [
  {
    artist: 'ero808', track: 'Genie', artwork: ero808Img,
    metrics: [{ val: '1.55M', labelKey: 'kpi.streams' }, { val: '66.7K', labelKey: 'kpi.playlistAdds' }, { val: '50.1K', labelKey: 'kpi.saves' }, { val: '802K', labelKey: 'kpi.algoStreams' }],
    playlists: [
      { label: 'Playlist 1', shortLabel: 'P1', url: 'https://open.spotify.com/playlist/5quud9tyyGwkmk2vgLK1Vd' },
      { label: 'Playlist 2', shortLabel: 'P2', url: 'https://open.spotify.com/playlist/3MnaeVYyif6bTqO2PO8wVU' },
      { label: 'Playlist 3', shortLabel: 'P3', url: 'https://open.spotify.com/playlist/3iqatiD4ZWUZ8g51izTEOd' },
    ],
  },
  {
    artist: 'Ozz Gold', artistNote: '6K → 800K+ monthly listeners in 6 months', track: 'Worry', artwork: ozzGoldWorryImg,
    metrics: [{ val: '148K', labelKey: 'kpi.streams' }, { val: '9.7K', labelKey: 'kpi.playlistAdds' }, { val: '11.1K', labelKey: 'kpi.saves' }, { val: '725K', labelKey: 'kpi.algoStreams' }],
    playlists: [
      { label: 'Playlist 1', shortLabel: 'P1', url: 'https://open.spotify.com/playlist/2xjYnvLKZgxjIXqHXYV0Zs' },
      { label: 'Playlist 2', shortLabel: 'P2', url: 'https://open.spotify.com/playlist/5Epnfl9GcJOnCqISHDp8QC' },
      { label: 'Playlist 3', shortLabel: 'P3', url: 'https://open.spotify.com/playlist/3tRhisNDv5YZXPQltBbJNc' },
    ],
  },
  {
    artist: 'The All-American Rejects', track: 'Get This', artwork: allAmericanRejectsImg,
    metrics: [{ val: '3.4M', labelKey: 'kpi.streams' }, { val: '112.5K', labelKey: 'kpi.playlistAdds' }, { val: '266K', labelKey: 'kpi.saves' }, { val: '457K', labelKey: 'kpi.algoStreams' }],
    playlists: [
      { label: 'Playlist 1', shortLabel: 'P1', url: 'https://open.spotify.com/playlist/26MY3qVKQFBSqNMBshJZs8' },
      { label: 'Playlist 2', shortLabel: 'P2', url: 'https://open.spotify.com/playlist/76iQv4c5qSM4AgvXph4rJu' },
      { label: 'Playlist 3', shortLabel: 'P3', url: 'https://open.spotify.com/playlist/3CdfoioAm3TCoieKyYPPys' },
    ],
  },
];

const SpotifyPlaylistingSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-6 px-5 md:p-10 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 flex flex-col gap-3 md:gap-4 w-full max-w-[1600px] mx-auto">
        {/* Header — full width above the two-column row */}
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-3">
            <SpotifyIcon size={18} />
            <p className="text-xs md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-on-visual mb-1 md:mb-3 leading-tight">{t('spotify.title')}</h1>
          <p className="text-xs md:text-xl text-on-visual-soft mb-3 md:mb-0 max-w-[700px]">{t('spotify.subtitle')}</p>
        </div>

        {/* Mobile summary */}
        <GlassPanel variant="bright" className="p-4 md:hidden">
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-start gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5" />
                <p className="text-xs text-muted-foreground">{t(`spotify.mobileSummary.${i}`)}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Two-column row: left panels + right case study cards */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-10 items-stretch flex-1">
          <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">
            <GlassPanel variant="bright" className="p-4 md:p-6 hidden md:flex md:flex-col flex-1">
              <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t('spotify.whatTitle')}</p>
              <div className="space-y-1.5 md:space-y-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2.5" />
                    <p className="text-sm md:text-xl text-muted-foreground">{t(`spotify.what.${i}`)}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel variant="bright" className="p-4 md:p-6 flex-1 hidden md:flex md:flex-col">
              <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-3">{t('spotify.whyTitle')}</p>
              <div className="space-y-1.5 md:space-y-2.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2.5" />
                    <p className="text-sm md:text-xl text-muted-foreground">{t(`spotify.why.${i}`)}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/[0.06] mt-3">
                <p className="text-sm md:text-xl text-primary font-medium">{t('spotify.timeframe')}</p>
              </div>
            </GlassPanel>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-2 md:gap-2.5">
            {cases.map((c, idx) => (
              <GlassPanel key={idx} variant="bright" className="p-3 md:p-4 flex flex-col">
                <div className="flex gap-2.5 md:gap-4 mb-1 md:mb-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden border border-white/[0.08] shrink-0">
                    <img loading="lazy" decoding="async" src={c.artwork} alt={`${c.artist} - ${c.track}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] md:text-sm text-primary font-mono tracking-widest mb-0.5">{t('spotify.tagLabel')}</p>
                    <p className="text-sm md:text-xl font-bold text-foreground leading-tight">{c.artist}</p>
                    <p className="text-xs md:text-base text-muted-foreground">{c.track}</p>
                    {c.artistNote && (
                      <p className="text-[10px] md:text-sm text-primary/80 italic mt-0.5 leading-tight">({c.artistNote})</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1 md:gap-2 mb-1 md:mb-3">
                  {c.metrics.map((m) => (
                    <div key={m.labelKey} className="bg-white/[0.04] rounded p-1.5 md:p-2 text-center">
                      <p className="text-sm md:text-xl font-bold text-foreground">{m.val}</p>
                      <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wider">{t(m.labelKey)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-1 md:gap-2">
                  {c.playlists.map((pl) => (
                    <a key={pl.label} href={pl.url} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-0.5 text-[10px] md:text-xs text-primary border border-primary/20 rounded px-2 py-1 md:px-2 md:py-1 hover:bg-primary/10 transition-colors">
                      <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      <span className="md:hidden">{pl.shortLabel}</span>
                      <span className="hidden md:inline">{pl.label}</span>
                    </a>
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

export default SpotifyPlaylistingSlide;
