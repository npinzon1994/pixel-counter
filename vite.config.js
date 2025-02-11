import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend server address
        changeOrigin: true, // Ensures the host header matches the target
        secure: false, // Disable SSL verification (if needed for local dev)
      },
    },
  },
});
