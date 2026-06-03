import { Monitor } from 'lucide-react';
import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';

const ClientPortalSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-16 flex flex-col justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <Monitor size={20} className="text-primary md:w-7 md:h-7" />
          <p className="text-sm md:text-lg text-primary font-medium tracking-wider uppercase">{t('clientPortal.eyebrow')}</p>
        </div>
        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-2 md:mb-4">{t('clientPortal.title')}</h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-4 md:mb-8 max-w-[1100px]">{t('clientPortal.subtitle')}</p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch">
          <div className="md:w-[26%] flex flex-col gap-3 md:gap-4">
            {[0, 1, 2].map((i) => (
              <GlassPanel key={i} className="p-4 md:p-6 flex-1">
                <p className="text-sm md:text-2xl font-semibold text-primary mb-1 md:mb-2">{t(`clientPortal.bullets.${i}.title`)}</p>
                <p className="text-sm md:text-lg text-muted-foreground leading-snug">{t(`clientPortal.bullets.${i}.desc`)}</p>
              </GlassPanel>
            ))}
          </div>

          <GlassPanel variant="bright" className="md:flex-1 p-2 md:p-3">
            <div className="rounded-lg md:rounded-xl overflow-hidden bg-black aspect-video">
              <video
                src="/client-portal.mp4"
                poster="/client-portal-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              />
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalSlide;
