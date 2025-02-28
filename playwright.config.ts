import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.spec.ts"],
  webServer: {
    command: "pnpm run dev",
    port: 5173, // Default Vite port
    reuseExistingServer: true,
  },
});
