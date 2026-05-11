import { useEffect, useState } from 'react';
import DeckViewer from '@/components/deck/DeckViewer';
import EmailGate from '@/components/deck/EmailGate';
import ErrorBoundary from '@/components/ErrorBoundary';

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
    document.title = 'Artist Influence — The Growth System for Modern Music';
  }, []);

  return (
    <ErrorBoundary>
      {hasAccess ? <DeckViewer /> : <EmailGate onAccess={() => setHasAccess(true)} />}
    </ErrorBoundary>
  );
};

export default Index;
