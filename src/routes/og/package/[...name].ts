import type { APIEvent } from "@solidjs/start/server";

import * as v from "valibot";

import { createAPIEventParamsParser } from "~/utils/server";

import { og } from "~/utils/og";

const parseParams = createAPIEventParamsParser(v.object({ name: v.string() }));

export async function GET(event: APIEvent) {
  try {
    const { name } = parseParams(event);
    return og(
      (e) => [
        e("div", {
          style: {
            fontSize: "24px",
            fontWeight: "bold",
          },
          children: `Package[${name}]Page`,
        }),
      ],
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        color: "white",
        border: "1px solid black",
      }
    );
  } catch (error) {
    return {
      error,
    };
  }
}
