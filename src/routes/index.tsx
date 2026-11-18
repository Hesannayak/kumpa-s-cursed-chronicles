import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { SketchFilters } from "@/components/kumpa/SketchFilters";
import { DamageReport, Footer, Hero, Nav, PokeKumpa, Story, Ticker } from "@/components/kumpa/sections";

const TITLE = "KUMPA — Zoomed Out. Still Bad.";
const DESCRIPTION =
  "The cursed and completely true story of Kumpa: a small blue guy, three hairs, one red chart and zero hours of sleep.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  // Cursed: Kumpa notices when you leave the tab.
  useEffect(() => {
    const onVis = () => {
      document.title = document.hidden ? "come back… kumpa is scared" : TITLE;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip">
      <SketchFilters />
      <Nav />
      <Hero />
      <Ticker />
      <Story />
      <Ticker reverse />
      <DamageReport />
      <PokeKumpa />
      <Footer />
    </div>
  );
}
