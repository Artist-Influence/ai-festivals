import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import { locales } from '@/i18n/locales';
import { cn } from '@/lib/utils';

const LanguagePicker = ({ className }: { className?: string }) => {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = locales.find(l => l.code === locale) || locales[0];

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-background/70 backdrop-blur-md border border-border/40 hover:bg-secondary transition text-sm"
        title="Change language"
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-medium">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-xl py-1 min-w-[200px] max-h-[70vh] overflow-auto">
          {locales.map(l => (
            <button
              key={l.code}
              onClick={() => { setLocale(l.code); setOpen(false); }}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-3 md:py-2 text-sm hover:bg-secondary/60 transition-colors text-left',
                l.code === locale && 'bg-primary/10 text-primary'
              )}
            >
              <span className="text-base">{l.flag}</span>
              <span className={cn('text-foreground', l.code === locale && 'text-primary font-medium')}>
                {l.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguagePicker;
