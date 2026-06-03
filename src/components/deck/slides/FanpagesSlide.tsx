import { Users } from 'lucide-react';
import GlassPanel from '../GlassPanel';
import FanpageVisualizer from '../FanpageVisualizer';
import subtronicsClip1 from '@/assets/subtronics-clip1.jpg';
import skrillexClip1 from '@/assets/skrillex-clip1.png';

const caseStudies = [
  {
    artist: 'Subtronics',
    project: 'Fan Page Network',
    goal: 'Sustained visibility across bass music communities.',
    clip: subtronicsClip1,
    metrics: [
      { val: '5M+', label: 'Views' },
      { val: '150K+', label: 'Likes' },
      { val: '15.9K', label: 'Followers Driven' },
      { val: '600+', label: 'Clips' },
    ],
  },
  {
    artist: 'Skrillex',
    project: 'FUS Album',
    goal: 'Consistent visibility around the album and Ultra set.',
    clip: skrillexClip1,
    metrics: [
      { val: '2.1M+', label: 'Views' },
      { val: '9.5K', label: 'Followers Driven' },
      { val: '6.84%', label: 'Engagement' },
      { val: '1,557', label: 'Posts' },
    ],
  },
];

const FanpagesSlide = () => (
  <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden px-5 py-5 md:px-12 md:py-8 flex flex-col items-center justify-start">
    <div className="relative z-10 w-full max-w-[1600px] mx-auto">
      <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
        <Users size={20} className="text-primary md:w-7 md:h-7" />
        <p className="text-sm md:text-lg text-primary text-on-visual-accent font-medium tracking-wider uppercase">Service</p>
      </div>
      <h1 className="text-2xl md:text-6xl font-bold text-on-visual mb-1 md:mb-2">Fanpages</h1>
      <p className="text-sm md:text-2xl text-on-visual-soft mb-3 md:mb-4 max-w-[800px]">
        We operate and scale multiple theme pages that consistently target and unify your fan base around your project.
      </p>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Left — service info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-2 md:gap-2">
          <GlassPanel className="p-4 md:p-5 flex-1">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-1 md:mb-2">What it is</p>
            <p className="text-sm md:text-2xl text-muted-foreground leading-relaxed mb-1 md:mb-2">
              A structured content and distribution layer through genre and edit-style pages that already know how to get reach.
            </p>
            <div className="hidden md:block w-full h-16 mt-2"><FanpageVisualizer /></div>
          </GlassPanel>

          <GlassPanel className="p-4 md:p-5 flex-1">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-1 md:mb-2">Pros</p>
            <div className="space-y-1 md:space-y-1.5">
              {[
                'Building repeat exposure without relying on one-off influencer posts',
                'Creating "always-on" visibility while a song ramps',
                'Supporting a full rollout, not just a single moment',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                  <p className="text-sm md:text-2xl text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 md:p-5 flex-1">
            <p className="text-sm md:text-2xl font-semibold text-primary mb-1 md:mb-2">How it works</p>
            <div className="space-y-1 md:space-y-1.5 mb-2">
              {[
                'Consistent posting cadence across all active pages',
                'Multiple content angles and formats tested per cycle',
                'Iteration based on what the audience responds to',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-3" />
                  <p className="text-sm md:text-2xl text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 md:pt-3 border-t border-white/[0.06]">
              <p className="text-sm md:text-2xl text-primary font-medium">Timeframe: Best results from 4 to 8+ weeks</p>
            </div>
          </GlassPanel>
        </div>

        {/* Right — case studies */}
        <div className="flex-1 flex flex-col justify-between gap-2 md:gap-2">
          {caseStudies.map((c) => (
            <GlassPanel key={c.artist} variant="bright" className="p-3 md:p-5 flex-1">
              <div className="flex gap-3 md:gap-5 h-full items-center">
                <div className="w-[80px] md:w-[160px] shrink-0 flex items-center">
                  <div className="aspect-[9/16] rounded-xl overflow-hidden border-2 border-white/[0.1] w-full">
                    <img src={c.clip} alt={`${c.artist} clip`} loading="eager" decoding="sync" className="w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="mb-2 md:mb-3">
                    <p className="text-sm md:text-2xl text-primary font-mono tracking-widest mb-0.5">FANPAGES</p>
                    <p className="text-sm md:text-3xl font-bold text-foreground leading-tight">{c.artist}</p>
                    <p className="text-sm md:text-2xl text-muted-foreground leading-relaxed">{c.project}: {c.goal}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 md:gap-3">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="bg-white/[0.04] rounded-lg p-1.5 md:p-3 text-center">
                        <p className="text-sm md:text-2xl font-bold text-foreground">{m.val}</p>
                        <p className="text-[8px] md:text-base text-muted-foreground uppercase tracking-wider">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FanpagesSlide;
