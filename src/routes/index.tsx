import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { WorldMap } from "@/components/kumpa/WorldMap";

import { KumpaWorld } from "@/components/kumpa/KumpaWorld";
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

  const [boring, setBoring] = useState(false);
  useEffect(() => {
    setBoring(new URL(window.location.href).searchParams.get("boring") === "1");
  }, []);
  const setMode = (b: boolean) => {
    const url = new URL(window.location.href);
    if (b) url.searchParams.set("boring", "1");
    else url.searchParams.delete("boring");
    url.searchParams.delete("zone");
    window.history.replaceState(null, "", url);
    setBoring(b);
  };

  return (
    <>
      <SketchFilters />
      {boring ? (
        <div className="min-h-screen overflow-x-clip">
          <Nav />
          <div className="fixed bottom-4 right-4 z-50">
            <Button variant="kumpa" size="xl" onClick={() => setMode(false)}>back to the world</Button>
          </div>
          <Hero />
          <Ticker />
          <KumpaWorld />
          <Story />
          <Ticker reverse />
          <DamageReport />
          <PokeKumpa />
          <Footer />
        </div>
      ) : (
        <WorldMap onBoring={() => setMode(true)} />
      )}
    </>
  );
}
