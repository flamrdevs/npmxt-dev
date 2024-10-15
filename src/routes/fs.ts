import fs from "node:fs/promises";

export async function GET() {
  return await fs.readdir(process.cwd(), { recursive: true });
}
