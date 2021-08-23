const faker = require("faker");

const env = {
  // Login
  username: "jorgevrgs",
  password: "abcd1234...",

  // User
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  twitterUsername: "jorgevrgs1",
  imageUrl: faker.internet.avatar(),
  workExperience: faker.lorem.paragraphs(),
};

describe("Authenticator:", function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit("/login");

    // Step 2: Take an action (Sign in)
    cy.get(selectors.auth.inputs.username).type(env.username);
    cy.get(selectors.auth.inputs.password).type(env.password);
    cy.get(selectors.auth.buttons.signIn).contains("Sign In").click();
  });

  describe("Sign In:", function () {
    it.skip("allows a user to signin and logout", function () {
      cy.get(selectors.auth.buttons.signOut).contains("Sign Out").click();
      cy.url().should("include", "/login");
    });

    it.skip("allows a user to signin and redirect to profile", function () {
      cy.url().should("include", "/profile");
      cy.get(selectors.profile.title).contains("Profile");
    });

    it.skip("allows a user to signin, redirect to profile and open edit profile", function () {
      cy.get(selectors.auth.buttons.signOut).contains("Sign Out");
      cy.get(selectors.anchors.editProfile).contains("Edit Profile").click();
      cy.url().should("include", "/profile/edit");
      cy.get(selectors.editProfile.title).contains("Edit Profile");
    });

    it.skip("allows a user to signin, open edit profile and cancel", function () {
      cy.get(selectors.anchors.editProfile).contains("Edit Profile").click();
      cy.get(selectors.editProfile.form.buttons.cancel)
        .should("have.value", "Cancel")
        .click();
      cy.url().should("include", "/profile");
    });

    it("allows a user to signin and update profile", function () {
      // cy.wait(5000);
      cy.get(selectors.anchors.editProfile).contains("Edit Profile").click();
      cy.get("#profile").should("be.visible");

      cy.get(selectors.editProfile.form.inputs.firstName)
        .clear()
        .type(env.firstName);
      cy.get(selectors.editProfile.form.inputs.lastName)
        .clear()
        .type(env.lastName);
      cy.get(selectors.editProfile.form.inputs.twitterUsername)
        .clear()
        .type(env.twitterUsername);
      cy.get(selectors.editProfile.form.inputs.imageUrl)
        .clear()
        .type(env.imageUrl);
      cy.get(selectors.editProfile.form.inputs.workExperience)
        .clear()
        .type(env.workExperience);
      cy.get(selectors.editProfile.form.buttons.submit)
        .contains("Update")
        .click();
      cy.url().should("include", "/profile");

      cy.get(selectors.profile.firstName).contains(env.firstName);
      cy.get(selectors.profile.lastName).contains(env.lastName);
      cy.get(selectors.profile.workExperience).should("be.visible");
      cy.get(selectors.profile.imageUrl)
        .find("img")
        .should("be.visible")
        .should("have.attr", "src", env.imageUrl);
      cy.get(selectors.profile.twitterTimeline)
        .find("#timeline")
        .should("be.visible")
        .find(".item")
        .its("length")
        .should("be.eq", 5);
    });
  });
});

const selectors = {
  anchors: {
    login: '[data-test="nav-bar-login-link"]',
    editProfile: '[data-test="profile-page-edit-link"]',
  },

  auth: {
    inputs: {
      username: '[data-test="sign-in-username-input"]',
      password: '[data-test="sign-in-password-input"]',
    },
    buttons: {
      signIn: '[data-test="sign-in-sign-in-button"]',
      signOut: '[data-test="sign-out-button"]',
    },
  },

  profile: {
    title: '[data-test="page-title"]',

    firstName: '[data-test="profile-firstName"]',
    lastName: '[data-test="profile-lastName"]',
    twitterUsername: '[data-test="profile-twitterUsername"]',
    imageUrl: '[data-test="profile-imageUrl"]',
    workExperience: '[data-test="profile-workExperience"]',
    twitterTimeline: '[data-test="profile-twitterTimeline"]',
  },

  editProfile: {
    title: '[data-test="page-title"]',
    form: {
      inputs: {
        firstName: '[data-test="edit-profile-input-firstName"]',
        lastName: '[data-test="edit-profile-input-lastName"]',
        twitterUsername: '[data-test="edit-profile-input-twitterUsername"]',
        imageUrl: '[data-test="edit-profile-input-imageUrl"]',
        workExperience: '[data-test="edit-profile-input-workExperience"]',
      },
      buttons: {
        cancel: '[data-test="edit-profile-button-cancel"]',
        submit: '[data-test="edit-profile-button-submit"]',
      },
    },
  },
};

module.exports = selectors;
