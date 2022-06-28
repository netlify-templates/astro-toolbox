import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: process.env.NETLIFY == 'true' ? process.env.DEPLOY_PRIME_URL : "http://localhost:8888",
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
