import fs from "node:fs/promises";
import path from "node:path";

export async function GET() {
  return {
    "./": {
      "./": await fs.readdir("./"),
      "cwd()": await fs.readdir(process.cwd()),
    },
    "./../": {
      "./": await fs.readdir("./../"),
      "cwd()": await fs.readdir(path.resolve(process.cwd(), "../")),
    },
    "./../../": {
      "./": await fs.readdir("./../../"),
      "cwd()": await fs.readdir(path.resolve(process.cwd(), "../../")),
    },
    "./../../../": {
      "./": await fs.readdir("./../../../"),
      "cwd()": await fs.readdir(path.resolve(process.cwd(), "../../../")),
    },
  };
}
