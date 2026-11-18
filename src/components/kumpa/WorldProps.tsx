const INK = "var(--ink)";

/** Scenery for Kumpaland: clouds, palm, umbrella, chart billboard, sandcastle and a crab. */
export function WorldProps() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* clouds */}
      {[{ t: "6%", d: "-8s", s: 1 }, { t: "16%", d: "-26s", s: 0.7 }].map((c) => (
        <svg key={c.t} viewBox="0 0 160 70" className="animate-drift absolute left-0 w-40" style={{ top: c.t, animationDelay: c.d, animationDuration: "70s", scale: c.s }}>
          <path d="M30 60 C 6 60, 6 30, 32 32 C 36 8, 76 4, 84 26 C 100 10, 136 18, 132 40 C 156 42, 154 62, 130 60 Z" fill="var(--cream)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        </svg>
      ))}

      {/* chart billboard */}
      <svg viewBox="0 0 220 200" className="boil-slow absolute left-[30%] top-[9%] hidden w-44 md:block">
        <line x1="60" y1="120" x2="60" y2="196" stroke={INK} strokeWidth="8" />
        <line x1="160" y1="120" x2="160" y2="196" stroke={INK} strokeWidth="8" />
        <rect x="10" y="10" width="200" height="116" rx="10" fill="var(--paper)" stroke={INK} strokeWidth="7" />
        <polyline points="26,34 56,50 76,44 100,74 124,66 150,98 196,112" fill="none" stroke="var(--crash)" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
        <text x="110" y="40" textAnchor="middle" fontFamily="Gaegu" fontSize="22" fill={INK}>-99.9%</text>
      </svg>

      {/* palm tree */}
      <svg viewBox="0 0 200 300" className="boil-slow absolute bottom-[40%] left-[2%] w-28 md:w-36">
        <path d="M100 290 C 92 220, 112 150, 100 90" fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" />
        <path d="M100 290 C 92 220, 112 150, 100 90" fill="none" stroke="var(--floor-deep)" strokeWidth="12" strokeLinecap="round" />
        <g fill="var(--skin-mint)" stroke={INK} strokeWidth="6" strokeLinejoin="round">
          <path d="M100 90 C 70 50, 30 50, 8 80 C 40 70, 70 76, 100 90 Z" />
          <path d="M100 90 C 130 50, 170 50, 192 80 C 160 70, 130 76, 100 90 Z" />
          <path d="M100 90 C 80 40, 90 14, 112 6 C 108 36, 110 60, 100 90 Z" />
          <path d="M100 90 C 70 100, 40 130, 36 160 C 60 130, 80 112, 100 90 Z" />
          <path d="M100 90 C 130 100, 160 130, 164 160 C 140 130, 120 112, 100 90 Z" />
        </g>
        <circle cx="92" cy="96" r="10" fill="var(--floor-deep)" stroke={INK} strokeWidth="5" />
        <circle cx="110" cy="98" r="10" fill="var(--floor-deep)" stroke={INK} strokeWidth="5" />
      </svg>

      {/* umbrella */}
      <svg viewBox="0 0 200 220" className="boil-slow absolute bottom-[36%] right-[18%] w-28 md:w-32">
        <line x1="100" y1="60" x2="110" y2="216" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <path d="M10 80 C 30 10, 170 10, 190 80 Q 160 66 136 80 Q 112 64 100 80 Q 84 64 62 80 Q 38 64 10 80 Z" fill="var(--crash)" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M62 80 C 70 40, 88 22, 100 20 C 112 22, 130 40, 136 80" fill="none" stroke={INK} strokeWidth="5" />
      </svg>

      {/* sandcastle */}
      <svg viewBox="0 0 160 130" className="boil-slow absolute bottom-[4%] right-[4%] w-28 md:w-36">
        <g fill="var(--sand)" stroke={INK} strokeWidth="6" strokeLinejoin="round">
          <path d="M20 124 V 60 h16 v-10 h12 v10 h12 v-10 h12 v10 h16 v64 Z" />
          <path d="M88 124 V 40 h14 v-10 h10 v10 h10 v-10 h10 v10 h14 v84 Z" />
        </g>
        <path d="M110 70 q 0 -14 6 -14 q 6 0 6 14 v12 h-12 Z" fill={INK} />
        <line x1="117" y1="30" x2="117" y2="4" stroke={INK} strokeWidth="4" />
        <path d="M117 4 L 140 10 L 117 18 Z" fill="var(--crash)" stroke={INK} strokeWidth="3" />
      </svg>

      {/* crab scuttling */}
      <div className="animate-walk absolute bottom-[2%] left-0" style={{ ["--walk-dur" as string]: "18s", ["--walk-delay" as string]: "-6s" }}>
        <svg viewBox="0 0 120 80" className="animate-waddle w-16" style={{ animationDuration: "0.3s" }}>
          <g stroke={INK} strokeWidth="5" strokeLinecap="round" fill="var(--crash)">
            <path d="M24 30 C 10 20, 10 6, 22 4 C 22 14, 28 16, 32 20" />
            <path d="M96 30 C 110 20, 110 6, 98 4 C 98 14, 92 16, 88 20" />
            <line x1="30" y1="56" x2="14" y2="74" /><line x1="44" y1="60" x2="36" y2="78" />
            <line x1="90" y1="56" x2="106" y2="74" /><line x1="76" y1="60" x2="84" y2="78" />
            <ellipse cx="60" cy="46" rx="36" ry="20" />
          </g>
          <circle cx="50" cy="40" r="6" fill="var(--paper)" stroke={INK} strokeWidth="3" />
          <circle cx="70" cy="40" r="6" fill="var(--paper)" stroke={INK} strokeWidth="3" />
          <circle cx="51" cy="41" r="2.5" fill={INK} /><circle cx="69" cy="41" r="2.5" fill={INK} />
        </svg>
      </div>
    </div>
  );
}
