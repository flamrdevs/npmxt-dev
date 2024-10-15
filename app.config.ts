import fs from "node:fs/promises";
import path from "node:path";

import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    prerender: {
      routes: ["/", "/about", "/ui"],
    },
    sourceMap: false,
    hooks: {
      close: async () => {
        const cwd = process.cwd();

        await Promise.all(
          [300, 400, 500, 600, 700]
            .map((name) => {
              const file = `fonts/source-code-pro-${name}.woff`;
              return { src: path.resolve(cwd, "public", file), dest: path.resolve(cwd, ".netlify/functions-internal/server/public", file) };
            })
            .map(({ src, dest }) => fs.cp(src, dest, { recursive: true }))
        );
      },
    },
  },
});
