## Goal

Remix the existing Artist Influence music deck into an **Event Growth System™** deck for festivals, promoters, venues, touring teams, and event producers. Keep the same dark cinematic visual system (oxblood/red accents, glass cards, AtelierField + Pattern visuals, typography, slide rhythm). Update copy, swap case study data, add new event-specific slides.

## Final Slide Order (21 slides)

```
1.  Cover — Event Growth System™
2.  Operating System for modern event growth        (reused: OperatingSystemSlide)
3.  Unified Ops is the core                          (reused: UnifiedOpsSlide)
4.  Event discovery has changed                      (reused: TheShiftSlide)
5.  Coordinated event distribution                   (reused: WhatWeDoSlide)
6.  The Problem — fragmented event marketing         (NEW)
7.  Our Solution — full-stack event engine           (NEW)
8.  Client Portal                                    (reused: ClientPortalSlide)
9.  Ticket Sales Funnel                              (NEW)
10. Clipping Distribution                            (reused: ClippingSlide)
11. Instagram Seeding / Cultural Distribution        (reused: InstagramSeedingSlide)
12. Meta & TikTok Ads                                (reused: AdditionalServicesSlide or similar)
13. Zeds Dead Phase 2 Campaign Report                (NEW)
14. Final Push Strategy                              (NEW)
15. YouTube Advertising                              (reused: YouTubeAdsSlide)
16. SoundCloud Reposts                               (reused: SoundCloudRepostsSlide)
17. Websites & Digital Infrastructure                (reused: WebsitesSlide)
18. What We Need To Launch                           (NEW — replaces IdIdSlide role)
19. Post-Event Flywheel                              (NEW)
20. Customized & A La Carte Pricing                  (reused: PricingSlide)
21. Ready to build demand?                           (reused: NextStepsSlide)
```

Slides being **dropped** from the music deck: CreatorFloodSlide, Top50TrendingSlide, CultureEditsSlide, SpotifyPlaylistingSlide, IdIdSlide.

## Implementation Approach

### Copy updates (i18n)
All slide copy lives in `src/i18n/en.ts` (and 8 other locale files). I will:
- Rewrite English keys for every reused slide using the new event-focused copy provided.
- Keep the other 8 locales in place as placeholders pointing to English (or update only English now and leave non-English as-is to avoid stale translations). **Recommendation: update English only**, since non-English copy would otherwise be wrong; we can re-translate later.
- Update `cover.tagline`, `cover.subtitle`, `cover.confidential`, plus all `opSystem.*`, `unifiedOps.*`, `shift.*`, `whatWeDo.*`, `clientPortal.*`, `clipping.*`, `instagramSeeding.*`, `youtubeAds.*`, `soundcloudReposts.*`, `websites.*`, `pricing.*`, `nextSteps.*`.

### Visual swaps
- **WhatWeDoSlide** HubDiagram: change center node label from `Your Song` → `Your Event`, swap satellite labels to *Short-form Content / Local Culture / Ticketing Platforms / Retargeting / Creators*. Add a 4th node so we have 4 satellites instead of 3.
- **ClientPortalSlide**: keep video, but if the campaign list is editable in the video poster/asset, leave a TODO note (video itself is `client-portal.mp4` — non-editable, so we just update surrounding copy).
- **ClippingSlide / YouTubeAdsSlide / SoundCloudRepostsSlide**: keep layout, swap right-side case-card stat labels and overview copy.
- **AdditionalServicesSlide → Meta & TikTok Ads**: rebuild as a dedicated Meta/TikTok slide (mirroring the YouTubeAds layout) with the new Zeds Dead Phase 2 stats ($1,230 spent, 385,236 impressions, 17,620 link clicks, 5.61% CTR, $0.057 CPC) and a 3-city callout row (NYC / LA / Toronto).

### New slide components

1. **TheProblemSlide.tsx** — 4-card grid on `AtelierFieldVisual`, headline "Most events don't fail because of the lineup." + bottom line bar.
2. **OurSolutionSlide.tsx** — 4-card grid (Cultural Distribution, Creator Amplification, Paid Media, Conversion Infrastructure).
3. **TicketFunnelSlide.tsx** — Vertical funnel SVG with 5 stages (Awareness → Intent → Retargeting → Conversion → Flywheel), GlassPanel descriptions on the right.
4. **ZedsDeadPhase2Slide.tsx** — Dashboard-style stat grid: 5 top stat cards (spend / impressions / clicks / CTR / CPC), then 6 city cards with colored "Top Performer / High Efficiency / Highest Volume" tags.
5. **FinalPushStrategySlide.tsx** — Headline + body + 6 budget cards by city + key bullets (launch date, total budget, objective, markets).
6. **WhatWeNeedSlide.tsx** — Two-column "Required" / "Strongly recommended" checklists + pixel callout box.
7. **PostEventFlywheelSlide.tsx** — 4-card grid (Recap Content, Social Proof, Audience Retargeting, Market Learnings) + bottom line.
8. **CoverSlide.tsx** — Update copy to "Event Growth System™" / new subtitle / footer.

### Wiring
- Update `src/components/deck/slides/index.tsx` to lazy-import the new slides and reorder the `slides` array per the final order above.
- Remove unused imports (CreatorFlood, Top50Trending, CultureEdits, SpotifyPlaylisting, IdId) from the slides array but keep the files on disk so nothing else breaks.
- Update `.lovable/memory/features/deck-structure.md` and `mem://index.md` core rule to reflect the 21-slide event deck.

### EmailGate
- Update copy: "View our Event Growth deck" + change Resend subject from "New Deck Lead (Music)" → "New Deck Lead (Events)".

### Design system
No token changes — reuse existing primary red, AtelierFieldVisual, PatternVisual, GlassPanel, stat-card patterns. New slides will follow the same `min-h-dvh md:h-full` mobile/desktop pattern as existing slides.

## Out of scope
- Translating new copy to the other 8 languages (will mark a follow-up).
- Re-recording the Client Portal video.
- New brand visuals/photography.
