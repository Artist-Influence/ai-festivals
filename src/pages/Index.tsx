import { useEffect, useState } from 'react';
import DeckViewer from '@/components/deck/DeckViewer';
import EmailGate from '@/components/deck/EmailGate';
import ErrorBoundary from '@/components/ErrorBoundary';
import AmbientGlow from '@/components/deck/AmbientGlow';
import CursorDot from '@/components/deck/CursorDot';

const readGate = (): boolean => {
  try {
    return !!localStorage.getItem('ai_deck_email');
  } catch {
    return false;
  }
};

const Index = () => {
  const [hasAccess, setHasAccess] = useState(readGate);

  useEffect(() => {
    document.title = 'Artist Influence | The Growth System for Modern Festivals';
  }, []);

  return (
    <ErrorBoundary>
      <AmbientGlow />
      <div className="relative z-[1]">
        {hasAccess ? <DeckViewer /> : <EmailGate onAccess={() => setHasAccess(true)} />}
      </div>
      <CursorDot />
    </ErrorBoundary>
  );
};

export default Index;
