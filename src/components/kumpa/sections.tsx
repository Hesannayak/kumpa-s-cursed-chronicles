import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Kumpa } from "./Kumpa";
import { Sparkle } from "./Sparkle";
import { CHAPTERS, COPIUM, TICKER, type Chapter } from "./story";

/* ---------------- nav ---------------- */

export function Nav({ onWorld }: { onWorld?: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b-4 border-ink bg-wall">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <a href="#top" className="flex items-center gap-2">
          <Kumpa className="boil-slow h-12 w-12" />
          <span className="font-display text-3xl uppercase">Kumpa</span>
        </a>
        <div className="flex items-center gap-1 text-lg sm:gap-4">
          <a
            href="/"
            aria-label="Enter the open world of Kumpaland"
            onClick={(e) => {
              if (!onWorld) return;
              e.preventDefault();
              onWorld();
            }}
            className="rounded px-2 hover:bg-kumpa"
          >
            World
          </a>
          <a href="#story" className="rounded px-2 hover:bg-kumpa">Lore</a>
          <a href="#damage" className="rounded px-2 hover:bg-kumpa">Damage</a>
          <a href="#poke" className="rounded px-2 hover:bg-crash">Poke him</a>
        </div>
      </nav>
    </header>
  );
}

/* ---------------- ticker ---------------- */

export function Ticker({ reverse = false }: { reverse?: boolean }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden border-y-4 border-ink bg-ink py-2 text-cream">
      <div
        className="animate-marquee flex w-max gap-8 whitespace-nowrap font-display text-2xl uppercase"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className={i % 3 === 0 ? "text-crash" : undefined}>{t}</span>
            <span className="text-kumpa">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- hero ---------------- */

export function RunawayButton() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);
  const tired = dodges >= 7;

  const flee = () => {
    if (tired) return;
    setDodges((d) => d + 1);
    setPos({ x: (Math.random() - 0.5) * 320, y: (Math.random() - 0.5) * 160 });
  };

  return (
    <Button
      variant="sketch"
      size="xl"
      onPointerEnter={flee}
      onClick={() => {
        if (!tired) {
          flee();
          toast("lol no. Kumpa is protecting you.");
          return;
        }
        toast("You bought the top. Kumpa is so proud. Welcome to the family.");
        setDodges(0);
        setPos({ x: 0, y: 0 });
      }}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 180ms ease-out" }}
    >
      {tired ? "ok fine. buy the top" : "Buy the top"}
    </Button>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-room-day">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 pb-6 pt-12 md:grid-cols-[1.1fr_1fr] md:pt-16">
        <div className="relative z-10">
          <p className="mb-3 inline-block -rotate-2 sketch-thin bg-cream px-3 py-1 text-lg shadow-hard-sm">
            a cursed tale in 10 panels
          </p>
          <h1 className="boil font-display text-[clamp(5rem,16vw,11rem)] uppercase leading-[0.85]">Kumpa</h1>
          <p className="mt-4 max-w-md text-2xl leading-snug">
            A small blue guy. Three hairs. One very red chart. He said <b>Gm</b> once and has not slept since.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="kumpa" size="xl" asChild>
              <a href="#story">Read the lore</a>
            </Button>
            <RunawayButton />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <Sparkle className="animate-sparkle absolute -left-2 top-10 h-12 w-12" />
          <Sparkle className="animate-sparkle absolute right-2 top-0 h-9 w-9" delay={0.5} />
          <Sparkle className="animate-sparkle absolute -right-4 bottom-32 h-14 w-14" delay={1} />
          <div className="animate-twitch">
            <Kumpa className="boil w-full drop-shadow-none" sweat />
          </div>
          <p className="mt-1 text-center text-base text-muted-foreground">(he is looking at you)</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- story ---------------- */

export function ChapterPanel({ chapter, index }: { chapter: Chapter; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article
      className={cn(
        "border-b-4 border-ink",
        chapter.night ? "bg-room-night" : index % 2 === 0 ? "bg-wall" : "bg-floor",
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24",
          flip && "md:[&>*:first-child]:order-2",
        )}
      >
        <figure
          className={cn(
            "sketch shadow-hard overflow-hidden bg-paper transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]",
            flip ? "rotate-2" : "-rotate-2",
          )}
        >
          <img src={chapter.image} alt={chapter.alt} loading="lazy" className="block h-auto w-full" />
        </figure>

        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-7xl text-crash [-webkit-text-stroke:2px_var(--ink)]">
              {String(chapter.n).padStart(2, "0")}
            </span>
            <span className="sketch-thin bg-cream px-2 py-0.5 text-base">{chapter.time}</span>
          </div>
          <h3 className="boil-slow mt-2 font-display text-5xl uppercase leading-none md:text-6xl">{chapter.title}</h3>
          <div className="mt-5 space-y-4 text-xl leading-relaxed md:text-2xl">
            {chapter.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-6 inline-block rotate-1 sketch-thin bg-kumpa px-3 py-1 text-lg shadow-hard-sm">
            {chapter.aside}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Story() {
  return (
    <section id="story">
      <div className="border-b-4 border-ink bg-crash px-4 py-14 text-center">
        <p className="text-xl">the official and completely true</p>
        <h2 className="boil font-display text-[clamp(3rem,9vw,6.5rem)] uppercase leading-none">Kumpa Chronicles</h2>
        <p className="mt-2 text-xl">scroll down. it only gets worse.</p>
      </div>
      {CHAPTERS.map((c, i) => (
        <ChapterPanel key={c.n} chapter={c} index={i} />
      ))}
    </section>
  );
}

/* ---------------- damage report ---------------- */

export function DamageReport() {
  const [zooms, setZooms] = useState(4069);
  useEffect(() => {
    const id = setInterval(() => setZooms((z) => z + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { label: "Hairs remaining", value: "3", note: "same three. legends.", tone: "bg-kumpa" },
    { label: "Hours slept", value: "0", note: "since Chapter 1", tone: "bg-cream" },
    { label: "Lifetime wins", value: "$10", note: "minus $11 gas", tone: "bg-crash" },
    { label: "Times zoomed out", value: zooms.toLocaleString("en-US"), note: "live. he's doing it now.", tone: "bg-cream" },
  ];

  return (
    <section id="damage" className="border-b-4 border-ink bg-wall px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-5xl uppercase md:text-6xl">Kumpa damage report</h2>
        <p className="mt-2 text-xl text-muted-foreground">audited by Kumpa. accuracy: vibes.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn("sketch shadow-hard p-5", s.tone, i % 2 ? "rotate-1" : "-rotate-1")}
            >
              <p className="text-lg">{s.label}</p>
              <p className="font-display text-6xl tabular-nums">{s.value}</p>
              <p className="text-base">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- poke kumpa ---------------- */

export function PokeKumpa() {
  const [sanity, setSanity] = useState(100);
  const [line, setLine] = useState("poke me. I dare you. I have nothing left to lose.");
  const [shaking, setShaking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const hairs = sanity > 60 ? 3 : sanity > 30 ? 2 : sanity > 0 ? 1 : 0;
  const mood = sanity > 80 ? "gm" : sanity > 0 ? "cursed" : "shook";

  const poke = () => {
    const next = Math.max(0, sanity - 12);
    setSanity(next);
    setLine(next === 0 ? "…I have become the chart." : (COPIUM[Math.floor(Math.random() * COPIUM.length)] ?? "zoom out."));
    setShaking(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShaking(false), 500);
    if (next < sanity && hairs !== (next > 60 ? 3 : next > 30 ? 2 : next > 0 ? 1 : 0)) {
      toast("Kumpa lost a hair. This is on you.");
    }
  };

  const coffee = () => {
    setSanity(100);
    setLine("Gm. ☕ everything is fine. everything is fine.");
  };

  return (
    <section id="poke" className="border-b-4 border-ink bg-floor px-4 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-5xl uppercase md:text-6xl">Poke Kumpa</h2>
          <p className="mt-3 text-2xl">
            Every poke costs him sanity. At low sanity he loses hair. Please don't. (Please do.)
          </p>

          <div className="mt-8">
            <div className="flex justify-between text-lg">
              <span>Sanity</span>
              <span className="tabular-nums">{sanity}%</span>
            </div>
            <div className="sketch-thin mt-1 h-8 overflow-hidden bg-cream">
              <div
                className={cn("h-full transition-all duration-300", sanity > 50 ? "bg-kumpa" : "bg-crash")}
                style={{ width: `${sanity}%` }}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="kumpa" size="xl" onClick={poke}>
              Poke
            </Button>
            <Button variant="blue" size="xl" onClick={coffee}>
              Give coffee
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="sketch shadow-hard relative mb-6 bg-paper p-4 text-center text-2xl">
            “{line}”
            <span className="absolute -bottom-[18px] left-1/2 h-8 w-8 -translate-x-1/2 rotate-45 border-b-4 border-r-4 border-ink bg-paper" />
          </div>
          <button
            type="button"
            onClick={poke}
            aria-label="Poke Kumpa"
            className={cn("block w-full cursor-pointer", shaking && "animate-shake")}
          >
            <Kumpa className="boil w-full" mood={mood} hairs={hairs} sweat={sanity < 60} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */

export function Footer() {
  return (
    <footer className="bg-room-night px-4 pb-10 pt-20 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto w-40 animate-bob">
          <Kumpa className="boil w-full" />
        </div>
        <h2 className="boil mt-4 font-display text-[clamp(5rem,14vw,9rem)] leading-none">Gn.</h2>
        <p className="mt-2 text-2xl">(he will not sleep. see you at Gm.)</p>
        <div className="sketch-thin mx-auto mt-12 max-w-xl bg-night-deep px-4 py-3 text-base text-cream">
          © Kumpa, forever. Not financial advice. Not any advice. Kumpa cannot read. No inu devs were harmed —
          their wallets were already empty.
        </div>
      </div>
    </footer>
  );
}
