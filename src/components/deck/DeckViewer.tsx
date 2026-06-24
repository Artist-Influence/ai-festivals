import { useState, useEffect, useCallback, useRef, Suspense, type ReactNode } from 'react';

import aiLogo from '@/assets/ai-logo-lockup.png';
import { ChevronLeft, ChevronRight, ChevronUp, Maximize, Minimize, LayoutGrid, PanelLeftClose, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from '@/i18n/LanguageContext';
import ScaledSlide from './ScaledSlide';
import { slides } from './slides';
import ExportPdfButton from './ExportPdfButton';
import LanguagePicker from './LanguagePicker';

/**
 * Wraps the active slide. The actual reveal is a CSS animation on the
 * .slide-stage targets (eyebrow, title, cards, [data-reveal]) so it survives
 * re-renders; this component only assigns each target a staggered delay
 * (--rd) in DOM order, re-running via a MutationObserver as lazily-resolved
 * (Suspense) content mounts. Reduced-motion disables the animation in CSS.
 */
const SlideStage = ({ index, children }: { index: number; children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let applied = false;
    const run = () => {
      if (applied || !root) return;
      const targets = Array.from(
        root.querySelectorAll<HTMLElement>('.t-eyebrow, .t-hero, h1, h2, .gp-card, [data-reveal]')
      );
      if (!targets.length) return;
      applied = true;
      // Stagger delay only; the CSS `stage-reveal` animation handles the reveal.
      targets.forEach((el, i) => el.style.setProperty('--rd', `${Math.min(i, 9) * 70}ms`));
    };
    run();
    const mo = new MutationObserver(run);
    mo.observe(root, { childList: true, subtree: true });
    const stop = window.setTimeout(() => mo.disconnect(), 1500);
    return () => {
      mo.disconnect();
      window.clearTimeout(stop);
    };
  }, [index]);
  return (
    <div ref={ref} className="slide-stage w-full h-full">
      {children}
    </div>
  );
};

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
      <div className="h-dvh p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="t-h3 text-2xl">{t('ui.allSlides')}</h2>
          <button onClick={() => setGrid(false)} className="mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition">{t('ui.close')}</button>
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
    <div className="h-dvh flex overflow-hidden">
      {sidebar && !fullscreen && (
        <div className="w-48 border-r border-border flex flex-col bg-card/60 backdrop-blur-md shrink-0">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">{t('ui.slides')}</span>
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
          <div className="flex items-center justify-between px-4 h-12 border-b border-border bg-card/40 backdrop-blur-md shrink-0">
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
          {/* Glowing progress rail */}
          <div className="absolute top-0 inset-x-0 h-px z-40 bg-white/[0.05]">
            <div
              className="h-full bg-primary shadow-[0_0_8px_hsl(var(--primary))] transition-[width] duration-500 ease-out"
              style={{ width: `${((current + 1) / slides.length) * 100}%` }}
            />
          </div>
          <SlideStage key={current} index={current}>
            <ScaledSlide>
              <Suspense fallback={<div className="w-full h-full" />}>
                <Slide />
              </Suspense>
            </ScaledSlide>
          </SlideStage>
        </div>

        <div className={cn(
          'flex items-center justify-center gap-4 h-12 shrink-0',
          fullscreen && 'absolute bottom-6 left-1/2 -translate-x-1/2 h-auto bg-card/70 backdrop-blur-md border border-border rounded-full px-6 py-2 z-50'
        )}>
          <button onClick={prev} disabled={current === 0} className="p-1.5 rounded-full hover:bg-secondary hover:text-primary text-foreground transition disabled:opacity-20">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted-foreground font-mono num tracking-wider min-w-[64px] text-center">{current + 1} / {slides.length}</span>
          <button onClick={next} disabled={current === slides.length - 1} className="p-1.5 rounded-full hover:bg-secondary hover:text-primary text-foreground transition disabled:opacity-20">
            <ChevronRight className="w-4 h-4" />
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initialIndex = useRef(current);
  const [snap, setSnap] = useState(current);
  const [showCounter, setShowCounter] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);

  // Jump to initial slide on mount, without smooth animation
  useEffect(() => {
    const el = slideRefs.current[initialIndex.current];
    if (el) el.scrollIntoView({ block: 'start', behavior: 'auto' });
  }, []);

  // Observe which slide is most in view
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best = { idx: snap, ratio: 0 };
        for (const e of entries) {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (e.intersectionRatio > best.ratio) best = { idx, ratio: e.intersectionRatio };
        }
        if (best.ratio > 0.55 && best.idx !== snap) setSnap(best.idx);
      },
      { root, threshold: [0.4, 0.6, 0.8] }
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [snap]);

  // Track scroll progress through the deck
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
      if (hintVisible) setHintVisible(false);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [hintVisible]);

  useEffect(() => {
    setCurrent(snap);
  }, [snap, setCurrent]);

  useEffect(() => {
    setShowCounter(true);
    const t = window.setTimeout(() => setShowCounter(false), 1800);
    return () => window.clearTimeout(t);
  }, [snap]);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-foreground/5"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

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

      <div
        ref={scrollerRef}
        className="h-dvh w-full overflow-y-auto overscroll-y-contain snap-y snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' as any, scrollBehavior: 'smooth' }}
      >
        {slides.map((S, i) => (
          <div
            key={i}
            data-idx={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className="snap-start snap-always w-full min-h-dvh bg-background"
          >
            <ScaledSlide isMobile>
              <Suspense fallback={<div className="min-h-dvh w-full bg-background" />}>
                <S />
              </Suspense>
            </ScaledSlide>
          </div>
        ))}
      </div>

      {/* First-load swipe hint */}
      {hintVisible && snap === 0 && (
        <div
          className="pointer-events-none fixed bottom-16 inset-x-0 z-50 flex flex-col items-center gap-1 text-muted-foreground/70 animate-bounce"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Swipe up</span>
          <ChevronUp className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default DeckViewer;
