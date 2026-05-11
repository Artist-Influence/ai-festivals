import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const isChunkLoadError = (err: unknown): boolean => {
  if (!err) return false;
  const e = err as { name?: string; message?: string };
  const msg = (e.message || '').toLowerCase();
  return (
    e.name === 'ChunkLoadError' ||
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('importing a module script failed') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes("'text/html' is not a valid javascript mime type")
  );
};

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('App crashed:', error, info);

    // Stale-deploy recovery: if a code-split chunk failed to load (very common
    // on Safari after a redeploy or with a half-cached service-worker state),
    // hard-reload exactly once with a cache-busting query param.
    if (isChunkLoadError(error)) {
      try {
        const tried = sessionStorage.getItem('ai_chunk_recovery');
        if (!tried) {
          sessionStorage.setItem('ai_chunk_recovery', '1');
          const url = new URL(window.location.href);
          url.searchParams.set('v', Date.now().toString());
          window.location.replace(url.toString());
        }
      } catch {
        window.location.reload();
      }
    }
  }

  handleReset = () => {
    try {
      localStorage.removeItem('ai_deck_email');
      sessionStorage.removeItem('ai_chunk_recovery');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // For chunk-load errors we've already triggered a reload; show a neutral
      // loading state instead of an error UI to avoid flashing scary copy.
      if (isChunkLoadError(this.state.error)) {
        return (
          <div className="min-h-dvh flex items-center justify-center bg-background">
            <div className="text-sm text-muted-foreground">Loading…</div>
          </div>
        );
      }

      return (
        <div className="min-h-dvh flex items-center justify-center bg-background p-6">
          <div className="max-w-md w-full text-center space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              The deck hit an unexpected error while loading. Try reloading — if it keeps happening,
              clearing site data usually resolves it.
            </p>
            {this.state.error?.message && (
              <pre className="text-xs text-muted-foreground/70 bg-secondary/40 rounded p-3 text-left overflow-auto max-h-40">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition"
            >
              Reset and reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
