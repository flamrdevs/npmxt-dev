import fs from "node:fs/promises";

export async function GET() {
  return (await fs.readdir("./", { withFileTypes: true, recursive: true }))
    .filter((d) => !d.name.startsWith("node_modules"))
    .filter((d) => d.isFile());
}
