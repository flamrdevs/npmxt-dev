import type { APIEvent } from '@solidjs/start/server';

import { parsePackageNameObject } from './core';

export const parsePackageNameAPIEventParams = (event: APIEvent) => parsePackageNameObject(event.params);
