const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    

    specPattern: 'cypress/integration/*.js',

    viewportWidth: 1920,
    viewportHeight: 1080

  },
});
