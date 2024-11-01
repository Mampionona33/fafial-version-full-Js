import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ["@tailwindConfig"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  preview: {
    port: 5173,
    host: "0.0.0.0",
    strictPort: true,
  },
  // server: {
  //   port: 5173,
  //   host: "0.0.0.0",
  //   strictPort: true,
  //   origin: "http://localhost:5173",
  // },
});
