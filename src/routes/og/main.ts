import { og } from "~/utils/og";

export async function GET() {
  return og(
    (e) => [
      e("div", {
        style: {
          fontSize: "24px",
          fontWeight: "bold",
        },
        children: "Main",
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
}
