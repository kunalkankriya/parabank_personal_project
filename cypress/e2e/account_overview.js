const accountVerification = (ele1, ele2, ele3, ele4) => {
  cy.getText(ele1, ele2).as("accountDetails"); // Alias the expected account ID 
  cy.get("@accountDetails").then((expectedAccountId) => {
    cy.get('[href^="activity"]').click();
    cy.contains("CHECKING").should("be.visible");
    cy.getText(ele3, ele4).as("actualAccountDetails"); // Alias the actual account ID
    cy.get("@actualAccountDetails").then((actualAccountId) => {
      expect(expectedAccountId).to.equal(actualAccountId); // Compare the expected and actual IDs
    });
  });
};

describe("Account Overview", () => {
  before("navigate to account", () => {
    cy.loginWithCredential();
    cy.ensureTextPresent("Total");
  });

  it("user account validation", () => {
    accountVerification(1, 0, 0, 1);
    cy.go("back");
    cy.ensureTextPresent("Total");
    accountVerification(1, 1, 2, 1);
    cy.go("back");
    cy.ensureTextPresent("Total");
    accountVerification(1, 2, 3, 1);
  });
});
