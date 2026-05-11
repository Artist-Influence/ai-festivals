import GlassPanel from '../GlassPanel';
import OutcomesVisualizer from '../OutcomesVisualizer';

const outcomes = [
  'More short-form creation volume and velocity',
  'Higher repeat exposure across different audiences',
  'Stronger saves, shares, follows, and comments',
  'Better downstream performance on streaming and long-form video',
  'Clear signals for what content angles actually convert',
];

const OutcomesSlide = () => (
  <div className="w-full min-h-dvh md:h-full bg-background relative overflow-hidden p-5 md:p-24 flex flex-col items-center justify-start md:justify-center">
    <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-16 items-center w-full max-w-[1600px] mx-auto justify-center">
      <div className="flex-1 max-w-[700px]">
        <h1 className="text-2xl md:text-7xl font-bold text-on-visual mb-2 md:mb-4">What "good" looks like</h1>
        <p className="text-sm md:text-2xl text-on-visual-soft mb-4 md:mb-6">Outcomes we aim for</p>
        <p className="text-xs md:text-xl text-on-visual-soft mb-6 md:mb-16 max-w-[700px]">
          We don't promise magic. We promise strong execution, real distribution, and momentum-building that you can see.
        </p>

        <p className="text-xs md:text-lg text-primary text-on-visual-accent font-medium mb-3 md:mb-6 tracking-wider uppercase">
          Depending on the service mix, a good campaign produces:
        </p>

        <div className="space-y-2 md:space-y-4">
          {outcomes.map((item, i) => (
            <GlassPanel key={i} variant="bright" className="p-3 md:p-5 flex items-center gap-3 md:gap-4">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/60 shrink-0" />
              <p className="text-xs md:text-lg text-foreground/80">{item}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center">
        <OutcomesVisualizer />
      </div>
    </div>
  </div>
);

export default OutcomesSlide;
