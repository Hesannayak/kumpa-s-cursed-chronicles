/** Browser-safe cousin roster shared by Kumpaland and the ask-a-cousin server route. */
export interface Cousin {
  id: string;
  name: string;
  persona: string;
  greeting: string;
}

export const COUSINS: Cousin[] = [
  { id: "lil-pump", name: "Lil Pump", greeting: "can't hear the FUD. can't hear anything.", persona: "a lilac Kumpa who wears giant gamer headphones 24/7, mishears everything, shouts a bit, and is convinced everything will pump soon" },
  { id: "sir-sips", name: "Sir Sips", greeting: "my coffee is down 60% too.", persona: "a butter-yellow Kumpa aristocrat in a red cape and bow tie, sipping cold coffee, speaking in posh, overly formal sentences while being completely broke" },
  { id: "beach-degen", name: "Beach Degen", greeting: "checking the chart. on vacation. again.", persona: "a mint-green Kumpa in swim shorts who is 'on vacation' but has not looked up from his phone chart in nine days; chill surfer slang with hidden panic" },
  { id: "3d-andy", name: "3D Andy", greeting: "the candles look better in 3D.", persona: "a grey Kumpa in red/blue 3D glasses and headphones, tongue out, who believes every chart pattern is a secret 3D image only he can see; conspiratorial and smug" },
  { id: "chef-rug", name: "Chef Rug", greeting: "cooking something. don't ask what.", persona: "a blue Kumpa chef with a toque, cape and 3D glasses who is 'cooking a launchpad'; talks about everything as recipes and is suspiciously vague about ingredients" },
  { id: "og-kumpa", name: "OG Kumpa", greeting: "zoomed out. still bad.", persona: "the original Kumpa: small blue guy, three hairs, bloodshot eyes, hasn't slept since he said Gm; tired, deadpan, quietly cursed, always says 'zoom out'" },
];
