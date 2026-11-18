import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import { COUSINS } from "@/components/kumpa/cousins";

const MODEL = "openai/gpt-6-astra";

function json(status: number, error: string) {
  return new Response(JSON.stringify({ error }), { status, headers: { "Content-Type": "application/json" } });
}

function friendly(status: number | undefined, fallback: string) {
  if (status === 429) return "Too many Kumpas talking at once. Try again in a moment.";
  if (status === 402) return "Kumpaland ran out of AI credits. The owner needs to top up in Settings → Plans & credits.";
  if (status === 403) return "This cousin isn't allowed to talk right now.";
  return fallback;
}

export async function handleKumpaAsk(request: Request): Promise<Response> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return json(500, "AI is not configured.");

  let body: { cousinId?: unknown; question?: unknown };
  try {
    body = await request.json();
  } catch {
    return json(400, "Bad request.");
  }
  const cousin = COUSINS.find((c) => c.id === body.cousinId);
  const question = typeof body.question === "string" ? body.question.trim().slice(0, 400) : "";
  if (!cousin || !question) return json(400, "Pick a cousin and ask something.");

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions: `You are ${cousin.name}, ${cousin.persona}. You live in Kumpaland, a cursed meme beach world of tired little Kumpa creatures obsessed with crypto charts that only go down. Stay fully in character. Reply in 1-3 short sentences, lowercase meme energy, funny and a bit cursed. Never give real financial advice; if asked, joke your way out. Keep it PG-13.`,
    messages: [{ role: "user", content: question }],
    abortSignal: request.signal,
    maxRetries: 0,
    providerOptions: {
      openai: { forceReasoning: true, reasoningEffort: "low", store: false },
    },
  });

  const reader = result.fullStream[Symbol.asyncIterator]();
  const encoder = new TextEncoder();

  // Wait for the first text (or error) so failures keep a real status code.
  let first: string | null = null;
  try {
    for (;;) {
      const { value, done } = await reader.next();
      if (done) break;
      if (value.type === "text-delta") { first = value.text; break; }
      if (value.type === "error") {
        const err = value.error as { statusCode?: number; message?: string };
        console.error("kumpa-ask error", err);
        return json(err.statusCode ?? 502, friendly(err.statusCode, "The cousin fell asleep mid-thought. Try again."));
      }
    }
  } catch (e) {
    const err = e as { statusCode?: number };
    console.error("kumpa-ask error", e);
    return json(err.statusCode ?? 502, friendly(err.statusCode, "The cousin fell asleep mid-thought. Try again."));
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      if (first) controller.enqueue(encoder.encode(first));
      try {
        for (;;) {
          const { value, done } = await reader.next();
          if (done) break;
          if (value.type === "text-delta") controller.enqueue(encoder.encode(value.text));
          if (value.type === "error") { controller.enqueue(encoder.encode(" …(connection lost)")); break; }
        }
      } catch {
        /* aborted */
      }
      controller.close();
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" } });
}
