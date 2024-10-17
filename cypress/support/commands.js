// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginWithCredential", () => {
  cy.fixture('credentials').then((loginData) => {
    cy.visit("/");
    cy.get('[name="username"]').type(loginData.userName);
    cy.get('[name="password"]').type(loginData.password);
    cy.get('[value="Log In"]').click();
    cy.contains(`Welcome ${loginData.firstName}`)
    })

});

Cypress.Commands.add("logout", () => {
    cy.contains('Log Out').click();
    cy.contains('Customer Login').should('be.visible');
});

Cypress.Commands.add("clickOptionWithElement", (element) => {
  cy.get(element).should("be.visible").click();
});

Cypress.Commands.add("clickOptionWithText", (locator) => {
  cy.contains(locator).should("be.visible").click();
});

Cypress.Commands.add("enterText", (text) => {
  cy.get('#amount').type(text);
});

Cypress.Commands.add("ensureElementPresent", (locator) => {
  return cy.get(locator).should("be.visible");
});

Cypress.Commands.add("ensureTextPresent", (text) => {
  return cy.contains(text).should("be.visible").should("exist");
});

Cypress.Commands.add("ensureTextNotPresent", (text) => {
  cy.contains(text).should("not.exist");
});

Cypress.Commands.add("ensureElementEnabled", (locator) => {
  cy.get(locator).should("be.enabled").click();
});

Cypress.Commands.add("getText", (rowIndex1, rowIndex2) => {
  cy.get('tr').eq(rowIndex1).find('td').eq(rowIndex2).invoke('text').as('acountDetails');
})