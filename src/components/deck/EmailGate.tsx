import { useState } from 'react';
import aiLogo from '@/assets/artist-influence-logo.png';
import { z } from 'zod';
import GlassPanel from './GlassPanel';
import { supabase } from '@/integrations/supabase/client';

const emailSchema = z.string().trim().email('Please enter a valid email address').max(255);

interface EmailGateProps {
  onAccess: () => void;
}

const EmailGate = ({ onAccess }: EmailGateProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      await supabase.from('deck_leads').insert({ email: result.data });
      supabase.functions.invoke('send-email', {
        body: {
          to: 'hello@artistinfluence.com',
          subject: `New Deck Lead (Festivals): ${result.data}`,
          html: `<div style="font-family:sans-serif"><h2 style="color:#0ea5e9">New Deck Viewer</h2><p><strong>${result.data}</strong> just viewed the Artist Influence deck.</p><p style="color:#888;font-size:12px">${new Date().toLocaleString()}</p></div>`,
        },
      }).catch(() => {});
      localStorage.setItem('ai_deck_email', result.data);
      onAccess();
    } catch {
      // Still grant access even if DB insert fails
      localStorage.setItem('ai_deck_email', result.data);
      onAccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-dvh w-full flex items-center justify-center overflow-hidden relative px-4">
      {/* Soft focus halo behind the card; global AmbientGlow supplies the drift. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--coral) / 0.14), transparent 70%)' }}
      />

      <GlassPanel variant="bright" noTilt className="relative z-10 w-full max-w-md px-5 pt-0 pb-6 text-center">
        <div className="w-72 mx-auto overflow-hidden" style={{ marginTop: '-2rem', marginBottom: '-3.5rem' }}>
          <img src={aiLogo} alt="Artist Influence" className="w-full" />
        </div>
        <p className="t-eyebrow text-[0.68rem] mb-5">Festivals · Tours · Live Events</p>

        <div className="mb-6">
          <h2 className="t-h2 text-3xl mb-1.5">View our <em>Deck</em></h2>
          <p className="text-muted-foreground text-sm">Enter your email to access our live-event growth deck.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full h-12 rounded-xl border border-border bg-secondary/50 px-4 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm backdrop-blur-sm"
              autoFocus
            />
            {error && <p className="text-destructive text-xs mt-2 text-left">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-coral w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'View our Deck'}
          </button>
        </form>

        <p className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mt-5">Confidential. For intended recipients only.</p>
      </GlassPanel>
    </div>
  );
};

export default EmailGate;
