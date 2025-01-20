import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@GlobalComponents": "/src/components",
      "@Pages": "/src/pages",
    },
  },
});
