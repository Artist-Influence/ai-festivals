import GlassPanel from '../GlassPanel';

const UGCHacksSlide = () => (
  <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden pt-14 pb-8 px-5 md:p-24 flex flex-col items-center justify-center">
    <div className="relative z-10 w-full max-w-[1200px] mx-auto">
      <p className="text-sm md:text-lg text-primary font-medium mb-2 md:mb-4 tracking-wider uppercase">Service</p>
      <h1 className="text-xl md:text-5xl font-bold text-on-visual mb-2 md:mb-4 leading-tight">
        UGC Growth: Creator Flood<br />+ Top 50 Trending
      </h1>
      <p className="text-xs md:text-xl text-on-visual-soft mb-6 md:mb-10 max-w-[800px]">
        These are blunt-force tools. They are not "premium creative." They are designed to trigger visibility through volume.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
        <GlassPanel variant="bright" className="p-4 md:p-6">
          <p className="text-sm md:text-xl font-semibold text-foreground mb-2 md:mb-3">TikTok Creator Flood</p>
          <p className="text-xs md:text-base text-primary font-medium mb-1 md:mb-3">What it is</p>
          <p className="text-xs md:text-lg text-muted-foreground leading-relaxed mb-3 md:mb-4">
            Mass-posting your track across 10,000+ real TikTok UGC videos, primarily from international nano-creators.
          </p>
          <p className="text-xs md:text-base text-primary font-medium mb-1 md:mb-2">Why it works</p>
          <p className="text-xs md:text-lg text-muted-foreground mb-3 md:mb-4">
            It builds massive volume and algorithmic lift through real accounts, not bots.
          </p>
          <div className="pt-2 md:pt-3 border-t border-white/[0.06]">
            <p className="text-xs md:text-base text-primary font-medium">Timeframe: 3 to 4 weeks</p>
          </div>
        </GlassPanel>

        <GlassPanel variant="bright" className="p-4 md:p-6">
          <p className="text-sm md:text-xl font-semibold text-foreground mb-2 md:mb-3">Top 50 Trending & Popular Tab</p>
          <p className="text-xs md:text-base text-primary font-medium mb-1 md:mb-3">What it is</p>
          <p className="text-xs md:text-lg text-muted-foreground leading-relaxed mb-3 md:mb-4">
            We guarantee your track appears on Top 50 trending charts across YouTube Shorts, Instagram Reels, and Facebook Reels.
          </p>
          <p className="text-xs md:text-base text-primary font-medium mb-1 md:mb-2">How it's done (honest version)</p>
          <p className="text-xs md:text-lg text-muted-foreground mb-3 md:mb-4">
            A hybrid of AI-generated quantity content plus real UGC, with quantity prioritized over quality.
          </p>
          <div className="pt-2 md:pt-3 border-t border-white/[0.06]">
            <p className="text-xs md:text-base text-primary font-medium">Timeframe: 2 to 3 weeks</p>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel variant="subtle" className="p-4 md:p-6">
        <p className="text-sm md:text-lg font-semibold text-foreground mb-2 md:mb-3">When to use these</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {[
            'When you want brute visibility fast',
            'When you have a track that\'s already converting and needs gasoline',
            'When the goal is chart presence and algorithm discovery signals',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5 md:mt-2" />
              <p className="text-xs md:text-lg text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  </div>
);

export default UGCHacksSlide;
