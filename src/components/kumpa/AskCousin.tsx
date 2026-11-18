import { useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COUSINS } from "./cousins";

interface Props {
  pickedId: string;
  onPick: (id: string) => void;
  renderFace: (id: string) => ReactNode;
}

const EXAMPLES = ["should i buy more?", "how do you sleep at night?", "what's for dinner?", "is it over?"];

export function AskCousin({ pickedId, onPick, renderFace }: Props) {
  const cousin = COUSINS.find((c) => c.id === pickedId) ?? COUSINS[0]!;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const abort = useRef<AbortController | null>(null);

  const pick = (id: string) => {
    abort.current?.abort();
    onPick(id);
    setAnswer("");
    setError(null);
  };

  const ask = async (q = question) => {
    const text = q.trim();
    if (!text || busy) return;
    setQuestion(text);
    setBusy(true);
    setAnswer("");
    setError(null);
    const ctrl = new AbortController();
    abort.current = ctrl;
    try {
      const res = await fetch("/api/kumpa-ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cousinId: cousin.id, question: text }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "The cousin fell asleep mid-thought. Try again.");
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        setAnswer((a) => a + dec.decode(value, { stream: true }));
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError("Couldn't reach Kumpaland. Check your connection.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div id="ask" className="border-t-4 border-ink bg-wall px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <h3 className="font-display text-4xl uppercase md:text-5xl">Ask a Kumpa cousin</h3>
        <p className="mt-1 text-xl text-muted-foreground">pick a cousin (or click one walking by). AI-powered. advice quality: cursed.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {COUSINS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => pick(c.id)}
              className={cn("sketch-thin px-3 py-1 text-lg transition-transform hover:-rotate-2", c.id === cousin.id ? "bg-crash shadow-hard-sm" : "bg-cream")}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-end gap-6 md:grid-cols-[180px_1fr]">
          <div className="animate-bob mx-auto w-36 md:w-full">{renderFace(cousin.id)}</div>
          <div>
            <div className="sketch shadow-hard relative min-h-28 bg-paper p-5 text-2xl leading-snug">
              <p className="text-base text-muted-foreground">{cousin.name} says:</p>
              {error ? (
                <p className="text-destructive">{error}</p>
              ) : answer ? (
                <p>{answer}</p>
              ) : busy ? (
                <p className="animate-pulse">…thinking (badly)</p>
              ) : (
                <p>“{cousin.greeting}”</p>
              )}
            </div>
            <form
              className="mt-5 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                void ask();
              }}
            >
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={400}
                placeholder={`ask ${cousin.name} anything…`}
                aria-label={`Question for ${cousin.name}`}
                className="sketch-thin flex-1 bg-cream px-4 py-3 text-xl outline-none focus:bg-paper"
              />
              <Button type="submit" variant="kumpa" size="xl" disabled={busy || !question.trim()}>
                {busy ? "asking…" : "Ask"}
              </Button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2 text-base">
              {EXAMPLES.map((q) => (
                <button key={q} type="button" onClick={() => void ask(q)} className="rounded px-2 underline decoration-wavy hover:bg-kumpa">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
