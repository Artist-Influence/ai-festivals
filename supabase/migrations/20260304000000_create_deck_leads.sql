CREATE TABLE public.deck_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  deck_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sent_in_digest BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE public.deck_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
ON public.deck_leads
FOR INSERT
TO anon
WITH CHECK (true);

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
