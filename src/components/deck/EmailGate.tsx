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
          subject: `New Deck Lead (Music): ${result.data}`,
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
    <div className="h-screen w-screen flex items-center justify-center bg-background overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <GlassPanel variant="bright" className="relative z-10 w-full max-w-md mx-4 px-4 pt-0 pb-4 text-center">
        <div className="w-72 mx-auto overflow-hidden" style={{ marginTop: '-2rem', marginBottom: '-3.5rem' }}>
          <img src={aiLogo} alt="Artist Influence" className="w-full" />
        </div>
        <p className="text-muted-foreground text-sm mb-3">The growth system for modern music</p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-1">View our Deck</h2>
          <p className="text-muted-foreground text-sm">Enter your email to access our growth system deck.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full h-12 rounded-xl border border-border bg-secondary/50 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm backdrop-blur-sm"
              autoFocus
            />
            {error && <p className="text-destructive text-xs mt-2 text-left">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'View our Deck'}
          </button>
        </form>

        <p className="text-muted-foreground/50 text-[10px] mt-4">Confidential — for intended recipients only</p>
      </GlassPanel>
    </div>
  );
};

export default EmailGate;
