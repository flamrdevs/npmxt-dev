import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "netlify",
    prerender: {
      routes: ["/", "/about", "/ui"],
    },
    sourceMap: false,
  },
});
