import fs from "node:fs/promises";

export async function GET() {
  return await fs.readdir("./node_modules/public", { recursive: true });
}
