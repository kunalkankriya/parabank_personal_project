const amount = Math.floor(Math.random() * 1000); // Random number between 1 and 100
const currentMonth = new Date().toLocaleString("default", { month: "long" }); // e.g., "October" for the current month

describe("account transation", () => {
  beforeEach(() => {
    cy.loginWithCredential();
    cy.ensureTextPresent("Total");
  });
  it("user do transaction activity", () => {
    cy.ensureTextPresent("Transfer Funds").click();
    cy.ensureTextPresent("From account #");
    cy.wait(1000);
    cy.enterText('#amount', amount);
    cy.clickOptionWithElement('[type="submit"]');
    cy.ensureTextPresent("Transfer Complete!");
    cy.ensureTextPresent("has been transferre");
    cy.ensureTextPresent("Accounts Overview").click();
    cy.ensureTextPresent("Total");
    cy.clickOptionWithElement('[href^="activity"]');
    cy.ensureTextPresent("CHECKING");
    cy.get("tr").last().contains(amount).should("be.visible");
  });

  it("user verify privious transaction details", () => {
    cy.clickOptionWithElement('[href^="activity"]');
    cy.ensureTextPresent("CHECKING");
    cy.get("#month").select(currentMonth);
    cy.get("#transactionType").select("Debit");
    cy.clickOptionWithElement('[type="submit"]');
    cy.ensureTextNotPresent("Funds Transfer Received");
    cy.get("tr").last().contains(amount).should("be.visible");
  });
});
