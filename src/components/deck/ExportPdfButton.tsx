import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

interface ExportPdfButtonProps {
  setExportSlideIndex: (i: number | null) => void;
  totalSlides: number;
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
const nextFrame = () => new Promise(r => requestAnimationFrame(() => r(null)));

// Race a promise against a timeout. Rejects with Error('timeout') if exceeded.
function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error(`timeout: ${label}`)), ms);
    p.then(
      (v) => { clearTimeout(id); resolve(v); },
      (e) => { clearTimeout(id); reject(e); }
    );
  });
}

const PER_SLIDE_TIMEOUT_MS = 8000;
const IMAGE_READY_TIMEOUT_MS = 3000;

const ExportPdfButton = ({ setExportSlideIndex, totalSlides }: ExportPdfButtonProps) => {
  const [exporting, setExporting] = useState(false);

  const exportPdf = async () => {
    setExporting(true);
    let currentDismiss = toast({
      title: 'Exporting PDF...',
      description: `Capturing slide 1 of ${totalSlides}`,
      duration: 600000,
    }).dismiss;

    const updateToast = (message: string) => {
      currentDismiss();
      currentDismiss = toast({
        title: 'Exporting PDF...',
        description: message,
        duration: 600000,
      }).dismiss;
    };

    // Resolve --background to a concrete color
    const bgVar = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
    const backgroundColor = bgVar ? `hsl(${bgVar})` : '#000000';

    // Freeze all CSS animations/transitions during capture
    const pauseStyle = document.createElement('style');
    pauseStyle.id = 'pdf-export-pause-animations';
    pauseStyle.textContent = `
      .exporting-pdf *, .exporting-pdf *::before, .exporting-pdf *::after {
        animation-play-state: paused !important;
        animation-delay: -1s !important;
        animation-duration: 0s !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(pauseStyle);
    document.documentElement.classList.add('exporting-pdf');

    const skipped: number[] = [];

    // Capture a single slide. Returns a JPEG dataURL or throws.
    const captureSlide = async (i: number): Promise<string> => {
      // Mount this slide into the offscreen portal (remount to reset state)
      setExportSlideIndex(null);
      await nextFrame();
      setExportSlideIndex(i);

      // Wait for React paint
      await nextFrame();
      await nextFrame();

      // Fonts (instant after first slide)
      try { await withTimeout((document as any).fonts?.ready ?? Promise.resolve(), 1500, 'fonts'); } catch {}

      const slideEl = document.getElementById('export-capture') as HTMLElement | null;
      if (!slideEl) throw new Error('export-capture not found');

      // Bounded image readiness
      const imgs = Array.from(slideEl.querySelectorAll('img'));
      try {
        await withTimeout(
          Promise.all(
            imgs.map(img =>
              img.complete && img.naturalWidth > 0
                ? Promise.resolve()
                : new Promise<void>((res) => {
                    const done = () => res();
                    img.addEventListener('load', done, { once: true });
                    img.addEventListener('error', done, { once: true });
                    img.decode?.().then(done).catch(done);
                  })
            )
          ),
          IMAGE_READY_TIMEOUT_MS,
          'images'
        );
      } catch {
        // proceed — html2canvas can still render placeholders
      }

      await nextFrame();

      const canvas = await withTimeout(
        html2canvas(slideEl, {
          width: 1920,
          height: 1080,
          windowWidth: 1920,
          windowHeight: 1080,
          scale: 1,
          useCORS: true,
          backgroundColor,
          logging: false,
          imageTimeout: 2000,
          removeContainer: true,
        }),
        PER_SLIDE_TIMEOUT_MS,
        'html2canvas'
      );

      return canvas.toDataURL('image/jpeg', 0.85);
    };

    try {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });
      let pagesAdded = 0;

      for (let i = 0; i < totalSlides; i++) {
        updateToast(`Capturing slide ${i + 1} of ${totalSlides}`);

        let imgData: string | null = null;
        try {
          imgData = await captureSlide(i);
        } catch (err) {
          console.warn(`Slide ${i + 1} attempt 1 failed:`, err);
          updateToast(`Retrying slide ${i + 1}...`);
          // Force remount + brief settle then retry once
          setExportSlideIndex(null);
          await delay(150);
          try {
            imgData = await captureSlide(i);
          } catch (err2) {
            console.error(`Slide ${i + 1} retry failed, skipping:`, err2);
            skipped.push(i + 1);
          }
        }

        if (imgData) {
          if (pagesAdded > 0) doc.addPage([1920, 1080], 'landscape');
          doc.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
          pagesAdded++;
        }
      }

      if (pagesAdded === 0) {
        throw new Error('No slides captured');
      }

      doc.save('Artist-Influence-Deck.pdf');
      currentDismiss();
      toast({
        title: 'Export complete',
        description: skipped.length
          ? `PDF downloaded — skipped slide${skipped.length > 1 ? 's' : ''} ${skipped.join(', ')}.`
          : 'PDF downloaded successfully.',
      });
    } catch (err) {
      console.error('PDF export error:', err);
      currentDismiss();
      toast({ title: 'Export failed', description: 'Something went wrong.', variant: 'destructive' });
    } finally {
      document.documentElement.classList.remove('exporting-pdf');
      document.getElementById('pdf-export-pause-animations')?.remove();
      setExportSlideIndex(null);
      setExporting(false);
    }
  };

  return (
    <button
      onClick={exportPdf}
      disabled={exporting}
      className="p-2 rounded-lg hover:bg-secondary transition disabled:opacity-50"
      title="Export PDF"
    >
      {exporting ? <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" /> : <Download className="w-4 h-4 text-muted-foreground" />}
    </button>
  );
};

export default ExportPdfButton;
