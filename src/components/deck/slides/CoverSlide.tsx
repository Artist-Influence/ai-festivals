import aiLogo from '@/assets/artist-influence-logo.png';
import NetworkVisual from '../NetworkVisual';
import CoverVisual from '../visuals/CoverVisual';
import { useTranslation } from '@/i18n/LanguageContext';

const CoverSlide = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full min-h-dvh bg-background relative overflow-hidden flex flex-col items-center justify-center pb-20 md:pb-[10%]">
      <CoverVisual />

      <NetworkVisual className="opacity-15 md:opacity-25" nodeCount={80} />

      <div className="relative z-10 text-center px-5 md:px-0">
        <div className="w-[280px] md:w-[800px] mx-auto overflow-hidden" style={{ marginBottom: '-2rem' }}>
          <img src={aiLogo} alt="Artist Influence" className="w-full" style={{ marginBottom: '-25%' }} />
        </div>
        <p className="text-xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-wide">{t('cover.tagline')}</p>
        <p className="text-base md:text-3xl text-foreground">{t('cover.subtitle')}</p>
      </div>

      <p
        className="absolute bottom-3 md:bottom-16 text-[9px] md:text-base text-muted-foreground/40 tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap px-4"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {t('cover.confidential')}
      </p>
    </div>
  );
};

export default CoverSlide;
