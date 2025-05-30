import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  component: {
    // implement node event listeners here

    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    specPattern: "cypress/**/*.cy.{js,jsx,ts,tsx}",
    video: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);

      return config;
      // implement node event listeners here
    },
    video: true,
  },
});
