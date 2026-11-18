/** Places in the Kumpaland open world. Coordinates are world pixels (WORLD_W × WORLD_H). */
export const WORLD_W = 3200;
export const WORLD_H = 2400;

export type ZoneId = "town" | "bedroom" | "kitchen" | "mountain" | "cave" | "beach" | "billboard" | "tower";

export interface Zone {
  id: ZoneId;
  name: string;
  x: number;
  y: number;
  r: number;
  chapters: number[];
  blurb: string;
}

export const ZONES: Zone[] = [
  { id: "town", name: "Town Square", x: 1600, y: 1180, r: 170, chapters: [], blurb: "where it all began. the statue is watching." },
  { id: "bedroom", name: "Gm Bedroom", x: 650, y: 1150, r: 210, chapters: [1], blurb: "he woke up. he said Gm. mistake." },
  { id: "kitchen", name: "Launchpad Kitchen", x: 750, y: 1900, r: 220, chapters: [2, 3], blurb: "something is cooking. nobody knows what." },
  { id: "mountain", name: "Chart Mountain", x: 1250, y: 430, r: 260, chapters: [4, 5], blurb: "it only goes down. like, really down." },
  { id: "cave", name: "Hacker Cave", x: 2550, y: 1180, r: 220, chapters: [6, 7], blurb: "green screens. empty wallets." },
  { id: "beach", name: "The Beach", x: 1650, y: 1950, r: 300, chapters: [], blurb: "cousins live here. bump one to talk." },
  { id: "billboard", name: "Damage Billboard", x: 2600, y: 1950, r: 220, chapters: [], blurb: "live stats + a poke booth." },
  { id: "tower", name: "Gn Tower", x: 2550, y: 420, r: 240, chapters: [8, 9, 10], blurb: "the night zone. he will not sleep." },
];

export const zoneById = (id: string) => ZONES.find((z) => z.id === id);
