import { type CSS, type Children, h } from '~/utils/imgx';

import { png } from './imgx';

export const width = 1200;
export const height = 680;

export const og = (children: (e: typeof h.e) => Children, style: Partial<CSS.Properties.Root> = {}) => png(h.r('div', { style: { width, height, ...style }, children: children(h.e) }));
