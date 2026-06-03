import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { Disc3, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

const IdIdSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-20 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      {/* Centered glow behind title */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full bg-primary/[0.1] blur-[160px] animate-float" />

      {/* Pilot chip */}
      <div className="absolute top-4 right-4 md:top-10 md:right-10 z-20 inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-primary/40 bg-primary/[0.08]">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <p className="text-[10px] md:text-xs text-primary font-mono tracking-[0.25em]">{t('idid.pilotChip')}</p>
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <Disc3 className="w-4 h-4 md:w-7 md:h-7 text-primary animate-[spin_8s_linear_infinite]" />
          <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('idid.kicker')}</p>
        </div>

        <h1 className="text-3xl md:text-7xl font-bold text-on-visual mb-2 md:mb-3 leading-tight">{t('idid.title')}</h1>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3 md:mb-5">
          <p className="text-base md:text-3xl text-primary/90 font-light">{t('idid.tagline')}</p>
          <a
            href="https://id-id.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs md:text-base text-primary/80 hover:text-primary transition-colors"
          >
            <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
            <span className="underline decoration-primary/30 hover:decoration-primary">id-id.ai</span>
          </a>
        </div>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-6 md:mb-12 max-w-[1100px] leading-relaxed">{t('idid.subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-8">
          <GlassPanel variant="bright" className="p-5 md:p-7">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-3 md:mb-4">{t('idid.whatTitle')}</p>
            <div className="space-y-2 md:space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                  <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">{t(`idid.what.${i}`)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel variant="bright" className="p-5 md:p-7">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-3 md:mb-4">{t('idid.whyTitle')}</p>
            <div className="space-y-2 md:space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                  <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">{t(`idid.why.${i}`)}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <p className="text-sm md:text-lg text-on-visual-soft italic text-center max-w-[1100px] mx-auto leading-relaxed">
          {t('idid.bottomNote')}
        </p>
      </div>
    </div>
  );
};

export default IdIdSlide;
