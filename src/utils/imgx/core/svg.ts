import satori, { type Font } from "satori";

import type { Node } from "./../types";

import { name } from "./font";

const fonts = (() => {
  let fonts: Font[];

  return async () => (fonts ??= await (import.meta.env.DEV ? await import("./font-dev") : await import("./font-prod")).load());
})();

export const svg = async (node: Node.Root) => {
  const { type, props } = node,
    { width, height } = props.style;
  props.style.width = props.style.height = "100%" as unknown as number;
  if (typeof props.style.fontFamily === "undefined") props.style.fontFamily = name;
  if (typeof props.style.fontSize === "undefined") props.style.fontSize = "16px";
  if (typeof props.style.fontStyle === "undefined") props.style.fontStyle = "normal";
  if (typeof props.style.fontWeight === "undefined") props.style.fontWeight = 400;
  return await satori({ type, props } as any, { fonts: await fonts(), width, height });
};
