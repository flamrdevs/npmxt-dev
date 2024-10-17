import type { APIEvent } from "@solidjs/start/server";

import { createStrictParserCreator } from "./../valibot";

export const createAPIEventParamsParser = createStrictParserCreator((event: APIEvent) => event.params);
