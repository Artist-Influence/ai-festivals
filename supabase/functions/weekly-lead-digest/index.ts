import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: leads, error: fetchError } = await supabase
      .from("deck_leads")
      .select("id, email, created_at")
      .eq("sent_in_digest", false)
      .order("created_at", { ascending: true });

    if (fetchError) throw fetchError;

    if (!leads || leads.length === 0) {
      return new Response(
        JSON.stringify({ message: "No new leads to send" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const DECK_LABELS: Record<string, string> = {
      music: "Music",
      gaming: "Gaming",
      "tv-film": "TV & Film",
    };

    const rows = leads
      .map(
        (l: any) =>
          `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${l.email}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${new Date(l.created_at).toLocaleDateString()}</td></tr>`
      )
      .join("");

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#0ea5e9">Artist Influence Deck — New Leads</h2>
        <p>${leads.length} new lead${leads.length > 1 ? "s" : ""} this week:</p>
        <table style="width:100%;border-collapse:collapse">
          <thead><tr><th style="text-align:left;padding:8px 12px;border-bottom:2px solid #0ea5e9">Email</th><th style="text-align:left;padding:8px 12px;border-bottom:2px solid #0ea5e9">Date</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;

    // Send email via Supabase Auth admin (uses built-in email service)
    const emailRes = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "hello@artistinfluence.com",
        subject: `Artist Influence Deck — ${leads.length} New Lead${leads.length > 1 ? "s" : ""}`,
        html,
      }),
    });

    // Even if email sending has issues, mark as sent to avoid re-sending
    const leadIds = leads.map((l) => l.id);
    const { error: updateError } = await supabase
      .from("deck_leads")
      .update({ sent_in_digest: true })
      .in("id", leadIds);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({
        message: `Digest sent with ${leads.length} leads`,
        emailStatus: emailRes.ok ? "sent" : "failed",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
