import fs from "node:fs/promises";
import path from "node:path";

import type { Font } from "satori";

const file = async (source: string, name: string, style?: Font["style"], weight?: Font["weight"]) => ({
  data: await fs.readFile(source),
  name,
  style,
  weight,
});

export const load = async () => {
  const cwd = process.cwd();
  return await Promise.all(
    ([300, 400, 500, 600, 700] as const).map((weight) =>
      file(path.resolve(cwd, `./assets/fonts/source-code-pro-${weight}.woff`), "source-code-pro", "normal", weight)
    )
  );
};
