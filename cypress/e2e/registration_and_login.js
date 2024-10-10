// Function to generate random data
function getRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${randomString}@example.com`;
}

function getRandomName() {
  const names = [
    "john",
    "alex",
    "alisa",
    "sam",
    "christy",
    "jenifer",
    "rostan",
    "harry",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomPassword() {
  return Math.random().toString(36).substring(2, 10);
}

const enterKeyInSpecificField = (header, selector, text) => {
  cy.get("#customerForm")
    .contains(header)
    .closest("tr")
    .find(selector)
    .type(text);
};

// Declare enties as an empty array
let enties = [];

describe("user registration", () => {
  before(() => {
    const firstName = getRandomName();
    const lastName = getRandomName();
    const userName = getRandomEmail();
    const password = getRandomPassword();

    // Set Cypress environment variables
    Cypress.env("firstName", firstName);
    Cypress.env("lastName", lastName);
    Cypress.env("userName", userName);
    Cypress.env("password", password);

    // Now initialize the enties array with the correct values
    enties = [
      {
        header: "First Name:",
        selector: "#customer\\.firstName",
        text: Cypress.env("firstName"),
      },
      {
        header: "Last Name:",
        selector: "#customer\\.lastName",
        text: Cypress.env("lastName"),
      },
      {
        header: "Address:",
        selector: "#customer\\.address\\.street",
        text: "123 Main St",
      },
      {
        header: "City:",
        selector: "#customer\\.address\\.city",
        text: "New York",
      },
      { header: "State:", selector: "#customer\\.address\\.state", text: "NY" },
      {
        header: "Zip Code:",
        selector: "#customer\\.address\\.zipCode",
        text: "10001",
      },
      {
        header: "Phone #:",
        selector: "#customer\\.phoneNumber",
        text: "123-456-7890",
      },
      { header: "SSN:", selector: "#customer\\.ssn", text: "123-45-6789" },
      {
        header: "Username:",
        selector: "#customer\\.username",
        text: Cypress.env("userName"),
      },
      {
        header: "Password:",
        selector: "#customer\\.password",
        text: Cypress.env("password"),
      },
      {
        header: "Confirm:",
        selector: "#repeatedPassword",
        text: Cypress.env("password"),
      },
    ];
  });

  it("user can register successfully", () => {
    cy.visit("/");
    cy.ensureTextPresent("Customer Login");
    cy.get('[href="register.htm"]').should("be.visible").click();
    cy.contains("Signing up is easy!").should("be.visible");
    // Use the entries array to fill out the form
    enties.forEach((entry) => {
      enterKeyInSpecificField(entry.header, entry.selector, entry.text);
    });
    cy.get('[value="Register"]').click();
    cy.contains(`Welcome ${Cypress.env("userName")}`).should("exist");
    cy.contains(`Your account was created successfully`).should("exist");
  });

  it("login with credentials", () => {
    cy.visit("/");
    cy.get('[name="username"]').type(Cypress.env("userName"));
    cy.get('[name="password"]').type(Cypress.env("password"));
    cy.get('[value="Log In"]').click();
    cy.contains("Accounts Overview").should("exist");
  });
});
