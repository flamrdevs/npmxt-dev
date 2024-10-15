import type { APIEvent } from "@solidjs/start/server";

import * as v from "valibot";

export const createAPIEventParamsParser =
  <T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(schema: T) =>
  (event: APIEvent) =>
    v.parse(schema, event.params);
