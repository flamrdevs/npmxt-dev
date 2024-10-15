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

        const cp = (src: string, dest: string) => {
          console.log(`cp(${src},${dest})`);
          return fs.cp(src, dest, { recursive: true });
        };

        await Promise.all(
          [300, 400, 500, 600, 700].map((weight) => {
            const woff = `source-code-pro-${weight}.woff`;
            return cp(
              path.resolve(cwd, `public/fonts/${woff}`),
              path.resolve(cwd, `.netlify/functions-internal/server/chunks/fonts/${woff}`)
            );
          })
        );
      },
    },
  },
});
