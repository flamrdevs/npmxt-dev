import type { Node } from "./types";
import * as core from "./core";

type Options = { maxAge?: number };

const init = (contentType: string, options?: Options) => ({
  headers: {
    "content-type": contentType,
    "cache-control": `public, max-age=${options?.maxAge ?? (import.meta.dev ? 1 : 86400)}`,
  },
});

const svg = async (node: Node.Root, options?: Options) => {
  return new Response(await core.svg(node), init("image/svg+xml", options));
};

const png = async (node: Node.Root, options?: Options) => {
  return new Response(await core.png(node), init("image/png", options));
};

export { svg, png };
