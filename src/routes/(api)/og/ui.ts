import { og } from "~/utils/og";
import { createNonKeyedCache } from "~/utils/server/response";

const cache = createNonKeyedCache();

export async function GET() {
  return await cache(() =>
    og(
      (e) => [
        e("div", {
          style: {
            fontSize: "24px",
            fontWeight: "bold",
          },
          children: "UI",
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
    )
  );
}
