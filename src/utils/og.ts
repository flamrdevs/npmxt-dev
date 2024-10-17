import type { CSS, Children } from "~/utils/imgx/types";
import { h, response } from "~/utils/imgx";

export const og = (children: (e: typeof h.e) => Children, style: Partial<CSS.Properties.Root> = {}) =>
  response.png(
    h.r("div", {
      style: {
        width: 1200,
        height: 680,
        ...style,
      },
      children: children(h.e),
    })
  );
