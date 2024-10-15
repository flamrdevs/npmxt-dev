import fs from "node:fs/promises";

import satori, { type Font } from "satori";

import { renderAsync, type ResvgRenderOptions } from "@resvg/resvg-js";

import type { Node } from "./types";

const svg = (() => {
  const fonts = (() => {
    let fonts: Font[];

    const file = async (source: string, name: string, style?: Font["style"], weight?: Font["weight"]) => ({
      data: await fs.readFile(source),
      name,
      style,
      weight,
    });

    const load = async () =>
      await Promise.all(
        ([300, 400, 500, 600, 700] as const).map((weight) =>
          file(`.${import.meta.dev ? "/public" : ""}/fonts/source-code-pro-${weight}.woff`, "source-code-pro", "normal", weight)
        )
      );

    return async () => (fonts ??= await load());
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
