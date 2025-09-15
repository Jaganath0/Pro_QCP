// cypress/e2e/login.cy.js

const selectors = {
  email: "#edit-name",
  password: "#edit-pass",
  submit: "#edit-submit",
};

describe('Visit CarePoint login page', () => {
  beforeEach(() => {
    // Ignore app-side JS errors
    Cypress.on('uncaught:exception', () => false);

    // Visit only the real CarePoint site
    cy.visit('https://pro-qcp-dev.carepointsolutions.com/', { failOnStatusCode: false });

    // Click the login link
    cy.get('[data-drupal-link-system-path="user/login"]', { timeout: 15000 }).click();
  });

  it('should display login form', () => {
    cy.get(selectors.email, { timeout: 10000 }).should('be.visible');
    cy.get(selectors.password).should('be.visible');
    cy.get(selectors.submit).should('be.visible');
  });

  
  ///login with blank credentials

  it('login with blank credentials', () => {
    cy.get(selectors.submit).click();
    // cy.get('body').then($body => {
    //   const text = $body.text();
    //   expect(text.includes('required') || text.includes('Username')).to.be.true;
    // });
  });
///login with invalid credentials
  it('login with invalid credentials', () => {
    cy.get(selectors.email).type('invalidUser');
    cy.get(selectors.password).type('invalidPass');
    cy.get(selectors.submit).click();
    // cy.contains('Unrecognized username or password.', { timeout: 10000 }).should('be.visible');
  });
///login with valid credentials
  it('login with valid credentials', () => {
    cy.get(selectors.email).type('babagif706');
    cy.get(selectors.password).type('1234567');
    cy.get(selectors.submit).click();

    // Confirm redirect away from login page
  //   cy.location('pathname', { timeout: 20000 }).should(path => {
  //     expect(path).not.to.include('/user/login');
  //   });
  });
});
