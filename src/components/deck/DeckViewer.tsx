import { useState, useEffect, useCallback, Suspense } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import aiLogo from '@/assets/ai-logo-lockup.png';
import { ChevronLeft, ChevronRight, Maximize, Minimize, LayoutGrid, PanelLeftClose, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from '@/i18n/LanguageContext';
import ScaledSlide from './ScaledSlide';
import { slides } from './slides';
import ExportPdfButton from './ExportPdfButton';
import LanguagePicker from './LanguagePicker';

const DeckViewer = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [sidebar, setSidebar] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [grid, setGrid] = useState(false);
  const [exportSlideIndex, setExportSlideIndex] = useState<number | null>(null);

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, slides.length - 1)), []);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
      else if (e.key === 'f') toggleFs();
      else if (e.key === 'g') setGrid(v => !v);
      else if (e.key === 'Escape') { setGrid(false); if (document.fullscreenElement) document.exitFullscreen(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const handleEdgeTap = useCallback((e: React.MouseEvent) => {
    if (!isMobile) return;
    const x = e.clientX;
    const w = window.innerWidth;
    if (x < w * 0.15) prev();
    else if (x > w * 0.85) next();
  }, [isMobile, next, prev]);

  useEffect(() => {
    if (isMobile) setSidebar(false);
  }, [isMobile]);

  useEffect(() => {
    const h = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const toggleFs = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };

  const Slide = slides[current];

  if (grid) {
    return (
      <div className="h-dvh bg-background p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-foreground text-xl font-semibold">{t('ui.allSlides')}</h2>
          <button onClick={() => setGrid(false)} className="text-sm text-muted-foreground hover:text-foreground transition">{t('ui.close')}</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slides.map((S, i) => (
            <button key={i} onClick={() => { setCurrent(i); setGrid(false); }}
              className={cn('relative aspect-video rounded-lg overflow-hidden border-2 transition-all hover:scale-[1.02]',
                i === current ? 'border-primary' : 'border-border hover:border-primary/40')}>
              <ScaledSlide><Suspense fallback={null}><S /></Suspense></ScaledSlide>
              <span className="absolute bottom-1 right-2 text-xs text-muted-foreground font-mono">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isMobile) {
    return <MobilePager current={current} setCurrent={setCurrent} />;
  }

  return (
    <div className="h-dvh flex bg-background overflow-hidden">
      {sidebar && !fullscreen && (
        <div className="w-48 border-r border-border flex flex-col bg-card/50 backdrop-blur-sm shrink-0">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.15em]">{t('ui.slides')}</span>
            <button onClick={() => setSidebar(false)} className="text-muted-foreground hover:text-foreground transition">
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-1.5">
            {slides.map((S, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={cn('w-full aspect-video rounded overflow-hidden border transition-all',
                  i === current ? 'border-primary ring-1 ring-primary/30' : 'border-border/50 hover:border-border')}>
                <ScaledSlide><Suspense fallback={null}><S /></Suspense></ScaledSlide>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {!fullscreen && (
          <div className="flex items-center justify-between px-4 h-12 border-b border-border shrink-0">
            <div className="flex items-center gap-3">
              {!sidebar && (
                <button onClick={() => setSidebar(true)} className="text-muted-foreground hover:text-foreground transition">
                  <PanelLeft className="w-4 h-4" />
                </button>
              )}
              <img src={aiLogo} alt="Artist Influence" className="h-5" />
            </div>
            <div className="flex items-center gap-1">
              
              <LanguagePicker />
              <ExportPdfButton setExportSlideIndex={setExportSlideIndex} totalSlides={slides.length} />
              <button onClick={() => setGrid(true)} className="p-2 rounded-lg hover:bg-secondary transition" title="Grid view (G)">
                <LayoutGrid className="w-4 h-4 text-muted-foreground" />
              </button>
              <button onClick={toggleFs} className="p-2 rounded-lg hover:bg-secondary transition" title="Fullscreen (F)">
                {fullscreen ? <Minimize className="w-4 h-4 text-muted-foreground" /> : <Maximize className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 relative min-h-0">
          <div key={current} className="w-full h-full animate-fade-in">
            <ScaledSlide>
              <Suspense fallback={<div className="w-full h-full bg-background" />}>
                <Slide />
              </Suspense>
            </ScaledSlide>
          </div>
        </div>

        <div className={cn(
          'flex items-center justify-center gap-4 h-12 shrink-0',
          fullscreen && 'absolute bottom-6 left-1/2 -translate-x-1/2 h-auto bg-background/60 backdrop-blur-md rounded-full px-6 py-2 z-50'
        )}>
          <button onClick={prev} disabled={current === 0} className="p-1.5 rounded hover:bg-secondary transition disabled:opacity-20">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <span className="text-xs text-muted-foreground font-mono min-w-[60px] text-center">{current + 1} / {slides.length}</span>
          <button onClick={next} disabled={current === slides.length - 1} className="p-1.5 rounded hover:bg-secondary transition disabled:opacity-20">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Offscreen export portal — renders one slide at a time at native 1920x1080 for PDF capture */}
      {exportSlideIndex !== null && (() => {
        const ExportSlide = slides[exportSlideIndex];
        return (
          <div
            style={{
              position: 'fixed',
              left: -100000,
              top: 0,
              width: 1920,
              height: 1080,
              pointerEvents: 'none',
              zIndex: -1,
            }}
            aria-hidden="true"
          >
            <ScaledSlide forceFullSize>
              <Suspense fallback={null}>
                <ExportSlide />
              </Suspense>
            </ScaledSlide>
          </div>
        );
      })()}
    </div>
  );
};

interface MobilePagerProps {
  current: number;
  setCurrent: (i: number) => void;
}

const MobilePager = ({ current, setCurrent }: MobilePagerProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    containScroll: 'trimSnaps',
  });
  const [snap, setSnap] = useState(current);
  const [showCounter, setShowCounter] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSnap(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    setCurrent(snap);
  }, [snap, setCurrent]);

  useEffect(() => {
    setShowCounter(true);
    const timeout = window.setTimeout(() => setShowCounter(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [snap]);

  useEffect(() => {
    if (emblaApi && current !== emblaApi.selectedScrollSnap()) {
      emblaApi.scrollTo(current, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi]);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      <div
        className={cn(
          'absolute left-3 z-50 rounded-full border border-border/40 bg-background/70 px-3 py-1.5 backdrop-blur-md pointer-events-none transition-opacity duration-300',
          showCounter ? 'opacity-100' : 'opacity-0'
        )}
        style={{ top: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
      >
        <span className="text-xs font-mono text-muted-foreground">
          {snap + 1} / {slides.length}
        </span>
      </div>

      <div className="absolute right-3 z-50" style={{ top: 'calc(env(safe-area-inset-top) + 0.75rem)' }}>
        <LanguagePicker />
      </div>

      <div ref={emblaRef} className="h-dvh w-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {slides.map((S, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 h-dvh overflow-y-auto overscroll-contain bg-background">
              <ScaledSlide isMobile><Suspense fallback={<div className="min-h-dvh w-full bg-background" />}><S /></Suspense></ScaledSlide>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckViewer;
