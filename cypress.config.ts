import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.MODE === "production" ? process.env.DEPLOY_URL : "http://localhost:8888",
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
