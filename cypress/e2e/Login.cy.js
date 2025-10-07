const selectors = {
  email: "#edit-name",
  password: "#edit-pass",
  submit: "#edit-submit",
  logout_btn1: ".menu-options > #logOutBtn > span",
  logout_btn2: '[name="op"]',
  cancle_btn: "#edit-cancel",
  purchase_module: '.menu-options > [mattooltip="Purchase Modules"] > span',
};

describe('Visit CarePoint login page', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.visit('https://pro-qcp-dev.carepointsolutions.com/', { failOnStatusCode: false });
    cy.get('[data-drupal-link-system-path="user/login"]', { timeout: 15000 }).click();
  });

  afterEach(() => {
    // Wait 3 seconds after each test
    cy.wait(3000);
  });

  it('should display login form', () => {
    cy.get(selectors.email, { timeout: 10000 }).should('be.visible');
    cy.get(selectors.password).should('be.visible');
    cy.get(selectors.submit).should('be.visible');
  });

  it('login with blank credentials', () => {
    cy.get(selectors.submit).click();
    cy.get('body').then($body => {
      cy.get(selectors.email).then(($el) => {
        expect($el[0].validationMessage).to.eq('Please fill out this field.');
      });
    });
  });

  it('login with blank email', () => {
    cy.get(selectors.password).type('somepassword');
    cy.get(selectors.submit).click();
    cy.get('body').then($body => {
      cy.get(selectors.email).then(($el) => {
        expect($el[0].validationMessage).to.eq('Please fill out this field.');
      });
    });
  });

  it('login with blank password', () => {
    cy.get(selectors.email).type('someemail');
    cy.get(selectors.submit).click();
    cy.get('body').then($body => {
      cy.get(selectors.password).then(($el) => {
        expect($el[0].validationMessage).to.eq('Please fill out this field.');
      });
    });
  });

  it('login with invalid credentials', () => {
    cy.get(selectors.email).type('invalidUser');
    cy.get(selectors.password).type('invalidPass');
    cy.get(selectors.submit).click();
    // cy.contains('Unrecognized username or password.', { timeout: 10000 }).should('be.visible');
  });

  it('login with valid credentials and purchase modules button functionality', () => {
    cy.get(selectors.email).type('stha.luna0811@gmail.com');
    cy.get(selectors.password).type('Anchor@17');
    cy.get(selectors.submit).click();
    cy.get(selectors.purchase_module).click({ timeout: 1500 });
  });

  it('logout button functionality', () => {
    cy.get(selectors.email).type('stha.luna0811@gmail.com');
    cy.get(selectors.password).type('Anchor@17');
    cy.get(selectors.submit).click();
    cy.get(selectors.logout_btn1, { timeout: 2000 }).click();
    cy.get(selectors.logout_btn2, { timeout: 2000 }).click();
  });
});
