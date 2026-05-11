import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import SystemLoopDiagram from '../SystemLoopDiagram';
import { Code2, Radio, Workflow } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

const pillarIcons = [Code2, Radio, Workflow];

const OperatingSystemSlide = () => {
  const { t } = useTranslation();
  const pillars = pillarIcons.map((Icon, i) => ({
    icon: Icon,
    label: t(`opSystem.pillar.${i}.label`),
    desc: t(`opSystem.pillar.${i}.desc`),
  }));

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-20 flex flex-col justify-start md:justify-center">
      <PatternVisual />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        {/* Tagline chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-3 md:mb-6 rounded-full border border-primary/30 bg-primary/[0.06]">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[10px] md:text-sm text-primary font-medium tracking-wider uppercase">{t('opSystem.tagline')}</p>
        </div>

        <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-3 md:mb-5 leading-tight max-w-[1200px]">
          {t('opSystem.title')}
        </h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-6 md:mb-10 max-w-[1100px] leading-relaxed">
          {t('opSystem.subtitle')}
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-stretch">
          {/* Left: pillars */}
          <div className="flex-1 flex flex-col gap-3 md:gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <GlassPanel key={i} variant="bright" className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-5">
                    <div className="shrink-0 w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center bg-primary/[0.12] border border-primary/30">
                      <Icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2">{p.label}</p>
                      <p className="text-xs md:text-base text-muted-foreground leading-relaxed md:whitespace-nowrap">{p.desc}</p>
                    </div>
                  </div>
                </GlassPanel>
              );
            })}
          </div>

          {/* Right: system loop diagram */}
          <div className="flex-1 flex items-center justify-center min-h-[260px] md:min-h-0">
            <SystemLoopDiagram
              className="max-w-[480px] max-h-[480px]"
              labels={{
                inputs: t('opSystem.loop.inputs'),
                engine: t('opSystem.loop.engine'),
                reporting: t('opSystem.loop.reporting'),
                learnings: t('opSystem.loop.learnings'),
              }}
            />
          </div>
        </div>

        {/* Bottom takeaway */}
        <GlassPanel variant="subtle" className="mt-4 md:mt-8 p-3 md:p-5">
          <p className="text-xs md:text-lg text-muted-foreground leading-relaxed text-center">
            {t('opSystem.takeaway')}
          </p>
        </GlassPanel>
      </div>
    </div>
  );
};

export default OperatingSystemSlide;
