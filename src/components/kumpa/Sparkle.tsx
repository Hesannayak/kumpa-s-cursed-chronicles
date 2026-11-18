export function Sparkle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={{ animationDelay: `${delay}s` }} aria-hidden>
      <path
        d="M20 2 C 22 14, 26 18, 38 20 C 26 22, 22 26, 20 38 C 18 26, 14 22, 2 20 C 14 18, 18 14, 20 2 Z"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
