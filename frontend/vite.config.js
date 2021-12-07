import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { preprocess } from "./svelte.config";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ preprocess })],
  optimizeDeps: {
    exclude: ["tinro"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
