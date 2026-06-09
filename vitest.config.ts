import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: () => import("@vitest/browser-playwright"),
      instances: [{ browser: "chromium" }],
    },
  },
});
