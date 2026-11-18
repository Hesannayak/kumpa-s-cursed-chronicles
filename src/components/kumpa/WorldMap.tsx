import walkSprite from "@/assets/sprites/kumpa_walk.webp";
import idleSprite from "@/assets/sprites/kumpa_idle.webp";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AskCousin } from "./AskCousin";
import { Kumpa } from "./Kumpa";
import { KumpaCritter, WALKERS } from "./KumpaWorld";
import { ChapterPanel, DamageReport, Footer, Hero, PokeKumpa } from "./sections";
import { CHAPTERS } from "./story";
import { WorldScenery } from "./WorldScenery";
import { WORLD_H, WORLD_W, ZONES, zoneById, type ZoneId } from "./zones";

const SPEED = 440; // world px / second
const COUSIN_SPEED = 70;
const BEACH = { x0: 1250, x1: 2100, y0: 1760, y1: 2180 };
const SPAWN = { x: 1600, y: 1420 };
const VISITED_KEY = "kumpa-visited";
const KEYMAP: Record<string, string> = {
  ArrowUp: "u", KeyW: "u", ArrowDown: "d", KeyS: "d", ArrowLeft: "l", KeyA: "l", ArrowRight: "r", KeyD: "r",
};

type Vec = { x: number; y: number };
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function ZoneContent({ id, picked, onPick }: { id: ZoneId; picked: string; onPick: (id: string) => void }) {
  const zone = zoneById(id)!;
  const chapters = zone.chapters.map((n) => CHAPTERS.find((c) => c.n === n)!).filter(Boolean);
  return (
    <>
      {id === "town" && <Hero />}
      {chapters.map((c, i) => (
        <ChapterPanel key={c.n} chapter={c} index={i} />
      ))}
      {id === "beach" && (
        <AskCousin
          pickedId={picked}
          onPick={onPick}
          renderFace={(cid) => {
            const w = WALKERS.find((x) => x.id === cid)!;
            return <KumpaCritter skin={w.skin} gear={w.gear} className="w-full" />;
          }}
        />
      )}
      {id === "billboard" && (
        <>
          <DamageReport />
          <PokeKumpa />
        </>
      )}
      {id === "tower" && <Footer />}
    </>
  );
}

export function WorldMap({ onBoring }: { onBoring: () => void }) {
  const viewRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerFlipRef = useRef<HTMLDivElement>(null);
  const miniDotRef = useRef<SVGCircleElement>(null);
  const cousinRefs = useRef<(HTMLDivElement | null)[]>([]);

  const player = useRef<Vec>({ ...SPAWN });
  const target = useRef<Vec | null>(null);
  const keys = useRef(new Set<string>());
  const look = useRef<Vec>({ x: 0, y: 0 });
  const cam = useRef<Vec>({ x: 0, y: 0 });
  const zoom = useRef(0.75);
  const lastZone = useRef<ZoneId | null>(null);
  const lastMove = useRef(0);
  const bumpCooldown = useRef(0);
  const openRef = useRef<ZoneId | null>(null);
  const flags = useRef({ walking: false, facing: 1, asleep: false, sweat: false, night: false });
  const cousins = useRef(
    WALKERS.map((_, i) => ({
      p: { x: BEACH.x0 + ((i + 0.5) / WALKERS.length) * (BEACH.x1 - BEACH.x0), y: (BEACH.y0 + BEACH.y1) / 2 },
      t: null as Vec | null,
      wait: 0,
    })),
  );

  const [open, setOpen] = useState<ZoneId | null>(null);
  const [visited, setVisited] = useState<ZoneId[]>([]);
  const [picked, setPicked] = useState("og-kumpa");
  const [walking, setWalking] = useState(false);
  const [asleep, setAsleep] = useState(false);
  const [sweat, setSweat] = useState(false);
  const [night, setNight] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(VISITED_KEY) ?? "[]") as ZoneId[];
      setVisited(saved.filter((z) => zoneById(z)));
    } catch {
      /* ignore */
    }
  }, []);

  const openZone = useCallback((id: ZoneId) => {
    openRef.current = id;
    setOpen(id);
    keys.current.clear();
    target.current = null;
    setVisited((v) => {
      if (v.includes(id)) return v;
      const next = [...v, id];
      localStorage.setItem(VISITED_KEY, JSON.stringify(next));
      return next;
    });
    const url = new URL(window.location.href);
    url.searchParams.set("zone", id);
    window.history.replaceState(null, "", url);
  }, []);

  const closeZone = useCallback(() => {
    openRef.current = null;
    setOpen(null);
    bumpCooldown.current = performance.now() + 2500;
    const url = new URL(window.location.href);
    url.searchParams.delete("zone");
    window.history.replaceState(null, "", url);
  }, []);

  const travel = useCallback(
    (id: ZoneId) => {
      const z = zoneById(id)!;
      player.current = { x: z.x, y: z.y + z.r * 0.4 };
      target.current = null;
      look.current = { x: 0, y: 0 };
      lastZone.current = id;
      lastMove.current = performance.now();
      openZone(id);
    },
    [openZone],
  );

  // deep link ?zone=beach
  useEffect(() => {
    const id = new URL(window.location.href).searchParams.get("zone");
    if (id && zoneById(id)) travel(id as ZoneId);
  }, [travel]);

  // keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (openRef.current) return;
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, [role=menu]")) return;
      const k = KEYMAP[e.code];
      if (!k) return;
      e.preventDefault();
      keys.current.add(k);
      setHint(false);
    };
    const up = (e: KeyboardEvent) => {
      const k = KEYMAP[e.code];
      if (k) keys.current.delete(k);
    };
    const blur = () => keys.current.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  // wheel zoom (non-passive so the page never zooms/scrolls)
  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      zoom.current = clamp(zoom.current * Math.exp(-dy * 0.0015), 0.4, 1.6);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // main loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    lastMove.current = last;
    let first = true;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const p = player.current;
      const f = flags.current;
      let moving = false;

      if (!openRef.current) {
        const k = keys.current;
        let dx = (k.has("r") ? 1 : 0) - (k.has("l") ? 1 : 0);
        let dy = (k.has("d") ? 1 : 0) - (k.has("u") ? 1 : 0);
        if (dx || dy) {
          target.current = null;
        } else if (target.current) {
          dx = target.current.x - p.x;
          dy = target.current.y - p.y;
          if (Math.hypot(dx, dy) < 8) {
            target.current = null;
            dx = dy = 0;
          }
        }
        const len = Math.hypot(dx, dy);
        if (len > 0) {
          p.x = clamp(p.x + (dx / len) * SPEED * dt, 60, WORLD_W - 60);
          p.y = clamp(p.y + (dy / len) * SPEED * dt, 140, WORLD_H - 40);
          moving = true;
          if (Math.abs(dx) > 0.1) {
            const facing = dx > 0 ? 1 : -1;
            if (facing !== f.facing) {
              f.facing = facing;
              if (playerFlipRef.current) playerFlipRef.current.style.transform = `scaleX(${facing})`;
            }
          }
        }
      }

      if (moving) {
        lastMove.current = now;
        look.current.x *= 0.9;
        look.current.y *= 0.9;
      }
      if (moving !== f.walking) {
        f.walking = moving;
        setWalking(moving);
      }
      const sleepy = now - lastMove.current > 20000 && !openRef.current;
      if (sleepy !== f.asleep) {
        f.asleep = sleepy;
        setAsleep(sleepy);
      }
      const mountain = zoneById("mountain")!;
      const sw = Math.hypot(p.x - mountain.x, p.y - mountain.y) < 700;
      if (sw !== f.sweat) {
        f.sweat = sw;
        setSweat(sw);
      }
      const nt = p.x > 2000 && p.y < 860;
      if (nt !== f.night) {
        f.night = nt;
        setNight(nt);
      }

      // zone enter
      const inside = ZONES.find((z) => Math.hypot(p.x - z.x, p.y - z.y) < z.r)?.id ?? null;
      if (inside !== lastZone.current) {
        lastZone.current = inside;
        if (inside && !openRef.current && !first) openZone(inside);
      }

      // cousins wander the beach; bump one to chat
      cousins.current.forEach((c, i) => {
        if (!c.t) {
          c.wait -= dt;
          if (c.wait <= 0) c.t = { x: rand(BEACH.x0, BEACH.x1), y: rand(BEACH.y0, BEACH.y1) };
        } else {
          const dx = c.t.x - c.p.x;
          const dy = c.t.y - c.p.y;
          const d = Math.hypot(dx, dy);
          if (d < 6) {
            c.t = null;
            c.wait = rand(0.5, 3);
          } else {
            c.p.x += (dx / d) * COUSIN_SPEED * dt;
            c.p.y += (dy / d) * COUSIN_SPEED * dt;
          }
        }
        const el = cousinRefs.current[i];
        if (el) {
          el.style.transform = `translate(${c.p.x - 55}px, ${c.p.y - 120}px)`;
          el.style.zIndex = String(Math.round(c.p.y));
          const flip = el.firstElementChild as HTMLElement | null;
          if (flip && c.t) flip.style.transform = `scaleX(${c.t.x > c.p.x ? 1 : -1})`;
        }
        if (!openRef.current && now > bumpCooldown.current && Math.hypot(c.p.x - p.x, c.p.y - p.y) < 80) {
          bumpCooldown.current = now + 2500;
          setPicked(WALKERS[i]!.id);
          openZone("beach");
        }
      });

      // camera
      const view = viewRef.current;
      if (view) {
        const z = zoom.current;
        const tx = view.clientWidth / 2 - p.x * z + look.current.x;
        const ty = view.clientHeight / 2 - (p.y - 60) * z + look.current.y;
        const k = first ? 1 : 1 - Math.pow(0.001, dt);
        cam.current.x += (tx - cam.current.x) * k;
        cam.current.y += (ty - cam.current.y) * k;
        if (worldRef.current) worldRef.current.style.transform = `translate(${cam.current.x}px, ${cam.current.y}px) scale(${z})`;
      }
      if (playerRef.current) {
        playerRef.current.style.transform = `translate(${p.x - 60}px, ${p.y - 135}px)`;
        playerRef.current.style.zIndex = String(Math.round(p.y) + 1);
      }
      if (miniDotRef.current) {
        miniDotRef.current.setAttribute("cx", String(p.x));
        miniDotRef.current.setAttribute("cy", String(p.y));
      }
      first = false;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [openZone]);

  // drag to look around, tap to walk
  const drag = useRef<{ x: number; y: number; lx: number; ly: number; moved: boolean } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a, [data-ui]")) return;
    drag.current = { x: e.clientX, y: e.clientY, lx: look.current.x, ly: look.current.y, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) > 8) d.moved = true;
    if (d.moved) look.current = { x: d.lx + dx, y: d.ly + dy };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.moved || openRef.current) return;
    const rect = viewRef.current!.getBoundingClientRect();
    const z = zoom.current;
    target.current = {
      x: clamp((e.clientX - rect.left - cam.current.x) / z, 60, WORLD_W - 60),
      y: clamp((e.clientY - rect.top - cam.current.y) / z, 140, WORLD_H - 40),
    };
    setHint(false);
  };

  const pad = (k: string) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      keys.current.add(k);
      setHint(false);
    },
    onPointerUp: () => keys.current.delete(k),
    onPointerLeave: () => keys.current.delete(k),
  });

  const openZoneData = open ? zoneById(open) : null;

  return (
    <div className="fixed inset-0 overflow-hidden bg-floor">
      {/* the world */}
      <div
        ref={viewRef}
        className="absolute inset-0 cursor-crosshair touch-none select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div ref={worldRef} className="absolute left-0 top-0 origin-top-left will-change-transform" style={{ width: WORLD_W, height: WORLD_H }}>
          <WorldScenery />

          {/* statue */}
          <div className="pointer-events-none absolute" style={{ left: 1500, top: 940, width: 200, zIndex: 1150 }}>
            <Kumpa className="boil-slow w-full" />
          </div>

          {/* zone labels */}
          {ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => travel(z.id)}
              className={cn(
                "sketch-thin shadow-hard-sm absolute -translate-x-1/2 whitespace-nowrap px-3 py-1 font-display text-2xl uppercase transition-transform hover:-rotate-2",
                visited.includes(z.id) ? "bg-kumpa" : "bg-cream",
              )}
              style={{ left: z.x, top: z.y - z.r - 30, zIndex: 3000 }}
            >
              {visited.includes(z.id) && "✓ "}
              {z.name}
            </button>
          ))}

          {/* cousins */}
          {WALKERS.map((w, i) => (
            <div key={w.id} ref={(el) => { cousinRefs.current[i] = el; }} className="pointer-events-none absolute left-0 top-0 w-[110px]">
              <div>
                <div className="animate-waddle" style={{ animationDuration: `${0.6 + i * 0.07}s` }}>
                  <KumpaCritter skin={w.skin} gear={w.gear} className="w-full" />
                </div>
              </div>
            </div>
          ))}

          {/* player */}
          <div ref={playerRef} className="pointer-events-none absolute left-0 top-0 w-[120px]">
            {asleep && <p className="animate-bob absolute -top-10 left-16 font-display text-3xl">z z Z… finally</p>}
            <div ref={playerFlipRef}>
              {walking ? (
                <div
                  aria-hidden
                  className="animate-walk-sprite aspect-square w-full scale-125 bg-no-repeat"
                  style={{ backgroundImage: `url(${walkSprite})`, backgroundSize: "800% 100%" }}
                />
              ) : (
                <img src={idleSprite} alt="" aria-hidden draggable={false} className="aspect-square w-full scale-125 animate-bob" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* night tint */}
      <div className={cn("pointer-events-none absolute inset-0 bg-night-deep transition-opacity duration-1000", night ? "opacity-30" : "opacity-0")} />

      {/* top bar */}
      <header data-ui className="absolute inset-x-0 top-0 z-[5000] flex items-center justify-between gap-2 border-b-4 border-ink bg-wall px-3 py-2">
        <div className="flex items-center gap-2">
          <Kumpa className="boil-slow h-10 w-10" watching={false} />
          <span className="font-display text-2xl uppercase sm:text-3xl">Kumpaland</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="sketch-thin hidden bg-cream px-2 py-0.5 text-lg sm:inline">
            lore found: {visited.length}/{ZONES.length}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="kumpa">Fast travel</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="sketch-thin bg-cream">
              <DropdownMenuLabel>teleport (lazy)</DropdownMenuLabel>
              {ZONES.map((z) => (
                <DropdownMenuItem key={z.id} onSelect={() => travel(z.id)} className="text-lg">
                  {visited.includes(z.id) ? "✓" : "·"} {z.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="blue" onClick={onBoring}>boring mode</Button>
        </div>
      </header>

      {/* hint */}
      {hint && (
        <div data-ui className="sketch shadow-hard pointer-events-none absolute left-1/2 top-24 z-[5000] w-[min(92vw,30rem)] -translate-x-1/2 -rotate-1 bg-paper px-4 py-3 text-center text-xl">
          walk with <b>WASD</b> / arrows, or <b>tap</b> anywhere. drag to look around. scroll to zoom.
          <br />walk into a place to read its lore.
        </div>
      )}

      {/* mini-map */}
      <div data-ui className="sketch shadow-hard absolute bottom-3 right-3 z-[5000] hidden overflow-hidden bg-floor sm:block">
        <svg viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} className="block h-[120px] w-[160px]">
          <path d="M2000 0 H3200 V860 L2000 760 Z" fill="var(--night)" />
          <path d="M1100 1700 H2250 V2400 H1150 Z" fill="var(--sand)" />
          {ZONES.map((z) => (
            <circle
              key={z.id}
              cx={z.x}
              cy={z.y}
              r={120}
              fill={visited.includes(z.id) ? "var(--kumpa)" : "var(--cream)"}
              stroke="var(--ink)"
              strokeWidth="24"
              className="cursor-pointer"
              onClick={() => travel(z.id)}
            />
          ))}
          <circle ref={miniDotRef} cx={SPAWN.x} cy={SPAWN.y} r={70} fill="var(--crash)" stroke="var(--ink)" strokeWidth="20" />
        </svg>
      </div>

      {/* phone pad */}
      <div data-ui className="absolute bottom-4 left-4 z-[5000] grid grid-cols-3 gap-1 md:hidden">
        <span />
        <button type="button" aria-label="Walk up" className="sketch-thin h-12 w-12 bg-cream text-2xl" {...pad("u")}>▲</button>
        <span />
        <button type="button" aria-label="Walk left" className="sketch-thin h-12 w-12 bg-cream text-2xl" {...pad("l")}>◀</button>
        <span />
        <button type="button" aria-label="Walk right" className="sketch-thin h-12 w-12 bg-cream text-2xl" {...pad("r")}>▶</button>
        <span />
        <button type="button" aria-label="Walk down" className="sketch-thin h-12 w-12 bg-cream text-2xl" {...pad("d")}>▼</button>
        <span />
      </div>

      {/* place panel */}
      <Dialog open={!!open} onOpenChange={(o) => !o && closeZone()}>
        <DialogContent className="sketch shadow-hard max-h-[88vh] w-[95vw] max-w-5xl gap-0 overflow-y-auto overflow-x-hidden bg-wall p-0">
          {openZoneData && (
            <>
              <div className="sticky top-0 z-10 border-b-4 border-ink bg-crash px-5 py-3">
                <DialogTitle className="font-display text-4xl uppercase">{openZoneData.name}</DialogTitle>
                <DialogDescription className="text-lg text-ink">{openZoneData.blurb}</DialogDescription>
              </div>
              <ZoneContent id={openZoneData.id} picked={picked} onPick={setPicked} />
              <div className="flex justify-center bg-wall p-6">
                <Button variant="kumpa" size="xl" onClick={closeZone}>keep exploring</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
