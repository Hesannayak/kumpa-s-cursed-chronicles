import { useEffect, useRef, useState } from "react";

type Mood = "gm" | "cursed" | "shook";

interface KumpaProps {
  mood?: Mood;
  className?: string;
  /** Pupils chase the cursor across the whole page. */
  watching?: boolean;
  /** Number of hairs left (max 3). Kumpa started with 3. */
  hairs?: number;
  sweat?: boolean;
}

const EYES = [
  { cx: 148, cy: 200, r: 52 },
  { cx: 258, cy: 194, r: 56 },
];

const VEINS: [number, number, number, number][] = [
  [-30, -10, -16, -6],
  [-26, 18, -14, 12],
  [22, -20, 12, -12],
  [28, 14, 16, 8],
  [0, -40, 2, -28],
];

export function Kumpa({ mood = "cursed", className, watching = true, hairs = 3, sweat = false }: KumpaProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [pupils, setPupils] = useState(EYES.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    if (!watching) return;
    const onMove = (e: PointerEvent) => {
      const svg = ref.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const scale = rect.width / 400;
      setPupils(
        EYES.map((eye) => {
          const ex = rect.left + eye.cx * scale;
          const ey = rect.top + eye.cy * scale;
          const dx = e.clientX - ex;
          const dy = e.clientY - ey;
          const dist = Math.hypot(dx, dy) || 1;
          const max = eye.r * 0.55;
          const k = Math.min(1, dist / 300) * max;
          return { x: (dx / dist) * k, y: (dy / dist) * k };
        }),
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [watching]);

  const ink = "var(--ink)";
  const blue = "var(--kumpa)";
  const crash = "var(--crash)";
  const isGm = mood === "gm";

  return (
    <svg ref={ref} viewBox="0 0 400 440" className={className} role="img" aria-label="Kumpa, a small blue creature with bloodshot eyes">
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* hairs */}
        {hairs >= 1 && <path d="M192 74 C 186 52, 172 40, 156 36" fill="none" stroke={ink} strokeWidth="6" />}
        {hairs >= 2 && <path d="M202 72 C 200 48, 210 30, 224 24" fill="none" stroke={ink} strokeWidth="6" />}
        {hairs >= 3 && <path d="M210 76 C 220 60, 234 52, 252 54" fill="none" stroke={ink} strokeWidth="6" />}

        {/* arms */}
        <path d="M66 250 C 34 270, 26 320, 52 356" fill="none" stroke={ink} strokeWidth="34" />
        <path d="M66 250 C 34 270, 26 320, 52 356" fill="none" stroke={blue} strokeWidth="22" />
        <path d="M334 250 C 366 270, 374 320, 348 356" fill="none" stroke={ink} strokeWidth="34" />
        <path d="M334 250 C 366 270, 374 320, 348 356" fill="none" stroke={blue} strokeWidth="22" />

        {/* feet */}
        <ellipse cx="148" cy="404" rx="52" ry="24" fill={blue} stroke={ink} strokeWidth="7" />
        <ellipse cx="256" cy="404" rx="52" ry="24" fill={blue} stroke={ink} strokeWidth="7" />
        {[128, 146, 164, 236, 254, 272].map((x) => (
          <line key={x} x1={x} y1="410" x2={x} y2="424" stroke={ink} strokeWidth="4" />
        ))}

        {/* body */}
        <path
          d="M200 72 C 300 70, 348 150, 352 250 C 356 344, 316 404, 200 402 C 84 404, 44 344, 48 250 C 52 150, 100 74, 200 72 Z"
          fill={blue}
          stroke={ink}
          strokeWidth="8"
        />

        {/* spots */}
        <circle cx="92" cy="300" r="11" fill="none" stroke={ink} strokeWidth="5" />
        <circle cx="314" cy="318" r="10" fill="none" stroke={ink} strokeWidth="5" />
        <circle cx="118" cy="360" r="7" fill="none" stroke={ink} strokeWidth="4" />

        {/* eyes */}
        {EYES.map((eye, i) => (
          <g key={i}>
            <circle cx={eye.cx} cy={eye.cy} r={eye.r + 6} fill={ink} />
            {!isGm && <circle cx={eye.cx} cy={eye.cy + 2} r={eye.r - 1} fill={crash} />}
            <circle cx={eye.cx} cy={eye.cy - 3} r={eye.r - 6} fill="var(--paper)" />
            {!isGm &&
              VEINS.map(([x1, y1, x2, y2], j) => (
                <line
                  key={j}
                  x1={eye.cx + x1 * (eye.r / 52)}
                  y1={eye.cy + y1 * (eye.r / 52)}
                  x2={eye.cx + x2 * (eye.r / 52)}
                  y2={eye.cy + y2 * (eye.r / 52)}
                  stroke={crash}
                  strokeWidth="4"
                />
              ))}
            <circle
              cx={eye.cx + (pupils[i]?.x ?? 0)}
              cy={eye.cy + (pupils[i]?.y ?? 0)}
              r={mood === "shook" ? 6 : 10}
              fill={ink}
              style={{ transition: "cx 80ms linear, cy 80ms linear" }}
            />
          </g>
        ))}

        {/* eye bags — the real lore */}
        {!isGm && (
          <g fill="none" stroke={ink} strokeWidth="4">
            <path d="M98 268 C 130 280, 170 278, 196 262" />
            <path d="M108 284 C 135 292, 168 290, 188 280" />
            <path d="M214 260 C 245 276, 290 274, 314 256" />
            <path d="M222 278 C 250 288, 284 286, 304 274" />
          </g>
        )}

        {/* nose */}
        <circle cx="194" cy="296" r="3.5" fill={ink} />
        <circle cx="210" cy="296" r="3.5" fill={ink} />

        {/* mouth */}
        {isGm ? (
          <path d="M160 330 Q 200 350 245 328" fill="none" stroke={ink} strokeWidth="5" />
        ) : mood === "shook" ? (
          <ellipse cx="203" cy="338" rx="14" ry="18" fill="var(--navy)" stroke={ink} strokeWidth="5" />
        ) : (
          <path d="M176 338 Q 204 332 232 338" fill="none" stroke={ink} strokeWidth="5" />
        )}

        {/* chin wrinkle */}
        {!isGm && <path d="M168 372 Q 204 382 240 370" fill="none" stroke={ink} strokeWidth="4" />}

        {/* sweat drops */}
        {sweat && (
          <g className="animate-sweat">
            <path d="M84 170 q -8 14 0 18 q 8 -4 0 -18 Z" fill="var(--paper)" stroke={ink} strokeWidth="3" />
          </g>
        )}
        {sweat && (
          <g className="animate-sweat" style={{ animationDelay: "0.9s" }}>
            <path d="M322 150 q -8 14 0 18 q 8 -4 0 -18 Z" fill="var(--paper)" stroke={ink} strokeWidth="3" />
          </g>
        )}
      </g>
    </svg>
  );
}
