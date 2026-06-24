import GlassPanel from '../GlassPanel';
import PatternVisual from '../visuals/PatternVisual';
import { Video, Eye, Users, Megaphone } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

const winIcons = [Video, Eye, Users, Megaphone];

const TheShiftSlide = () => {
  const { t } = useTranslation();
  const winItems = winIcons.map((Icon, i) => ({ icon: Icon, text: t(`shift.win.${i}`) }));

  return (
    <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden pt-14 pb-8 px-5 md:p-24 flex flex-col items-center justify-start md:justify-center">
      <PatternVisual />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start w-full max-w-[1600px] mx-auto">
        <div className="flex-1 max-w-[800px]">
          <h1 className="text-2xl md:text-7xl t-hero text-on-visual mb-4 md:mb-10 md:whitespace-nowrap">{t('shift.title')}</h1>
          <p className="text-base md:text-3xl text-on-visual-soft font-medium leading-relaxed mb-6 md:mb-12">
            {t('shift.subtitle')}
          </p>

          <p className="t-eyebrow text-sm md:text-lg text-on-visual-accent mb-4 md:mb-6">{t('shift.section')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {winItems.map((item, i) => (
              <GlassPanel key={i} variant="subtle" className="p-4 md:p-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <item.icon size={20} className="text-primary shrink-0 md:w-[26px] md:h-[26px]" />
                  <p className="text-sm md:text-xl text-foreground">{item.text}</p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* Visual — desktop only */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-[500px] mt-[154px] ml-[100px]">
          <svg viewBox="0 0 400 420" className="w-full h-full max-w-[420px] max-h-[420px]">
            <defs>
              <linearGradient id="phoneGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.04" />
              </linearGradient>
              <filter id="cardGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g opacity="0.5" transform="translate(30, 60)">
              <rect x="0" y="0" width="140" height="260" rx="16" fill="url(#phoneGrad)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.2" />
              <rect x="12" y="30" width="116" height="40" rx="6" fill="hsl(var(--primary))" fillOpacity="0.06" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeOpacity="0.15">
                <animate attributeName="fillOpacity" values="0.04;0.1;0.04" dur="3s" repeatCount="indefinite" />
              </rect>
              <rect x="12" y="80" width="116" height="40" rx="6" fill="hsl(var(--primary))" fillOpacity="0.04" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeOpacity="0.1" />
              <rect x="12" y="130" width="116" height="40" rx="6" fill="hsl(var(--primary))" fillOpacity="0.04" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeOpacity="0.1" />
              <polygon points="55,42 55,58 68,50" fill="hsl(var(--primary))" fillOpacity="0.4" />
            </g>
            <g transform="translate(120, 20)">
              <rect x="0" y="0" width="160" height="300" rx="18" fill="url(#phoneGrad)" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
              <circle cx="80" cy="12" r="3" fill="hsl(var(--primary))" fillOpacity="0.2" />
              <rect x="14" y="28" width="132" height="70" rx="8" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeOpacity="0.25" filter="url(#cardGlow)">
                <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="2.5s" repeatCount="indefinite" />
              </rect>
              <polygon points="32,52 32,78 52,65" fill="hsl(var(--primary))" fillOpacity="0.5">
                <animate attributeName="fillOpacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
              </polygon>
              <rect x="60" y="50" width="70" height="4" rx="2" fill="hsl(var(--foreground))" fillOpacity="0.2" />
              <rect x="60" y="60" width="50" height="3" rx="1.5" fill="hsl(var(--foreground))" fillOpacity="0.1" />
              <text x="60" y="80" fontSize="10" fill="hsl(var(--primary))" fillOpacity="0.5">♥ 24K</text>
              <text x="105" y="80" fontSize="10" fill="hsl(var(--primary))" fillOpacity="0.35">↗ 8K</text>
              <rect x="14" y="110" width="132" height="55" rx="8" fill="hsl(var(--primary))" fillOpacity="0.05" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeOpacity="0.12" />
              <rect x="14" y="178" width="132" height="55" rx="8" fill="hsl(var(--primary))" fillOpacity="0.04" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeOpacity="0.08" />
              <rect x="14" y="248" width="60" height="18" rx="9" fill="hsl(var(--primary))" fillOpacity="0.15" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.3" />
              <text x="26" y="260" fontSize="8" fill="hsl(var(--primary))" fillOpacity="0.7" fontWeight="bold">🔥 Trending</text>
            </g>
            <g opacity="0.45" transform="translate(230, 80)">
              <rect x="0" y="0" width="140" height="240" rx="16" fill="url(#phoneGrad)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.18" />
              <rect x="12" y="25" width="116" height="45" rx="6" fill="hsl(var(--primary))" fillOpacity="0.05" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeOpacity="0.1" />
              <rect x="12" y="80" width="116" height="45" rx="6" fill="hsl(var(--primary))" fillOpacity="0.04" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeOpacity="0.08" />
              <rect x="12" y="135" width="116" height="45" rx="6" fill="hsl(var(--primary))" fillOpacity="0.03" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeOpacity="0.06" />
            </g>
            {[
              { cx: 170, cy: 330, delay: 0 },
              { cx: 100, cy: 180, delay: 1.2 },
              { cx: 300, cy: 200, delay: 0.6 },
              { cx: 250, cy: 360, delay: 1.8 },
            ].map((dot, i) => (
              <circle key={`sig-${i}`} cx={dot.cx} cy={dot.cy} r="3" fill="hsl(var(--primary))" filter="url(#cardGlow)">
                <animate attributeName="opacity" values="0;0.6;0" dur="2.5s" begin={`${dot.delay}s`} repeatCount="indefinite" />
                <animate attributeName="r" values="2;5;2" dur="2.5s" begin={`${dot.delay}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TheShiftSlide;
