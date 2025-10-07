

const selectors = {
   email: "#edit-name",
  password: "#edit-pass",
  submit: "#edit-submit",
testing_locations: '/html[1]/body[1]/app-root[1]/div[1]/app-account-central[1]/section[1]/mat-tab-group[1]/mat-tab-header[1]/div[1]/div[1]/div[1]/div[4]',
search_testing_lpcations: '#mat-input-1',
add_testing_location_btn:'#accountCentralAddLocationBtn',
cancle_btn: '#locationsModalClose > .mat-mdc-button-touch-target',
type_testing_location: '/html[1]/body[1]/div[3]/div[2]/div[1]/mat-dialog-container[1]/div[1]/div[1]/app-locations-dialog[1]/form[1]/mat-dialog-content[1]/div[1]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
federal_CLIA : '/html[1]/body[1]/div[4]/div[2]/div[1]/mat-dialog-container[1]/div[1]/div[1]/app-locations-dialog[1]/form[1]/mat-dialog-content[1]/div[2]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
testing_location_save: '#locationSaveBtn > .mat-mdc-button-touch-target',
}


/// helper function to fill address details form
function login(username, password) {
  cy.get(selectors.email).clear().type(username);
  cy.get(selectors.password).clear().type(password);
  cy.get(selectors.submit).click();

  // Wait for redirect away from login page
  cy.url({ timeout: 15000 }).should('not.include', '/user/login');
}

// Navigate to Account Central tab
function goToTestingLocations() {
  cy.xpath(selectors.testing_locations, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
   cy.url().should('include', '/account-central');

}
describe('CarePoint Login and testing', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.visit('https://pro-qcp-dev.carepointsolutions.com/', { failOnStatusCode: false });
    cy.get('[data-drupal-link-system-path="user/login"]', { timeout: 15000 }).click();
  });
   it('clear all the fields in edit account details form', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');  
  goToTestingLocations();
   // Click Edit Address Details
  cy.xpath(selectors.testing_locations, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
   });
//// search testing locations with invalid testing location
it('search testing locations with invalid testing location name Federal CLIA', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');  
  goToTestingLocations();

  // Click Testing Locations tab
  cy.xpath(selectors.testing_locations, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  // Type 'New York' and assert
  cy.get(selectors.search_testing_lpcations, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true })
    .type('New York', { force: true });

  cy.contains('No data matching the filter "New York"', { timeout: 30000 })
    .should('be.visible');

  // Clear input and type '15D2222222'
  cy.get(selectors.search_testing_lpcations, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true })
    .clear({ force: true })
    .type('15D2222222', { force: true });

  cy.contains('No data matching the filter "15D2222222"', { timeout: 30000 })
    .should('be.visible');
});
    it('search testing locations with valid testing location name Federal CLIA', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
    goToTestingLocations();
    // Click Testing Locations tab
    cy.xpath(selectors.testing_locations, { timeout: 20000 })
        .should('be.visible')
        .click({ force: true });
    // Type 'Federal CLIA' and assert
    cy.get(selectors.search_testing_lpcations, { timeout: 20000 })
        .should('be.visible')
        .click({ force: true })
        .type('Location6', { force: true });
    cy.contains('Location6', { timeout: 30000 })
        .should('be.visible',{ timeout: 30000});
    cy.get(selectors.search_testing_lpcations, { timeout: 20000 })
  .should('be.visible')
  .click({ force: true })
  .clear({ force: true })
  .type('66D6666666', { force: true });
    cy.contains('66D6666666', { timeout: 30000 })    
        .should('be.visible',{ timeout: 30000})
});
    it('Click on Add Testing Location button and cancle button functionality', () => {
    login('stha.luna0811@gmail.com', 'Anchor@17');
    goToTestingLocations();
    // Click Testing Locations tab
    cy.xpath(selectors.testing_locations, { timeout: 20000 })
        .should('be.visible')
        .click({ force: true });
    // Click on Add Testing Location button
    cy.get(selectors.add_testing_location_btn, { timeout: 20000 })
        .should('be.visible')
        .click({ force: true });
    cy.contains('Testing Location is required', { timeout: 30000 })
        .should('be.visible',{ timeout: 30000});
    // Click on cancle button
    cy.get(selectors.cancle_btn, { timeout: 20000 })
        .click({ force: true });
});
it('Click on Add testing location with random values', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToTestingLocations();

  // Click Testing Locations tab
  cy.xpath(selectors.testing_locations, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  // Click Add Testing Location button
  cy.get(selectors.add_testing_location_btn, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  // Wait for modal
  cy.get('mat-dialog-container', { timeout: 20000 }).should('be.visible');

  // Generate random Testing Location name
  const randomLocation = `Testing_${Math.floor(Math.random() * 1000)}`;

  // Generate random Federal CLIA in pattern 12D3456789
  const randomCLIA = `12D${Math.floor(Math.random() * 9000000 + 1000000)}`;

  // Type into first input (testing location name)
  cy.get('mat-dialog-container input')
    .first()
    .click({ force: true })
    .type(randomLocation, { force: true });

  // Type into second input (Federal CLIA)
  cy.xpath(selectors.federal_CLIA)
    .click({ force: true })
    .type(randomCLIA, { force: true });

  // // Click Save
  // cy.get(selectors.testing_location_save)
  //   .should('be.visible')
  //   .click({ force: true });

  // // Optionally, assert that the new location appears in the table
  // cy.contains(randomLocation).should('be.visible');
});



 });  



