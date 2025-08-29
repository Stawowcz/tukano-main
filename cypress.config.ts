import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://beckett.com/",
    specPattern: "tests/**/*.spec.{ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ) {
      return config;
    },
    reporter: "mochawesome",
    retries: { runMode: 2, openMode: 0 },
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 90000,
    reporterOptions: {
      reportDir: "cypress/reports/mochawesome",
      overwrite: false,
      html: true,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },
  },
});
