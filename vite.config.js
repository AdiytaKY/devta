import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./dist",
    chunkSizeWarningLimit: 1000,
  },
  base: process.env.APP_IS_DEV ? "" : "./",
  plugins: [vue()],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "balm-ui-plus": "balm-ui/dist/balm-ui-plus.esm.js",
      "balm-ui-css": "balm-ui/dist/balm-ui.css",
      "@": path.resolve(__dirname, "src/components/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@stores": path.resolve(__dirname, "src/stores/"),
      "@src": path.resolve(__dirname, "src/"),
    },
  },
  server: {
    port: 3000,
  },
});
