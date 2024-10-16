import type { Font } from "satori";

import { name, weights } from "./font";

const file = async (source: string, name: string, style?: Font["style"], weight?: Font["weight"]) => ({
  data: (await import(source)).default,
  name,
  style,
  weight,
});

export const load = () => Promise.all(weights.map((weight) => file(`./../raw/${name}-${weight}.mjs`, name, "normal", weight)));
