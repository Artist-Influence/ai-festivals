import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { Inbox, Activity, FileBarChart, Brain, Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

const moduleConfig = [
  { icon: Inbox },
  { icon: Activity },
  { icon: FileBarChart },
  { icon: Brain },
];

const UnifiedOpsSlide = () => {
  const { t } = useTranslation();
  const modules = moduleConfig.map((m, i) => ({
    icon: m.icon,
    label: t(`unifiedOps.module.${i}.label`),
    desc: t(`unifiedOps.module.${i}.desc`),
  }));

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-x-hidden md:overflow-hidden py-2 px-3 md:p-20 flex flex-col justify-start md:justify-center">
      <PatternVisual />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <p className="t-eyebrow text-[10px] md:text-sm text-on-visual-accent">{t('unifiedOps.kicker')}</p>
        </div>

        <h1 className="t-hero text-2xl md:text-6xl text-on-visual mb-3 md:mb-5">
          {t('unifiedOps.title')}
        </h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-5 md:mb-10 max-w-[1200px] leading-relaxed">
          {t('unifiedOps.subtitle')}
        </p>

        {/* 4 module cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-8">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <GlassPanel key={i} variant="bright" className="p-4 md:p-5">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <p className="mono text-[10px] md:text-xs text-primary tracking-widest uppercase">
                    0{i + 1}
                  </p>
                </div>
                <p className="t-h3 text-sm md:text-xl mb-1.5 md:mb-2">{m.label}</p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </GlassPanel>
            );
          })}
        </div>

        {/* Self-learning callout */}
        <div className="rounded-2xl border border-primary/40 bg-primary/[0.07] p-4 md:p-6 mb-3 md:mb-5">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center bg-primary/20 border border-primary/40">
              <Brain className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="t-eyebrow text-xs md:text-base mb-1">
                {t('unifiedOps.calloutTitle')}
              </p>
              <p className="text-sm md:text-lg text-foreground/90 leading-relaxed">
                {t('unifiedOps.calloutBody')}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-primary/35 bg-primary/[0.06] p-3 md:p-5 text-center">
          <p className="text-sm md:text-lg text-foreground font-medium leading-relaxed">
            {t('unifiedOps.footer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnifiedOpsSlide;
