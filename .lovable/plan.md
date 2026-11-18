# Kumpaland: the whole site becomes an open world

Instead of scrolling down a long page, visitors land in one big hand-drawn map of Kumpaland. They drag around (or use arrow keys / WASD) and walk OG Kumpa between places. Each place opens a piece of the current site.

## The world map

```text
            [ Chart Mountain ]            [ Night Zone / Gn Tower ]
                    |                              |
 [ Gm Bedroom ] -- [ Town Square / spawn ] -- [ Hacker Cave ]
                    |                              |
   [ Launchpad Kitchen ]     [ Beach ]     [ Damage Report Billboard ]
                              (cousins)
```

- Peach ground, sand, wobbly ink paths, and the night area painted in the purple-blue night colour.
- Everything keeps the meme look: thick wobbly lines, Kumpa blue, crash orange, handwritten letters.
- Cousins wander around the world. The crab, birds and clouds stay.

## The places (current site content, moved into the world)

1. **Town Square (spawn):** the big Kumpa with eyes that follow you, the "Buy the top" button that runs away, and a signpost that explains how to move.
2. **Gm Bedroom:** story chapters 1–2 (Gm, Cooking).
3. **Launchpad Kitchen:** Chef Rug lives here, along with chapters 2–3.
4. **Chart Mountain:** a giant red chart you can climb, with chapters 4–5 (Zoomed out, $10 callout).
5. **Hacker Cave:** chapters 6–7 (Gamer mode, Hacking inu devs).
6. **Beach:** the walking cousins. Bump into one to open the "Ask a Kumpa cousin" chat (the AI chat keeps working).
7. **Damage Report Billboard:** the live stats, plus a Poke Kumpa booth next to it.
8. **Gn Tower (night zone):** chapters 8–10 and the final "Gn." ending.

When you walk into a place, a hand-drawn comic panel slides up with that place's chapter memes and story text. Close it to keep exploring.

## How you move around

- **Desktop:** WASD or arrow keys walk OG Kumpa. Clicking anywhere also walks him there. The view follows him. You can also drag to pan and scroll to zoom.
- **Phone:** tap where you want to go, or drag to look around. A small on-screen pad appears for walking.
- **Mini-map** in a corner. Visited places get a check mark. A "lore found: 4/8" counter fills up as you explore.
- **Fast-travel menu** in the top bar (Town, Beach, Chart Mountain…) for people who don't want to walk.
- **Skip-the-world link:** a "boring mode" button opens a plain list of all places, for accessibility and for search engines.

## Cursed touches

- Kumpa sweats more the closer he gets to Chart Mountain.
- The world turns to night when you enter the Gn zone.
- Stand still for 20 seconds and Kumpa falls asleep on the spot ("finally").
- The hidden-tab title joke stays.

## Technical details

- The index route renders a full-screen `KumpaWorldMap` with no page scroll. The world is one large SVG/DOM layer (about 4000×3000) moved with a transform. A camera follows the player using lerp. Wheel zoom uses cursor-anchored, delta-scaled math through a non-passive listener.
- Player movement runs in a `requestAnimationFrame` loop, colliding with zone hit boxes. Entering a zone opens a `ZonePanel` (a shadcn Sheet/Dialog) that reuses the existing `ChapterPanel`, `DamageReport`, `PokeKumpa` and `AskCousin` components.
- Zones are a data file (`zones.ts`: id, rect, chapters, component), so places are easy to reorder or add.
- Visited zones are kept in localStorage, read after the page has loaded.
- Deep links: `/?zone=beach` opens directly at that place, so people can share a spot.
- New SVG props: bed, kitchen, mountain, cave, tower, signposts.
- `/api/kumpa-ask` stays unchanged.
- `boring mode` renders the existing sections stacked, as they are today.
