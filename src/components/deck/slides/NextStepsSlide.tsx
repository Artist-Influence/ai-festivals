import GlassPanel from '../GlassPanel';
import { useTranslation } from '@/i18n/LanguageContext';
import aiLogo from '@/assets/ai-logo-last-slide.png';
import CoverVisual from '../visuals/CoverVisual';

const NextStepsSlide = () => {
  const { t } = useTranslation();

  const steps = Array.from({ length: 4 }, (_, i) => ({
    num: `0${i + 1}`,
    title: t(`nextSteps.step.${i}.title`),
    desc: t(`nextSteps.step.${i}.desc`),
  }));

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden p-5 md:p-12 flex flex-col items-center justify-start md:justify-center text-center">
      <style>{`
        @keyframes next-glow-sweep {
          0% { opacity: 0; left: -100%; }
          30% { opacity: 1; }
          100% { opacity: 0; left: 100%; }
        }
        .next-step-card { position: relative; overflow: hidden; }
        .next-step-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.15), transparent);
          z-index: 1;
          pointer-events: none;
        }
        ${steps.map((_, i) => `
          .next-step-card-${i}::before {
            animation: next-glow-sweep 3s ease-in-out ${i * 0.7}s infinite;
          }
        `).join('')}
      `}</style>
      <CoverVisual className="opacity-90" />

      <div className="relative z-10 max-w-[1400px] w-full">
        <h1 className="text-2xl md:text-7xl font-extrabold text-white mb-1 md:mb-2 tracking-tight">{t('nextSteps.title')}</h1>
        <p className="text-sm md:text-xl text-white/70 mb-6 md:mb-14 tracking-wide">{t('nextSteps.subtitle')}</p>

        <div className="grid grid-cols-2 md:flex gap-3 md:gap-6 mb-8 md:mb-16">
          {steps.map((s, i) => (
            <GlassPanel key={i} variant="bright" className={`flex-1 p-4 md:p-8 text-left next-step-card next-step-card-${i}`}>
              <p className="text-primary text-xs md:text-xl font-mono mb-1 md:mb-3 tracking-widest relative z-10">{s.num}</p>
              <p className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 relative z-10">{s.title}</p>
              <p className="text-xs md:text-xl text-muted-foreground relative z-10">{s.desc}</p>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel variant="subtle" className="mb-6 md:mb-12 p-4 md:p-8 max-w-[700px] mx-auto">
          <p className="text-sm md:text-[21px] text-foreground font-medium mb-1 md:mb-2">{t('nextSteps.contactTitle')}</p>
          <p className="text-xs md:text-[19px] text-white/80 mb-1 md:mb-2">{t('nextSteps.companyName')}</p>
          <p className="text-xs md:text-[21px] text-white/85 mb-1 md:mb-2">www.artistinfluence.com</p>
          <a href="mailto:tribe@artistinfluence.com" className="text-xs md:text-[20px] text-primary font-medium hover:underline block mb-2 md:mb-3">tribe@artistinfluence.com</a>
          <p className="text-xs md:text-[20px] text-primary font-medium mt-2 md:mt-3">{t('nextSteps.contactRedLine')}</p>
        </GlassPanel>

        <img src={aiLogo} alt="Artist Influence" className="w-32 md:w-64 mx-auto mb-2 md:mb-3" />
        <p className="text-xs md:text-lg text-white/65 tracking-widest uppercase">{t('nextSteps.tagline')}</p>
      </div>
    </div>
  );
};

export default NextStepsSlide;
