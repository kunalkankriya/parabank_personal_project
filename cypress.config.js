const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  retries:{
    runMode: 2,
    openMode:0
},
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://parabank.parasoft.com/",
    specPattern: "cypress/e2e/**/*.{js, jsx, ts, tsx}"
  },
});
