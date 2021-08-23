describe("Authenticator:", function () {
  before(() => {
    Cypress.config("includeShadowDom", true);
  });

  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit("/login");
  });

  describe("Sign In:", function () {
    it("allows a user to signin and edit profile", function () {
      // Step 2: Take an action (Sign in)
      cy.get(selectors.usernameInput).type("jorgevrgs");
      cy.get(selectors.signInPasswordInput).type("abcd1234...");
      cy.get(selectors.signInSignInButton).contains("Sign In").click();

      // Step 3: Make an assertion (Check for sign-out text)
      cy.get(selectors.signOutButton).contains("Sign Out");

      // Step 4: See profile
      cy.get(selectors.pageTitle).contains("Profile");
      cy.get(selectors.signOutButton).click();

      // Step 5: Edit profile
      cy.get(selectors.pageTitle).contains("Edit Profile");
    });
  });
});

const selectors = {
  // Auth component classes
  usernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]',

  pageTitle: '[data-test="page-title"]',
  // Links
  editProfileLink: '[data-test="profile-page-edit-link"]',
  loginLink: '[data-test="nav-bar-login-link"]',
};

module.exports = selectors;
