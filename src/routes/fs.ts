import fs from "node:fs/promises";

export async function GET() {
  return (await fs.readdir("./", { recursive: true })).filter((v) => !v.startsWith("node_modules"));
}
