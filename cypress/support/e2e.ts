import "./commands.ts";
import "@testing-library/cypress/add-commands";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
