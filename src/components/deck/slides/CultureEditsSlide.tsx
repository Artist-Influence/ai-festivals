import { useState } from 'react';
import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { Film } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

const tileLabels = ['SPORTS', 'ANIME', 'LYRIC', 'MEME', 'FILM', 'QUOTES', 'GAMING', 'FASHION', 'CARS', 'NIGHTLIFE', 'STREETWEAR', 'MOTIVATION'];

const clips: { src: string }[] = [
  { src: '/culture-edits/clip-1.mp4' },
  { src: '/culture-edits/clip-2.mp4' },
];

const PhoneClip = ({ src }: { src: string }) => {
  const [failed, setFailed] = useState(false);
  const showVideo = !!src && !failed;

  return (
    <div className="group relative w-[140px] md:w-[240px] aspect-[9/16] rounded-3xl border border-white/10 bg-black overflow-hidden shadow-[0_20px_60px_-20px_hsl(0_72%_51%/0.35)] transition-all duration-300 hover:border-primary/40 hover:shadow-[0_24px_70px_-20px_hsl(0_72%_51%/0.5)]">
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-12 md:w-16 h-1.5 rounded-full bg-white/20" />

      {showVideo ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 md:gap-3 bg-gradient-to-br from-primary/15 via-background to-background">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Film className="w-5 h-5 md:w-7 md:h-7 text-primary" />
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground tracking-wider uppercase">Add clip</p>
        </div>
      )}
    </div>
  );
};

const CultureEditsSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-16 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      {/* Background collage grid (decorative) */}
      <div className="hidden md:grid absolute inset-0 grid-cols-4 grid-rows-3 gap-4 p-16 opacity-[0.04] pointer-events-none">
        {tileLabels.map((label, i) => (
          <div key={i} className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-transparent flex items-end p-4">
            <span className="text-xl font-bold text-primary/80 tracking-wider">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <Film className="w-4 h-4 md:w-7 md:h-7 text-primary" />
          <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('common.service')}</p>
        </div>

        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4">{t('cultureEdits.title')}</h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-5 md:mb-8 max-w-[1100px] leading-relaxed">{t('cultureEdits.subtitle')}</p>

        {/* Two-column hero: copy left, phones right */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-3 md:mb-5">
          {/* Left: stacked copy panels */}
          <div className="flex-1 flex flex-col gap-3 md:gap-5">
            <GlassPanel className="p-4 md:p-7">
              <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-4">{t('cultureEdits.whatTitle')}</p>
              <div className="space-y-1.5 md:space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                    <p className="text-xs md:text-xl text-muted-foreground leading-relaxed">{t(`cultureEdits.what.${i}`)}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-4 md:p-7">
              <p className="text-sm md:text-2xl font-semibold text-primary mb-2 md:mb-4">{t('cultureEdits.whyTitle')}</p>
              <div className="space-y-1.5 md:space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                    <p className="text-xs md:text-xl text-muted-foreground leading-relaxed">{t(`cultureEdits.why.${i}`)}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>

          {/* Right: two vertical phone clips */}
          <div className="relative flex items-center justify-center md:justify-end shrink-0">
            {/* Crimson glow behind phones */}
            <div className="absolute inset-0 -m-8 rounded-full bg-primary/[0.10] blur-[80px] pointer-events-none" />
            <div className="relative flex gap-3 md:gap-5 items-center">
              {clips.map((clip, i) => (
                <PhoneClip key={i} src={clip.src} />
              ))}
            </div>
          </div>
        </div>

        <GlassPanel variant="bright" className="p-3 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <p className="text-xs md:text-lg text-primary font-semibold tracking-wider uppercase shrink-0">{t('cultureEdits.bestForLabel')}</p>
            <p className="text-xs md:text-lg text-foreground/90">{t('cultureEdits.bestFor')}</p>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};

export default CultureEditsSlide;
