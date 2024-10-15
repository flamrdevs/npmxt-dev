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

        const server_node_modules = ".netlify/functions-internal/server/node_modules";

        await fs.mkdir(path.resolve(cwd, server_node_modules, "public"));
        await fs.writeFile(path.resolve(cwd, server_node_modules, "public/package.json"), JSON.stringify({ name: "public" }));

        await Promise.all(
          [300, 400, 500, 600, 700].map((weight) => {
            const from = `public/fonts/source-code-pro-${weight}.woff`;
            return fs.cp(path.resolve(cwd, from), path.resolve(cwd, server_node_modules, from), { recursive: true });
          })
        );
      },
    },
  },
});
