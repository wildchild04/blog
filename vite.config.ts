import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "assets",
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: "src/main.tsx",
      name: "BlogApp",
      formats: ["iife"],
      fileName: () => "js/blog-app.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "css/blog-app.css";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
