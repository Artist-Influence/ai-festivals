const ClippingVisualizer = () => {
  const cy = 200;

  // Film strip frames — the original video being clipped
  const frames = Array.from({ length: 8 }, (_, i) => ({
    x: 115 + i * 22,
    fill: 0.3 + Math.sin(i * 0.9) * 0.15,
  }));

  // Scattered clip fragments flying outward
  const clips = [
    { tx: -85, ty: -100, rot: -20, delay: 0, w: 28, h: 18 },
    { tx: -35, ty: -130, rot: -8, delay: 0.5, w: 24, h: 16 },
    { tx: 30, ty: -125, rot: 12, delay: 0.9, w: 26, h: 17 },
    { tx: 90, ty: -95, rot: 25, delay: 0.4, w: 22, h: 15 },
    { tx: 120, ty: -40, rot: 35, delay: 1.2, w: 24, h: 16 },
    { tx: -100, ty: 30, rot: -30, delay: 1.0, w: 22, h: 15 },
    { tx: -70, ty: 105, rot: 18, delay: 0.7, w: 26, h: 17 },
    { tx: -10, ty: 130, rot: -5, delay: 1.4, w: 28, h: 18 },
    { tx: 70, ty: 110, rot: -18, delay: 0.3, w: 24, h: 16 },
    { tx: 115, ty: 50, rot: 22, delay: 1.6, w: 22, h: 15 },
    { tx: -110, ty: -40, rot: -15, delay: 1.8, w: 20, h: 14 },
    { tx: 50, ty: -60, rot: 8, delay: 2.0, w: 20, h: 14 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[420px] max-h-[420px]">
        <defs>
          <filter id="clipGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Radial distribution lines */}
        {clips.map((clip, i) => {
          const x2 = 200 + clip.tx;
          const y2 = cy + clip.ty;
          return (
            <line key={`ray-${i}`} x1="200" y1={cy} x2={x2} y2={y2}
              stroke="hsl(195, 90%, 60%)" strokeWidth="0.4"
              strokeDasharray="2 6" opacity="0">
              <animate attributeName="opacity" values="0;0.12;0" dur={`${3 + i * 0.3}s`}
                begin={`${clip.delay}s`} repeatCount="indefinite" />
            </line>
          );
        })}

        {/* Scattered video clip thumbnails */}
        {clips.map((clip, i) => (
          <g key={`clip-${i}`}
            transform={`translate(${200 + clip.tx}, ${cy + clip.ty}) rotate(${clip.rot})`}
            opacity="0">
            {/* Clip frame */}
            <rect x={-clip.w / 2} y={-clip.h / 2} width={clip.w} height={clip.h}
              rx="2.5" fill="hsl(222, 47%, 10%)"
              stroke="hsl(195, 90%, 60%)" strokeWidth="0.7" strokeOpacity="0.35" />
            {/* "Video content" inside */}
            <rect x={-clip.w / 2 + 2} y={-clip.h / 2 + 2} width={clip.w - 4} height={clip.h - 4}
              rx="1.5" fill="hsl(195, 90%, 60%)" opacity="0.12" />
            {/* Play triangle */}
            <polygon
              points={`${-2},${-3} ${-2},${3} ${3},${0}`}
              fill="hsl(195, 90%, 60%)" opacity="0.5" />
            {/* Fade in */}
            <animate attributeName="opacity" from="0" to="0.8"
              dur="0.8s" begin={`${clip.delay}s`} fill="freeze" />
            {/* Subtle float */}
            <animateTransform attributeName="transform" type="translate"
              additive="sum"
              values={`0,0; ${i % 2 === 0 ? 2 : -2},${i % 3 === 0 ? -2 : 2}; 0,0`}
              dur={`${5 + i % 3}s`} begin={`${clip.delay}s`} repeatCount="indefinite" />
          </g>
        ))}

        {/* Central film strip — the source video */}
        <g>
          {/* Strip background */}
          <rect x="110" y={cy - 18} width="180" height="36" rx="4"
            fill="hsl(222, 47%, 8%)" stroke="hsl(195, 90%, 60%)" strokeWidth="1"
            strokeOpacity="0.4" />
          {/* Sprocket holes top */}
          {frames.map((f, i) => (
            <rect key={`st-${i}`} x={f.x + 3} y={cy - 16} width="4" height="3"
              rx="0.5" fill="hsl(195, 90%, 60%)" opacity="0.25" />
          ))}
          {/* Sprocket holes bottom */}
          {frames.map((f, i) => (
            <rect key={`sb-${i}`} x={f.x + 3} y={cy + 13} width="4" height="3"
              rx="0.5" fill="hsl(195, 90%, 60%)" opacity="0.25" />
          ))}
          {/* Individual frames */}
          {frames.map((f, i) => (
            <rect key={`frame-${i}`} x={f.x} y={cy - 10} width="16" height="20"
              rx="1.5" fill="hsl(195, 90%, 60%)" opacity={f.fill}>
              <animate attributeName="opacity"
                values={`${f.fill};${f.fill + 0.15};${f.fill}`}
                dur={`${1.8 + (i % 3) * 0.4}s`} begin={`${i * 0.15}s`}
                repeatCount="indefinite" />
            </rect>
          ))}
          {/* Glow */}
          <rect x="115" y={cy - 1} width="170" height="2" rx="1"
            fill="hsl(195, 90%, 60%)" opacity="0.2" filter="url(#clipGlow)" />
        </g>

        {/* Scissor cut marks at edges of film strip */}
        {[108, 292].map((x, i) => (
          <g key={`cut-${i}`}>
            <line x1={x} y1={cy - 22} x2={x} y2={cy + 22}
              stroke="hsl(195, 90%, 60%)" strokeWidth="1" strokeDasharray="3 3" opacity="0">
              <animate attributeName="opacity" values="0;0.4;0" dur="2s"
                begin={`${i * 1}s`} repeatCount="indefinite" />
            </line>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ClippingVisualizer;
