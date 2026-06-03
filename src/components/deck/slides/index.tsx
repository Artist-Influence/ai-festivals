import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

// Code-split each slide so the initial bundle stays small.
const CoverSlide = lazy(() => import('./CoverSlide'));
const OperatingSystemSlide = lazy(() => import('./OperatingSystemSlide'));
const UnifiedOpsSlide = lazy(() => import('./UnifiedOpsSlide'));
const TheShiftSlide = lazy(() => import('./TheShiftSlide'));
const WhatWeDoSlide = lazy(() => import('./WhatWeDoSlide'));
const TheProblemSlide = lazy(() => import('./TheProblemSlide'));
const OurSolutionSlide = lazy(() => import('./OurSolutionSlide'));
const ClientPortalSlide = lazy(() => import('./ClientPortalSlide'));
const TicketFunnelSlide = lazy(() => import('./TicketFunnelSlide'));
const ClippingSlide = lazy(() => import('./ClippingSlide'));
const InstagramSeedingSlide = lazy(() => import('./InstagramSeedingSlide'));
const AdditionalServicesSlide = lazy(() => import('./AdditionalServicesSlide'));
const MashBitPhase2Slide = lazy(() => import('./MashBitPhase2Slide'));
const ZedsDeadPhase2Slide = lazy(() => import('./ZedsDeadPhase2Slide'));
const FinalPushStrategySlide = lazy(() => import('./FinalPushStrategySlide'));
const YouTubeAdsSlide = lazy(() => import('./YouTubeAdsSlide'));
const SoundCloudRepostsSlide = lazy(() => import('./SoundCloudRepostsSlide'));
const WebsitesSlide = lazy(() => import('./WebsitesSlide'));
const WhatWeNeedSlide = lazy(() => import('./WhatWeNeedSlide'));
const PostEventFlywheelSlide = lazy(() => import('./PostEventFlywheelSlide'));
const PricingSlide = lazy(() => import('./PricingSlide'));
const NextStepsSlide = lazy(() => import('./NextStepsSlide'));

export const slides: LazyExoticComponent<ComponentType>[] = [
  CoverSlide,                 // 1
  OperatingSystemSlide,       // 2
  UnifiedOpsSlide,            // 3
  TheShiftSlide,              // 4
  WhatWeDoSlide,              // 5
  TheProblemSlide,            // 6
  OurSolutionSlide,           // 7
  ClientPortalSlide,          // 8
  TicketFunnelSlide,          // 9
  ClippingSlide,              // 10
  InstagramSeedingSlide,      // 11
  AdditionalServicesSlide,    // 12 — Meta & TikTok Ads
  MashBitPhase2Slide,         // 13 — MashBit deep-dive
  ZedsDeadPhase2Slide,        // 14
  FinalPushStrategySlide,     // 14
  YouTubeAdsSlide,            // 15
  SoundCloudRepostsSlide,     // 16
  WebsitesSlide,              // 17
  WhatWeNeedSlide,            // 18
  PostEventFlywheelSlide,     // 19
  PricingSlide,               // 20
  NextStepsSlide,             // 21
];
