import satori, { type Font } from "satori";

import { renderAsync, type ResvgRenderOptions } from "@resvg/resvg-js";

import type { Node } from "./types";

const svg = (() => {
  const fonts = (() => {
    let fonts: Font[];

    return async () => (fonts ??= await (import.meta.env.DEV ? await import("./core/font-dev") : await import("./core/font-prod")).load());
  })();

  return async (node: Node.Root) => {
    const { type, props } = node,
      { width, height } = props.style;
    props.style.width = props.style.height = "100%" as unknown as number;
    if (typeof props.style.fontFamily === "undefined") props.style.fontFamily = "source-code-pro";
    if (typeof props.style.fontSize === "undefined") props.style.fontSize = "16px";
    if (typeof props.style.fontStyle === "undefined") props.style.fontStyle = "normal";
    if (typeof props.style.fontWeight === "undefined") props.style.fontWeight = 400;
    return await satori({ type, props } as any, { fonts: await fonts(), width, height });
  };
})();

const png = (() => {
  const resvgRenderOptions: ResvgRenderOptions = { fitTo: { mode: "original" }, imageRendering: 0, shapeRendering: 2, dpi: 300 };

  return async (node: Node.Root) => (await renderAsync(await svg(node), resvgRenderOptions)).asPng();
})();

export { svg, png };
