const selectors = {
  email: "#edit-name",
  password: "#edit-pass",
  submit: "#edit-submit",
  addresss_details_btn: '/html[1]/body[1]/app-root[1]/div[1]/app-account-central[1]/section[1]/mat-tab-group[1]/mat-tab-header[1]/div[1]/div[1]/div[1]/div[3]/span[2]',
  
};

/// helper function to fill address details form
function login(username, password) {
  cy.get(selectors.email).clear().type(username);
  cy.get(selectors.password).clear().type(password);
  cy.get(selectors.submit).click();

  // Wait for redirect away from login page
  cy.url({ timeout: 15000 }).should('not.include', '/user/login');
}

// Navigate to Account Central tab
function goToAddressDetails() {
  cy.xpath(selectors.addresss_details_btn, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
   cy.url().should('include', '/account-central');

}
describe('CarePoint Login and Address Central', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.visit('https://pro-qcp-dev.carepointsolutions.com/', { failOnStatusCode: false });
    cy.get('[data-drupal-link-system-path="user/login"]', { timeout: 15000 }).click();
  });
   it('clear all the fields in edit account details form', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');  
  goToAddressDetails();
   // Click Edit Address Details
  cy.xpath(selectors.addresss_details_btn, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
   });

   it
});
