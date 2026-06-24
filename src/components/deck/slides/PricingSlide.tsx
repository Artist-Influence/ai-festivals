import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { useTranslation } from '@/i18n/LanguageContext';

const PricingSlide = () => {
  const { t } = useTranslation();

  const services = Array.from({ length: 6 }, (_, i) => ({
    name: t(`pricing.service.${i}.name`),
    unit: t(`pricing.service.${i}.unit`),
    note: t(`pricing.service.${i}.note`),
  }));

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden pt-14 pb-8 px-5 md:p-12 flex flex-col items-center justify-start md:justify-center">
      <PatternVisual />
      <div className="relative z-10 w-full max-w-[1400px]">
        <h1 className="t-hero text-3xl md:text-7xl text-on-visual mb-2 md:mb-4">{t('pricing.title')}</h1>
        <p className="text-base md:text-2xl text-on-visual-soft mb-6 md:mb-12">{t('pricing.subtitle')}</p>

        <GlassPanel className="p-0 overflow-hidden">
          <div className="md:hidden divide-y divide-white/[0.06]">
            {services.map((s, i) => (
              <div key={i} className="p-4">
                <p className="text-base font-medium text-foreground">{s.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{s.unit} · {s.note}</p>
              </div>
            ))}
          </div>
          <table className="w-full hidden md:table">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="mono text-left p-6 text-xl text-muted-foreground uppercase tracking-wider">{t('pricing.headerService')}</th>
                <th className="mono text-left p-6 text-xl text-muted-foreground uppercase tracking-wider">{t('pricing.headerUnit')}</th>
                <th className="mono text-left p-6 text-xl text-muted-foreground uppercase tracking-wider">{t('pricing.headerNote')}</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 text-2xl text-foreground font-medium">{s.name}</td>
                  <td className="p-5 text-2xl text-muted-foreground">{s.unit}</td>
                  <td className="p-5 text-2xl text-foreground">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassPanel>

        <div className="mt-5 md:mt-8 flex flex-col gap-2">
          <a href="https://smfnasjfkaksdannc.lovable.app" target="_blank" rel="noopener noreferrer" className="inline-block text-base md:text-xl font-semibold text-primary text-on-visual-accent hover:text-primary/80 transition-colors underline underline-offset-4">
            {t('pricing.viewPricing')}
          </a>
          <p className="text-sm md:text-xl text-on-visual">{t('pricing.footer')}</p>
        </div>
      </div>
    </div>
  );
};

export default PricingSlide;
