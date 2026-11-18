/** Hidden SVG filters that make every `.boil` element jitter like a hand-drawn cartoon. */
export function SketchFilters() {
  return (
    <svg aria-hidden width="0" height="0" className="pointer-events-none absolute">
      <defs>
        {[1, 2, 3].map((seed) => (
          <filter key={seed} id={`kumpa-wobble-${seed}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed * 7} />
            <feDisplacementMap in="SourceGraphic" scale="2.6" />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
