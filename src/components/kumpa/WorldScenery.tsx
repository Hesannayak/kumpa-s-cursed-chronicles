import { memo } from "react";

import { WORLD_H, WORLD_W } from "./zones";

const INK = "var(--ink)";
const S = { stroke: INK, strokeWidth: 8, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Palm({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="boil-slow">
      <path d="M0 0 C -8 -70, 12 -140, 0 -200" fill="none" stroke={INK} strokeWidth="26" strokeLinecap="round" />
      <path d="M0 0 C -8 -70, 12 -140, 0 -200" fill="none" stroke="var(--floor-deep)" strokeWidth="14" strokeLinecap="round" />
      <g fill="var(--skin-mint)" {...S} strokeWidth={6}>
        <path d="M0 -200 C -30 -240, -70 -240, -92 -210 C -60 -220, -30 -214, 0 -200 Z" />
        <path d="M0 -200 C 30 -240, 70 -240, 92 -210 C 60 -220, 30 -214, 0 -200 Z" />
        <path d="M0 -200 C -20 -250, -10 -276, 12 -284 C 8 -254, 10 -230, 0 -200 Z" />
        <path d="M0 -200 C -30 -190, -60 -160, -64 -130 C -40 -160, -20 -178, 0 -200 Z" />
        <path d="M0 -200 C 30 -190, 60 -160, 64 -130 C 40 -160, 20 -178, 0 -200 Z" />
      </g>
    </g>
  );
}

function Path({ d }: { d: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke={INK} strokeWidth="64" strokeLinecap="round" />
      <path d={d} fill="none" stroke="var(--sand)" strokeWidth="52" strokeLinecap="round" />
      <path d={d} fill="none" stroke="var(--floor-deep)" strokeWidth="4" strokeDasharray="10 26" strokeLinecap="round" />
    </g>
  );
}

/** Static hand-drawn map art for Kumpaland. Drawn once; the player and cousins move on top. */
export const WorldScenery = memo(function WorldScenery() {
  return (
    <svg width={WORLD_W} height={WORLD_H} viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} className="absolute left-0 top-0" aria-hidden>
      {/* ground */}
      <rect width={WORLD_W} height={WORLD_H} fill="var(--floor)" />
      <rect x="0" y="0" width={WORLD_W} height={WORLD_H} fill="none" stroke={INK} strokeWidth="24" />
      {/* night zone */}
      <path d="M2000 0 H3200 V860 C 3000 900, 2800 820, 2600 880 C 2400 940, 2200 840, 2000 760 Z" fill="var(--night)" {...S} />
      {[[2100, 120], [2300, 80], [2900, 140], [3050, 300], [2200, 300], [2780, 260]].map(([x, y]) => (
        <path key={x} d={`M${x} ${y! - 14} C ${x! + 2} ${y! - 4}, ${x! + 4} ${y! - 2}, ${x! + 14} ${y} C ${x! + 4} ${y! + 2}, ${x! + 2} ${y! + 4}, ${x} ${y! + 14} C ${x! - 2} ${y! + 4}, ${x! - 4} ${y! + 2}, ${x! - 14} ${y} C ${x! - 4} ${y! - 2}, ${x! - 2} ${y! - 4}, ${x} ${y! - 14} Z`} fill="var(--glow)" stroke={INK} strokeWidth="3" />
      ))}
      <g className="boil-slow">
        <circle cx="3000" cy="160" r="70" fill="var(--glow)" {...S} />
        <circle cx="3030" cy="140" r="62" fill="var(--night)" stroke="none" />
      </g>
      {/* beach + sea */}
      <path d="M1100 1700 C 1300 1620, 2000 1620, 2250 1700 C 2300 1900, 2280 2200, 2200 2400 H1150 C 1100 2200, 1060 1900, 1100 1700 Z" fill="var(--sand)" {...S} />
      <path d="M1180 2280 C 1400 2240, 1900 2240, 2160 2280 L 2180 2400 H1170 Z" fill="var(--kumpa)" {...S} />
      <path d="M1250 2320 q 40 -20 80 0 t 80 0 M1600 2330 q 40 -20 80 0 t 80 0 M1900 2316 q 40 -20 80 0" fill="none" stroke={INK} strokeWidth="5" />

      {/* paths between places */}
      <Path d="M1600 1180 C 1300 1150, 1000 1180, 650 1150" />
      <Path d="M1600 1180 C 1900 1200, 2200 1160, 2550 1180" />
      <Path d="M1600 1180 C 1500 900, 1300 700, 1250 520" />
      <Path d="M1600 1180 C 1650 1450, 1640 1650, 1650 1800" />
      <Path d="M650 1150 C 600 1450, 700 1650, 750 1880" />
      <Path d="M2550 1180 C 2600 1450, 2560 1700, 2600 1880" />
      <Path d="M2550 1180 C 2600 900, 2520 700, 2550 520" />

      {/* town: fountain + signpost */}
      <g className="boil-slow">
        <ellipse cx="1600" cy="1300" rx="150" ry="44" fill="var(--kumpa)" {...S} />
        <ellipse cx="1600" cy="1300" rx="110" ry="26" fill="var(--skin-screen)" stroke="none" />
        <line x1="1800" y1="1260" x2="1800" y2="1100" {...S} strokeWidth={12} />
        <path d="M1760 1110 h120 l20 20 l-20 20 h-120 Z" fill="var(--cream)" {...S} strokeWidth={6} />
        <text x="1820" y="1138" textAnchor="middle" fontFamily="Gaegu" fontSize="26" fill={INK}>WASD →</text>
        <path d="M1840 1160 h-120 l-20 20 l20 20 h120 Z" fill="var(--cream)" {...S} strokeWidth={6} />
        <text x="1780" y="1188" textAnchor="middle" fontFamily="Gaegu" fontSize="26" fill={INK}>← or tap</text>
      </g>

      {/* bedroom */}
      <g className="boil-slow">
        <path d="M460 1000 L650 880 L840 1000 V1240 H460 Z" fill="var(--wall)" {...S} />
        <path d="M440 1010 L650 870 L860 1010" fill="none" {...S} strokeWidth={14} />
        <rect x="500" y="1100" width="200" height="90" rx="14" fill="var(--paper)" {...S} strokeWidth={6} />
        <rect x="500" y="1070" width="70" height="50" rx="14" fill="var(--cream)" {...S} strokeWidth={6} />
        <rect x="560" y="1110" width="140" height="80" rx="10" fill="var(--kumpa)" {...S} strokeWidth={6} />
        <rect x="740" y="1060" width="70" height="60" rx="6" fill="var(--glow)" {...S} strokeWidth={6} />
        <line x1="775" y1="1060" x2="775" y2="1120" stroke={INK} strokeWidth="4" />
        <text x="650" y="960" textAnchor="middle" fontFamily="Gaegu" fontSize="40" fill={INK}>Gm</text>
      </g>

      {/* kitchen */}
      <g className="boil-slow">
        <rect x="560" y="1760" width="380" height="240" rx="18" fill="var(--cream)" {...S} />
        <rect x="600" y="1820" width="160" height="140" rx="10" fill="var(--paper)" {...S} strokeWidth={6} />
        <circle cx="640" cy="1850" r="16" fill="var(--crash)" {...S} strokeWidth={4} />
        <circle cx="720" cy="1850" r="16" fill="var(--crash)" {...S} strokeWidth={4} />
        <path d="M790 1820 h110 v60 q0 30 -30 30 h-50 q-30 0 -30 -30 Z" fill="var(--navy)" {...S} strokeWidth={6} />
        <path d="M815 1800 q -12 -24 0 -48 M845 1800 q -12 -24 0 -48 M875 1800 q -12 -24 0 -48" fill="none" stroke={INK} strokeWidth="5" />
        <text x="750" y="1740" textAnchor="middle" fontFamily="Gaegu" fontSize="34" fill={INK}>LAUNCHPAD (wip)</text>
      </g>

      {/* chart mountain */}
      <g className="boil-slow">
        <path d="M900 700 L1080 260 L1180 360 L1280 140 L1420 420 L1500 360 L1640 700 Z" fill="var(--floor-deep)" {...S} />
        <path d="M1240 220 L1280 140 L1320 220 L1300 210 L1280 230 L1260 210 Z" fill="var(--paper)" {...S} strokeWidth={5} />
        <polyline points="960,320 1060,360 1120,340 1200,480 1280,450 1380,600 1560,660" fill="none" stroke="var(--crash)" strokeWidth="18" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points="960,320 1060,360 1120,340 1200,480 1280,450 1380,600 1560,660" fill="none" stroke={INK} strokeWidth="4" strokeDasharray="2 14" />
        <path d="M1540 640 l40 30 l-50 10" fill="var(--crash)" {...S} strokeWidth={5} />
      </g>

      {/* hacker cave */}
      <g className="boil-slow">
        <path d="M2340 1300 C 2320 1080, 2420 960, 2550 960 C 2680 960, 2780 1080, 2760 1300 Z" fill="var(--navy)" {...S} />
        <path d="M2430 1300 C 2430 1160, 2480 1100, 2550 1100 C 2620 1100, 2670 1160, 2670 1300 Z" fill="var(--ink)" />
        {[[2470, 1180], [2560, 1150], [2610, 1220]].map(([x, y]) => (
          <rect key={x} x={x} y={y} width="56" height="40" rx="4" fill="var(--skin-mint)" stroke={INK} strokeWidth="4" />
        ))}
        <text x="2550" y="1010" textAnchor="middle" fontFamily="Gaegu" fontSize="30" fill="var(--skin-mint)">sudo rug</text>
      </g>

      {/* damage billboard */}
      <g className="boil-slow">
        <line x1="2480" y1="2000" x2="2480" y2="2120" {...S} strokeWidth={14} />
        <line x1="2720" y1="2000" x2="2720" y2="2120" {...S} strokeWidth={14} />
        <rect x="2400" y="1760" width="400" height="250" rx="14" fill="var(--paper)" {...S} />
        <polyline points="2430,1800 2500,1830 2540,1820 2600,1900 2650,1880 2700,1960 2770,1980" fill="none" stroke="var(--crash)" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" />
        <text x="2600" y="1800" textAnchor="middle" fontFamily="Gaegu" fontSize="34" fill={INK}>DAMAGE: yes</text>
        <rect x="2820" y="1900" width="120" height="130" rx="10" fill="var(--crash)" {...S} strokeWidth={6} />
        <text x="2880" y="1975" textAnchor="middle" fontFamily="Gaegu" fontSize="30" fill={INK}>POKE</text>
      </g>

      {/* gn tower */}
      <g className="boil-slow">
        <path d="M2470 640 L2490 260 H2610 L2630 640 Z" fill="var(--night-deep)" {...S} />
        <path d="M2470 260 L2550 150 L2630 260 Z" fill="var(--crash)" {...S} />
        <rect x="2525" y="320" width="50" height="60" rx="25" fill="var(--glow)" {...S} strokeWidth={5} />
        <rect x="2525" y="440" width="50" height="60" rx="25" fill="var(--glow)" {...S} strokeWidth={5} />
        <text x="2680" y="300" fontFamily="Gaegu" fontSize="40" fill="var(--cream)">z z Z</text>
      </g>

      {/* decoration */}
      <Palm x={1180} y={1820} />
      <Palm x={2180} y={1760} s={0.8} />
      <Palm x={300} y={600} s={0.9} />
      <Palm x={3000} y={1500} s={0.85} />
      <Palm x={250} y={2200} />
      <g className="boil-slow">
        <line x1="1960" y1="1900" x2="1975" y2="2080" {...S} strokeWidth={7} />
        <path d="M1860 1920 C 1880 1840, 2060 1840, 2080 1920 Q 2050 1904 2025 1920 Q 2000 1904 1970 1920 Q 1945 1904 1915 1920 Q 1890 1904 1860 1920 Z" fill="var(--crash)" {...S} strokeWidth={6} />
        <path d="M2000 2160 V 2100 h16 v-10 h12 v10 h12 v-10 h12 v10 h16 v60 Z" fill="var(--sand)" {...S} strokeWidth={5} />
      </g>
      {[[400, 1600], [1000, 1500], [2100, 1480], [2950, 1050], [1950, 700], [350, 300]].map(([x, y]) => (
        <g key={x} fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round">
          <path d={`M${x} ${y} q 6 -24 0 -40 M${x! + 14} ${y} q 10 -20 16 -30 M${x! - 14} ${y} q -10 -20 -16 -30`} />
        </g>
      ))}
    </svg>
  );
});
