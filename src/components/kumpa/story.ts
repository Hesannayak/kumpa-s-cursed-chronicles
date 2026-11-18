import gm from "@/assets/memes/gm.png.asset.json";
import cooking from "@/assets/memes/cooking.png.asset.json";
import oneMoreWin from "@/assets/memes/one-more-win.png.asset.json";
import zoomedOut from "@/assets/memes/zoomed-out.png.asset.json";
import callout from "@/assets/memes/callout.png.asset.json";
import gamer from "@/assets/memes/gamer.png.asset.json";
import hacking from "@/assets/memes/hacking.png.asset.json";
import thenVsNow from "@/assets/memes/then-vs-now.png.asset.json";
import mustache from "@/assets/memes/mustache.png.asset.json";
import gn from "@/assets/memes/gn.png.asset.json";

export interface Chapter {
  n: number;
  title: string;
  time: string;
  image: string;
  alt: string;
  story: string[];
  aside: string;
  night?: boolean;
}

export const CHAPTERS: Chapter[] = [
  {
    n: 1,
    title: "Gm",
    time: "Day 1 · 07:00",
    image: gm.url,
    alt: "Kumpa holding a coffee, watching the sunrise through a window",
    story: [
      "Once upon a candle, there was Kumpa. A small blue guy. Three hairs. A warm coffee. Zero coins.",
      "The sun came up. Kumpa said “Gm” to nobody in particular. Life was simple, because he owned nothing.",
    ],
    aside: "Hairs: 3 · Sanity: 100%",
  },
  {
    n: 2,
    title: "Cooking a launchpad...",
    time: "Day 1 · 09:06",
    image: cooking.url,
    alt: "Kumpa wearing a chef hat, typing next to a monitor with a rocket",
    story: [
      "At 9:04 Kumpa learned what a launchpad was. At 9:06 he was building one.",
      "He put on the chef hat. He did not know how to code. He did not know how to cook. Neither had ever stopped him.",
    ],
    aside: "Experience required: none",
  },
  {
    n: 3,
    title: "1 more win please",
    time: "Day 3 · 03:12",
    image: oneMoreWin.url,
    alt: "Sweating Kumpa at a keyboard staring at a falling chart",
    story: [
      "To fund the launchpad, Kumpa took “a couple of quick trades”. The chart only knew one direction.",
      "The first red veins appeared in his eyes. Sweat drops formed. He whispered the ancient prayer: just one more.",
    ],
    aside: "Wins: 0 · Prayers: 412",
  },
  {
    n: 4,
    title: "Zoomed out. Still bad.",
    time: "Day 9 · ???",
    image: zoomedOut.url,
    alt: "Kumpa holding up a phone with a crashing chart",
    story: [
      "The elders said: when in pain, zoom out. So he zoomed. 1H. 1D. 1W. All time.",
      "He zoomed out so far he could see the curvature of the earth. The line was still going down.",
    ],
    aside: "Timeframe: geological",
  },
  {
    n: 5,
    title: "$10 callout reward, yay!",
    time: "Day 14 · 14:20",
    image: callout.url,
    alt: "Kumpa jumping with joy holding a 10 dollar bill",
    story: [
      "Then — a miracle. Someone paid Kumpa $10 for a callout. He jumped. He had not jumped since Chapter 1.",
      "The gas fee to withdraw it was $11. He jumped anyway. Some wins are spiritual.",
    ],
    aside: "Net profit: −$1 · Joy: priceless",
  },
  {
    n: 6,
    title: "Gamer mode",
    time: "Day 22 · 02:47",
    image: gamer.url,
    alt: "Kumpa wearing a headset and holding a game controller",
    story: [
      "To cope, Kumpa entered gamer mode. Headset on. Controller gripped. Mouth slightly open.",
      "In games, when you die, you respawn. Kumpa found this deeply emotional.",
    ],
    aside: "Respawns: ∞ · Portfolio respawns: 0",
  },
  {
    n: 7,
    title: "Hacking all inu dev's wallet",
    time: "Day 30 · 00:00",
    image: hacking.url,
    alt: "Kumpa in a dark hoodie hacking a locked computer",
    night: true,
    story: [
      "The villain arc. Hoodie up. Monitor glowing. Every dog coin dev who ever rugged him — tonight, they pay.",
      "He cracked the first wallet. Password: “password123”. Balance: also zero. They were broke too. Kumpa felt a strange kinship.",
    ],
    aside: "Wallets hacked: 69 · Funds found: 0",
  },
  {
    n: 8,
    title: "Then vs now",
    time: "Many years later",
    image: thenVsNow.url,
    alt: "Young cheerful Kumpa with a bow tie next to old tired Kumpa",
    story: [
      "When GTA V came out, Kumpa had a bow tie, rosy cheeks and hope.",
      "By the time GTA VI comes out, Kumpa has eye bags with their own eye bags, a cup collection on the floor and exactly three hairs. Same three. They refuse to leave.",
    ],
    aside: "Cups on floor: several",
  },
  {
    n: 9,
    title: "The mustache",
    time: "The Elder Era",
    image: mustache.url,
    alt: "Old Kumpa with a long white mustache",
    story: [
      "Kumpa grew a mustache so he would look like someone who has been through things.",
      "He has. Young degens now come to him for wisdom. He says only: “zoom out”. Then he stares at the wall for nine minutes.",
    ],
    aside: "Wisdom: suspicious",
  },
  {
    n: 10,
    title: "Gn",
    time: "Every night · 04:30",
    image: gn.url,
    alt: "Kumpa in bed at night staring at his glowing phone",
    night: true,
    story: [
      "Kumpa says “Gn”. Kumpa is not going to sleep. The phone glows. The chart glows. His eyes glow back.",
      "In three hours the sun will rise and he will say “Gm” again. The cycle is eternal. The cycle is Kumpa.",
    ],
    aside: "Hours slept: 0 · Tomorrow: same",
  },
];

export const COPIUM = [
  "zoom out. no, further.",
  "it's not a loss if you never sell. it's a lifestyle.",
  "the chart is just resting. for 4 years.",
  "every red candle is a green candle viewed from australia.",
  "I'm not addicted. I can stop after one more win.",
  "my portfolio is down but my character development is up.",
  "Gm. (it is 4am. I never slept.)",
  "the $10 callout was the friends we made along the way.",
  "hair count stable at 3. bullish.",
  "dev wallet empty. we are all the same, inu dev and I.",
];

export const TICKER = [
  "KUMPA −99.9%",
  "ZOOMED OUT. STILL BAD.",
  "GM",
  "1 MORE WIN PLEASE",
  "$10 CALLOUT REWARD, YAY!",
  "HAIRS REMAINING: 3",
  "COOKING A LAUNCHPAD...",
  "NOT FINANCIAL ADVICE",
  "GN",
];
