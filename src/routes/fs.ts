import fs from "node:fs/promises";

export async function GET() {
  const dirents = await fs.readdir("./", { withFileTypes: true, recursive: true });
  const result: string[] = [];

  for (const dirent of dirents) {
    const name = dirent.name;
    if (name.startsWith("node_modules/public")) {
      result.push(name);
    } else if (!name.startsWith("node_modules")) {
      result.push(name);
    }
  }

  return result;
}
