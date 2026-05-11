import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

// Code-split each slide so the initial bundle stays small.
// Each slide + its image imports becomes its own chunk, loaded on demand.
const CoverSlide = lazy(() => import('./CoverSlide'));
const OperatingSystemSlide = lazy(() => import('./OperatingSystemSlide'));
const UnifiedOpsSlide = lazy(() => import('./UnifiedOpsSlide'));
const TheShiftSlide = lazy(() => import('./TheShiftSlide'));
const WhatWeDoSlide = lazy(() => import('./WhatWeDoSlide'));
const ClientPortalSlide = lazy(() => import('./ClientPortalSlide'));
const ClippingSlide = lazy(() => import('./ClippingSlide'));
const CreatorFloodSlide = lazy(() => import('./CreatorFloodSlide'));
const Top50TrendingSlide = lazy(() => import('./Top50TrendingSlide'));
const CultureEditsSlide = lazy(() => import('./CultureEditsSlide'));
const YouTubeAdsSlide = lazy(() => import('./YouTubeAdsSlide'));
const SpotifyPlaylistingSlide = lazy(() => import('./SpotifyPlaylistingSlide'));
const SoundCloudRepostsSlide = lazy(() => import('./SoundCloudRepostsSlide'));
const InstagramSeedingSlide = lazy(() => import('./InstagramSeedingSlide'));
const AdditionalServicesSlide = lazy(() => import('./AdditionalServicesSlide'));
const WebsitesSlide = lazy(() => import('./WebsitesSlide'));
const IdIdSlide = lazy(() => import('./IdIdSlide'));
const PricingSlide = lazy(() => import('./PricingSlide'));
const NextStepsSlide = lazy(() => import('./NextStepsSlide'));

export const slides: LazyExoticComponent<ComponentType>[] = [
  CoverSlide,
  OperatingSystemSlide,
  UnifiedOpsSlide,
  TheShiftSlide,
  WhatWeDoSlide,
  ClientPortalSlide,
  ClippingSlide,
  CreatorFloodSlide,
  Top50TrendingSlide,
  CultureEditsSlide,
  YouTubeAdsSlide,
  SpotifyPlaylistingSlide,
  SoundCloudRepostsSlide,
  InstagramSeedingSlide,
  AdditionalServicesSlide,
  WebsitesSlide,
  IdIdSlide,
  PricingSlide,
  NextStepsSlide,
];
