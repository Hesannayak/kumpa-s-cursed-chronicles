import { createFileRoute } from "@tanstack/react-router";

import { handleKumpaAsk } from "@/lib/kumpa-ask.server";

export const Route = createFileRoute("/api/kumpa-ask")({
  server: { handlers: { POST: ({ request }) => handleKumpaAsk(request) } },
});
