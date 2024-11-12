
describe("login", () => {
  it("login and logout with credentials", () => {
    cy.loginWithCredential();
    cy.logout();
  });
});
