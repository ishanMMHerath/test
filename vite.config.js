import { defineConfig } from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";
import ViteImages from "vite-plugin-vue-images";

export default defineConfig({
  plugins: [
    Vue(),
    ViteImages({
      dirs: ["src/assets/images"],
    }),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".css"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
