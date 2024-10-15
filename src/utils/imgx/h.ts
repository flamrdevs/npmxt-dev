import type { Tag, Props, Node, Component } from "./types";

const h = (t: Tag | Component, p: Props): Node => (typeof t === "function" ? t(p) : { type: t, props: p });
export const r = (t: Tag | Component.Root, p: Props.Root): Node.Root => h(t, p) as any;
export const e = (t: Tag | Component.Default, p: Props.Default): Node.Default => h(t, p) as any;
