import { useState } from "react";

import { Sparkle } from "./Sparkle";

type Gear = "headphones" | "chef" | "glasses3d" | "phone" | "cape" | "shorts" | "mug" | "hairs";

interface CritterProps {
  skin: string;
  gear: Gear[];
  className?: string;
}

const INK = "var(--ink)";

/** A Kumpa cousin drawn in the same chunky meme style as the samples. */
export function KumpaCritter({ skin, gear, className }: CritterProps) {
  const has = (g: Gear) => gear.includes(g);
  return (
    <svg viewBox="180 150 640 760" className={className} aria-hidden>
      <g stroke={INK} strokeLinecap="round" strokeLinejoin="round" strokeWidth="10">
        <ellipse cx="500" cy="868" rx="230" ry="16" fill="var(--floor-deep)" stroke="none" opacity="0.5" />
        {has("hairs") && (
          <g fill="none" strokeWidth="6">
            <path d="M488 326 C 480 300, 470 290, 452 286" />
            <path d="M502 324 C 500 300, 508 280, 524 272" />
            <path d="M516 326 C 528 310, 544 304, 562 306" />
          </g>
        )}
        {has("cape") && (
          <g fill="var(--skin-cape)">
            <path d="M300 660 C 260 720, 236 790, 244 852 L 330 800 C 340 760, 336 700, 300 660 Z" />
            <path d="M700 660 C 740 720, 764 790, 756 852 L 670 800 C 660 760, 664 700, 700 660 Z" />
          </g>
        )}
        {/* feet */}
        <path d="M356 840 h110 v22 q0 14 -14 14 h-82 q-14 0 -14 -14 Z" fill={skin} />
        <path d="M538 840 h110 v22 q0 14 -14 14 h-82 q-14 0 -14 -14 Z" fill={skin} />
        {/* body */}
        <path d="M500 316 C 660 314, 730 420, 734 600 C 738 760, 700 842, 500 842 C 300 842, 262 760, 268 600 C 272 420, 340 318, 500 316 Z" fill={skin} />
        <ellipse cx="500" cy="660" rx="94" ry="72" fill={INK} stroke="none" opacity="0.06" />
        {has("shorts") && (
          <g>
            <path d="M276 730 C 400 712, 600 712, 728 730 C 730 790, 690 842, 500 842 C 310 842, 272 790, 276 730 Z" fill="var(--skin-teal)" />
            {([[450, 762], [554, 786], [498, 818]] as const).map(([x,y]) => (
              <circle key={x} cx={x} cy={y} r="9" fill="var(--paper)" strokeWidth="5" />
            ))}
          </g>
        )}
        {/* spots */}
        <g fill="none" strokeWidth="5">
          <circle cx="334" cy="672" r="11" />
          <circle cx="660" cy="700" r="9" />
          {!has("shorts") && <circle cx="350" cy="762" r="7" />}
        </g>
        {/* eyes */}
        {([[420, 506, 70], [586, 496, 76]] as const).map(([cx, cy, r]) => (
          <g key={cx}>
            <circle cx={cx} cy={cy} r={r} fill={INK} stroke="none" />
            <circle cx={cx} cy={cy + 4} r={r - 12} fill="var(--crash)" stroke="none" />
            <circle cx={cx} cy={cy - 2} r={r - 18} fill="var(--paper)" stroke="none" />
            <g strokeWidth="4" stroke="var(--crash)">
              <line x1={cx - 50} y1={cy - 8} x2={cx - 30} y2={cy - 2} />
              <line x1={cx + 26} y1={cy - 14} x2={cx + 48} y2={cy - 22} />
              <line x1={cx + 20} y1={cy + 22} x2={cx + 42} y2={cy + 34} />
              <line x1={cx - 2} y1={cy - 58} x2={cx + 2} y2={cy - 36} />
            </g>
            <circle cx={cx + (cx < 500 ? -24 : 30)} cy={cy + (cx < 500 ? 12 : -24)} r="10" fill={INK} stroke="none" />
          </g>
        ))}
        {/* eye bags */}
        <g fill="none" strokeWidth="5">
          <path d="M358 592 C 400 604, 440 604, 476 594" />
          <path d="M370 612 C 404 620, 440 620, 468 612" />
          <path d="M530 594 C 570 604, 620 604, 656 590" />
          <path d="M540 614 C 574 620, 610 620, 640 610" />
        </g>
        <circle cx="494" cy="622" r="3" fill={INK} />
        <circle cx="512" cy="622" r="3" fill={INK} />
        {/* mouth */}
        <path d="M472 682 Q 504 678 534 682" fill="none" strokeWidth="6" />
        {has("glasses3d") && <path d="M502 690 q 0 26 14 22 q 14 -4 0 -22" fill="var(--skin-tongue)" strokeWidth="4" />}
        <path d="M432 770 Q 500 782 572 768" fill="none" strokeWidth="5" />
        {has("cape") && (
          <g fill="var(--skin-cape)" strokeWidth="5">
            <path d="M462 708 L 500 730 L 462 752 Z" />
            <path d="M544 708 L 506 730 L 544 752 Z" />
            <circle cx="503" cy="730" r="10" />
          </g>
        )}
        {/* left arm */}
        <path d="M326 622 C 290 640, 272 670, 270 712" fill="none" strokeWidth="9" />
        {has("mug") ? (
          <g>
            <rect x="198" y="548" width="64" height="76" rx="8" fill="var(--paper)" />
            <circle cx="268" cy="584" r="16" fill={skin} strokeWidth="6" />
            <g fill="none" strokeWidth="4"><path d="M216 530 q -8 -14 0 -28" /><path d="M244 530 q -8 -14 0 -28" /></g>
          </g>
        ) : (
          <circle cx="270" cy="714" r="18" fill={skin} strokeWidth="6" />
        )}
        {/* right arm */}
        {has("phone") ? (
          <g>
            <path d="M678 610 C 730 580, 756 500, 754 414" fill="none" strokeWidth="9" />
            <rect x="712" y="298" width="76" height="112" rx="10" fill="var(--navy)" transform="rotate(-12 750 354)" />
            <rect x="726" y="312" width="48" height="84" rx="4" fill="var(--skin-screen)" strokeWidth="0" transform="rotate(-12 750 354)" />
            <circle cx="754" cy="412" r="18" fill={skin} strokeWidth="6" />
          </g>
        ) : (
          <g>
            <path d="M680 622 C 716 640, 734 670, 736 712" fill="none" strokeWidth="9" />
            <circle cx="736" cy="714" r="18" fill={skin} strokeWidth="6" />
          </g>
        )}
        {has("glasses3d") && (
          <g>
            <line x1="286" y1="488" x2="330" y2="494" strokeWidth="7" />
            <line x1="684" y1="488" x2="724" y2="480" strokeWidth="7" />
            <rect x="330" y="460" width="356" height="86" rx="12" fill="var(--paper)" />
            <rect x="348" y="476" width="140" height="56" fill="var(--crash)" strokeWidth="5" />
            <rect x="520" y="476" width="144" height="56" fill="var(--skin-screen)" strokeWidth="5" />
          </g>
        )}
        {has("headphones") && (
          <g>
            <path d="M290 500 C 290 340, 710 330, 714 500" fill="none" stroke="var(--navy)" strokeWidth="22" />
            <rect x="258" y="448" width="58" height="96" rx="18" fill="var(--navy)" />
            <rect x="688" y="438" width="58" height="96" rx="18" fill="var(--navy)" />
            <path d="M310 540 C 330 600, 400 634, 482 634" fill="none" strokeWidth="5" />
            <circle cx="488" cy="634" r="12" fill="var(--navy)" strokeWidth="5" />
          </g>
        )}
        {has("chef") && (
          <g fill="var(--paper)">
            <path d="M434 326 L 430 280 C 390 270, 396 210, 450 214 C 460 170, 540 170, 552 214 C 606 210, 610 270, 570 280 L 572 326 Z" />
            <line x1="476" y1="240" x2="478" y2="270" strokeWidth="5" />
            <line x1="528" y1="240" x2="526" y2="270" strokeWidth="5" />
            <line x1="434" y1="290" x2="570" y2="290" strokeWidth="6" />
          </g>
        )}
      </g>
    </svg>
  );
}

interface Walker {
  name: string;
  skin: string;
  gear: Gear[];
  size: number;
  lane: number;
  dur: number;
  delay: number;
  back?: boolean;
  quip: string;
}

const WALKERS: Walker[] = [
  { name: "Lil Pump", skin: "var(--skin-lilac)", gear: ["headphones"], size: 150, lane: 0, dur: 34, delay: -4, quip: "can't hear the FUD. can't hear anything." },
  { name: "Sir Sips", skin: "var(--skin-butter)", gear: ["hairs", "cape", "mug"], size: 170, lane: 1, dur: 42, delay: -20, back: true, quip: "my coffee is down 60% too." },
  { name: "Beach Degen", skin: "var(--skin-mint)", gear: ["hairs", "shorts", "phone"], size: 140, lane: 0, dur: 28, delay: -15, quip: "checking the chart. on vacation. again." },
  { name: "3D Andy", skin: "var(--skin-ash)", gear: ["headphones", "glasses3d", "phone"], size: 130, lane: 2, dur: 24, delay: -8, back: true, quip: "the candles look better in 3D." },
  { name: "Chef Rug", skin: "var(--kumpa)", gear: ["chef", "glasses3d", "cape", "phone"], size: 190, lane: 2, dur: 50, delay: -30, quip: "cooking something. don't ask what." },
  { name: "OG Kumpa", skin: "var(--kumpa)", gear: ["hairs"], size: 120, lane: 1, dur: 22, delay: -2, quip: "zoomed out. still bad." },
];

const LANES = [46, 26, 5]; // bottom % per lane (back to front)

export function KumpaWorld() {
  const [said, setSaid] = useState<string | null>(null);

  return (
    <section id="world" className="relative border-b-4 border-ink">
      <div className="bg-cream px-4 py-12 text-center">
        <p className="text-xl">meanwhile, outside…</p>
        <h2 className="boil font-display text-[clamp(3rem,9vw,6.5rem)] uppercase leading-none">Kumpaland</h2>
        <p className="mt-2 text-xl">a whole world of tired little guys. click one. they have things to say.</p>
      </div>

      <div className="relative h-[560px] overflow-hidden border-t-4 border-ink bg-floor md:h-[620px]">
        {/* sky + sand bands */}
        <div className="absolute inset-x-0 top-0 h-[38%] bg-floor" />
        <div className="absolute inset-x-0 top-[38%] h-[18%] border-b-4 border-ink bg-sand" />
        {/* sun */}
        <svg viewBox="0 0 200 200" className="boil-slow absolute right-[6%] top-4 h-28 w-28 md:h-36 md:w-36" aria-hidden>
          <g stroke="var(--crash)" strokeWidth="10" strokeLinecap="round">
            <line x1="100" y1="6" x2="100" y2="26" /><line x1="20" y1="100" x2="40" y2="100" />
            <line x1="160" y1="100" x2="180" y2="100" /><line x1="38" y1="38" x2="52" y2="52" /><line x1="162" y1="38" x2="148" y2="52" />
          </g>
          <circle cx="100" cy="100" r="44" fill="var(--crash)" stroke="var(--ink)" strokeWidth="6" />
        </svg>
        {/* birds */}
        {[{ t: "10%", d: "-5s" }, { t: "20%", d: "-22s" }].map((b) => (
          <svg key={b.t} viewBox="0 0 90 30" className="animate-drift absolute left-0 h-6 w-16" style={{ top: b.t, animationDelay: b.d }} aria-hidden>
            <path d="M4 24 C 14 6, 30 6, 44 22 C 56 6, 74 6, 86 22" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
          </svg>
        ))}
        <Sparkle className="animate-sparkle absolute left-[8%] top-[14%] h-8 w-8" />
        <Sparkle className="animate-sparkle absolute left-[46%] top-[6%] h-6 w-6" delay={0.7} />

        {/* walkers, back lane first */}
        {[...WALKERS].sort((a, b) => a.lane - b.lane).map((w) => (
          <div
            key={w.name}
            className="animate-walk absolute left-0"
            style={{
              bottom: `${LANES[w.lane]}%`,
              zIndex: 10 + w.lane,
              ["--walk-dur" as string]: `${w.dur}s`,
              ["--walk-delay" as string]: `${w.delay}s`,
              animationDirection: w.back ? "reverse" : undefined,
            }}
          >
            <button
              type="button"
              onClick={() => setSaid(`${w.name}: “${w.quip}”`)}
              aria-label={`Talk to ${w.name}`}
              className="group block cursor-pointer"
              style={{ width: w.size * (0.75 + w.lane * 0.15) }}
            >
              <span className="mb-1 block whitespace-nowrap text-center text-sm opacity-0 transition-opacity group-hover:opacity-100">
                <span className="sketch-thin bg-paper px-2">{w.name}</span>
              </span>
              <div className="animate-waddle" style={{ animationDuration: `${0.5 + w.size / 400}s` }}>
                <KumpaCritter skin={w.skin} gear={w.gear} className="boil-slow w-full" />
              </div>
            </button>
          </div>
        ))}

        {said && (
          <div className="absolute inset-x-4 top-4 z-30 mx-auto max-w-md">
            <button
              type="button"
              onClick={() => setSaid(null)}
              className="sketch shadow-hard block w-full bg-paper px-4 py-3 text-xl"
            >
              {said}
              <span className="mt-1 block text-sm text-muted-foreground">(tap to make them stop)</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
