// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://pro-qcp-dev.carepointsolutions.com",  // 👈 Your base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      validEmail: "babagif706",   // 👈 store credentials here
      validPassword: "123456"
    }
  }
});
