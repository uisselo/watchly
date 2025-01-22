import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@API": "/src/api",
      "@Assets": "/src/assets",
      "@Config": "/src/config",
      "@Modules": "/src/modules",
      "@GlobalComponents": "/src/components",
      "@Pages": "/src/pages",
      "@Utilities": "/src/utils",
    },
  },
});
