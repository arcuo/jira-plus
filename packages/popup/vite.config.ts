import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/popup.js",
        assetFileNames: (info) => {
          if (info.name.endsWith(".css")) {
            return "assets/popup.css";
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },
});
