const selectors = {
  email: "#edit-name",
  password: "#edit-pass",
  submit: "#edit-submit",
  account_central_tab: "#mat-tab-label-0-1 > .mdc-tab__content > .mdc-tab__text-label",
  edit_account_details: "#editAccountDetail",
  facility_name: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  department_name: "/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[2]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]",
  federal: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[3]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  contact_name: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[4]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  tittle: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[5]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  primary_phone: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[2]/mat-card-content[1]/div[1]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  extension: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[2]/mat-card-content[1]/div[2]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  cell_phone: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[2]/mat-card-content[1]/div[3]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  fax: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[2]/mat-card-content[1]/div[4]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  facility_phone: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[2]/mat-card-content[1]/div[5]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  next_btn: '.next-btn > .mdc-button__label',
  previous_btn: '.mat-warn > .mdc-button__label',
  address_line: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  next_btn1: '.mat-primary > .mdc-button__label',
  city: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[3]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  country_drop: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[4]/mat-form-field[1]/div[1]/div[2]/div[1]/mat-select[1]/div[1]/div[1]',
  state_drop: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[5]/mat-form-field[1]/div[1]/div[2]/div[1]/mat-select[1]/div[1]/div[1]',
  postal_code: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/mat-card[1]/mat-card-content[1]/div[6]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
  country_select: '/html[1]/body[1]/div[3]/div[2]/div[1]/div[1]/mat-option[247]',
  select_state: '/html[1]/body[1]/div[3]/div[2]/div[1]/div[1]/mat-option[2]',
  next_btn2: '.mat-primary > .mdc-button__label',
  same_checkbox: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/div[1]/mat-checkbox[1]/div[1]/div[1]/input[1]',
  terms_checkbox: '/html[1]/body[1]/app-root[1]/div[1]/app-account-edit[1]/form[1]/mat-card[1]/mat-card-content[1]/div[1]/div[2]/mat-checkbox[1]/div[1]/div[1]/input[1]',


};

// ---------------- Helper Functions ----------------

// Reusable login function
function login(username, password) {
  cy.get(selectors.email).clear().type(username);
  cy.get(selectors.password).clear().type(password);
  cy.get(selectors.submit).click();

  // Wait for redirect away from login page
  cy.url({ timeout: 15000 }).should('not.include', '/user/login');
}

// Navigate to Account Central tab
function goToAccountCentral() {
  cy.get(selectors.account_central_tab, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  cy.url({ timeout: 10000 }).should('include', '#/account-central');
}

describe('CarePoint Login and Account Central', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.visit('https://pro-qcp-dev.carepointsolutions.com/', { failOnStatusCode: false });
    cy.get('[data-drupal-link-system-path="user/login"]', { timeout: 15000 }).click();
  });

  
  afterEach(() => {
    // Wait 3 seconds after each test
    cy.wait(3000);
  });

  it('Login and go to Account Central', () => {
    login('stha.luna0811@gmail.com', 'Anchor@17'); // reusable login function
    goToAccountCentral();           // reusable navigation function

    // Click Edit Account Details
    cy.get(selectors.edit_account_details, { timeout: 20000 })
      .should('be.visible')
      .click({ force: true });
  });
  it('clear all the fields in edit account details form', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');  
  goToAccountCentral();

  // Click Edit Account Details
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  // Clear each input safely
  const fieldsToClear = [

    selectors.facility_name,
    selectors.department_name,
    selectors.federal,
    selectors.contact_name,
    selectors.tittle,
    selectors.primary_phone,
    selectors.extension,
    selectors.cell_phone,
    selectors.fax,
    selectors.facility_phone,
    
  ];

  fieldsToClear.forEach(selector => {
    cy.xpath(selector, { timeout: 10000 })
      .clear({ force: true }); // force clear for Material inputs
  });

});
/// click next button without entering facility name
it('Click Next button without entering Facility Name and verify validation message', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');  
  goToAccountCentral();

  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  cy.xpath(selectors.facility_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .blur(); // mark field as touched

  cy.get(selectors.next_btn).click({ force: true });

  // Check validation globally in form
  cy.get('form', { timeout: 10000 })
    .contains('Facility Name is required')
    .should('be.visible');
});
// / click next button without entering department name
it('Click Next button without entering Department Name and verify validation message', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');  
  goToAccountCentral();

  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  // Clear Department Name field and trigger blur
  cy.xpath(selectors.department_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .blur(); // mark field as touched

  // Click Next button
  cy.get(selectors.next_btn).click({ force: true });

  // Assert validation message globally inside the form
  cy.get('form', { timeout: 10000 })
    .contains('Department is required')
    .should('be.visible');
});


/// click next button without contact name
it('Click Next button without entering Contact Name and verify validation message', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });  
  // Clear Contact Name field and trigger blur
  cy.xpath(selectors.contact_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .blur();
  // Click Next button
  cy.get(selectors.next_btn).click({ force: true });
  // Assert validation message globally inside the form
  cy.get('form', { timeout: 10000 })
    .contains('Contact Name is required')
    .should('be.visible');
});
/// click next button without tittle
it('Click Next button without entering Tittle and verify validation message', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
  // Clear Tittle field and trigger blur
  cy.xpath(selectors.tittle, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .blur();
  // Click Next button
  cy.get(selectors.next_btn).click({ force: true });
  // Assert validation message globally inside the form
  cy.get('form', { timeout: 10000 })
    .contains('Title is required')
    .should('be.visible');
});
/// click next button without primary phone
it('Click Next button without entering Primary Phone and verify validation message', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
  // Clear Primary Phone field and trigger blur
  cy.xpath(selectors.primary_phone, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .blur();
  // Click Next button
  cy.get(selectors.next_btn).click({ force: true });
  // Assert validation message globally inside the form
//   cy.get('form', { timeout: 10000 })
//     .contains('Primary Phone number is required')
//     .should('be.visible');
});
/// click next button with valid details
it('Click Next button with valid details and verify navigation to next step', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
  // Fill in valid details 
  cy.xpath(selectors.facility_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })   
    .type('Valid Facility Name', { force: true });

  cy.xpath(selectors.department_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })   
    .type('Valid Department', { force: true }); 
  cy.xpath(selectors.contact_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true }) 
    .type('Valid Contact Name', { force: true });
  cy.xpath(selectors.tittle, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true }) 
    .type('Valid Title', { force: true });
  cy.xpath(selectors.primary_phone, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true }) 
    .type('123-456-7890', { force: true });
  // Click Next button
  cy.get(selectors.next_btn).click({ force: true } , { timeout: 10000 }); 
  /// verify  funcality of previous button
  cy.get(selectors.previous_btn).click({ force: true}, { timeout: 10000 });
  cy.get(selectors.next_btn).click({ force: true } , { timeout: 10000 }); 
});
//// click on next button in address details without entering address line
it('Click Next button in Address Details without entering Address Line and verify validation message', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
  // Fill in valid details to reach Address Details step
  cy.xpath(selectors.facility_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })   
    .type('Valid Facility Name', { force: true });
  cy.xpath(selectors.department_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Department', { force: true });
  cy.xpath(selectors.contact_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Contact Name', { force: true });
  cy.xpath(selectors.tittle, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Title', { force: true });
  cy.xpath(selectors.primary_phone, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('123-456-7890', { force: true });
  // Click Next to reach Address Details step
  cy.get(selectors.next_btn).click({ force: true }, { timeout: 10000 });
  // Clear Address Line field and trigger blur
  cy.xpath(selectors.address_line, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .blur(); 
  // Click Next button
  cy.get(selectors.next_btn1).click({ force: true }); 
  // Assert validation message globally inside the form
  cy.get('form', { timeout: 10000 })
    .contains('Address Line 1 is required')
    .should('be.visible');});
//// click on next button in address with out city
it('Click Next button in Address Details without entering City and verify validation message', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
  // Fill in valid details to reach Address Details step
  cy.xpath(selectors.facility_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Facility Name', { force: true });
  cy.xpath(selectors.department_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Department', { force: true });
  cy.xpath(selectors.contact_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Contact Name', { force: true });
  cy.xpath(selectors.tittle, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Title', { force: true });
  cy.xpath(selectors.primary_phone, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('123-456-7890', { force: true }); 
  // Click Next to reach Address Details step
  cy.get(selectors.next_btn).click({ force: true }, { timeout: 10000 });
  // Fill in Address Line to proceed
  cy.xpath(selectors.address_line, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('123 Main St', { force: true });
  // Clear City field and trigger blur
  cy.xpath(selectors.city, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .blur();
  // Click Next button
  cy.get(selectors.next_btn1).click({ force: true });
  // Assert validation message globally inside the form
  cy.get('form', { timeout: 10000 })
    .contains('City is required')
    .should('be.visible');
});
/// check country dropdown
it('Check Country dropdown and state dropdown functionality in Address Details', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
  // Fill in valid details to reach Address Details step    
  cy.xpath(selectors.facility_name, { timeout: 10000 })
    .should('be.visible')     
    .clear({ force: true })
    .type('Valid Facility Name', { force: true });
  cy.xpath(selectors.department_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Department', { force: true });
  cy.xpath(selectors.contact_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Contact Name', { force: true });
  cy.xpath(selectors.tittle, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Title', { force: true });
  cy.xpath(selectors.primary_phone, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('123-456-7890', { force: true });
  // Click Next to reach Address Details step
  cy.get(selectors.next_btn).click({ force: true }, { timeout: 10000 });
  // Fill in Address Line to proceed
  cy.xpath(selectors.address_line, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('123 Main St', { force: true });
  // Fill in City to proceed
  cy.xpath(selectors.city, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Sample City', { force: true });
  // Interact with Country dropdown and state dropdown
  cy.xpath(selectors.country_drop, { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
    cy.xpath(selectors.state_drop, { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
});
/// click next button without postal code
it('click next button without entering postal code and verify validation message', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
  // Fill in valid details to reach Address Details step
  cy.xpath(selectors.facility_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Facility Name', { force: true });
  cy.xpath(selectors.department_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Department', { force: true });
  cy.xpath(selectors.contact_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Contact Name', { force: true });
  cy.xpath(selectors.tittle, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Title', { force: true });
  cy.xpath(selectors.primary_phone, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('123-456-7890', { force: true });
  // Click Next to reach Address Details step
  cy.get(selectors.next_btn).click({ force: true }, { timeout: 10000 });
  // Fill in Address Line to proceed
  cy.xpath(selectors.address_line, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('123 Main St', { force: true });
  // Fill in City to proceed
  cy.xpath(selectors.city, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Sample City', { force: true });
  // Interact with Country dropdown and state dropdown
  // cy.xpath(selectors.country_drop, { timeout: 10000 })
  //   .should('be.visible')
  //   .click({ force: true });
  // cy.xpath(selectors.country_select, { timeout: 10000 })
  //   .should('be.visible')
  //   .click({ force: true });  
  // cy.xpath(selectors.state_drop, { timeout: 10000 })
  //   .should('be.visible')
  //   .click({ force: true });  
  // cy.xpath(selectors.select_state, { timeout: 10000 })
    // .should('be.visible')
    // .click({ force: true });  
  // Clear Postal Code field and trigger blur
  cy.xpath(selectors.postal_code, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .blur();
  // Click Next button
  cy.get(selectors.next_btn1).click({ force: true });
  // Assert validation message globally inside the form
  cy.get('form', { timeout: 10000 })
    .contains('Zip/Postal Code is required')
    .should('be.visible');
});
/// click next button with valid details
it('Click Next button with valid details and verify navigation to next step', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
  // Fill in valid details 
  cy.xpath(selectors.facility_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })   
    .type('Valid Facility Name', { force: true });
  cy.xpath(selectors.department_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })   
    .type('Valid Department', { force: true }); 
  cy.xpath(selectors.contact_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true }) 
    .type('Valid Contact Name', { force: true });
  cy.xpath(selectors.tittle, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true }) 
    .type('Valid Title', { force: true });
  cy.xpath(selectors.primary_phone, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true }) 
    .type('123-456-7890', { force: true });
  // Click Next button
  cy.get(selectors.next_btn).click({ force: true } , { timeout: 10000 });
  // Fill in Address Line to proceed
  cy.xpath(selectors.address_line, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('123 Main St', { force: true });
  // Fill in City to proceed
  cy.xpath(selectors.city, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Sample City', { force: true });
  // Interact with Country dropdown and state dropdown
  // cy.xpath(selectors.country_drop, { timeout: 10000 })
  //   .should('be.visible')
  //   .click({ force: true });
  //   cy.xpath(selectors.country_select, { timeout: 10000 })
  //   .should('be.visible')
  //   .click({ force: true });  
  // cy.xpath(selectors.state_drop, { timeout: 10000 })
  //   .should('be.visible')
  //   .click({ force: true });
  //   cy.xpath(selectors.select_state, { timeout: 10000 })
  //   .should('be.visible')
  //   .click({ force: true });  
  // Fill in Postal Code to proceed 
  cy.xpath(selectors.postal_code, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('12345', { force: true });      
  // Click Next button to proceed
  cy.get(selectors.next_btn1).click({ force: true } , { timeout: 10000 });  
  cy.wait(1000);
  // Click Next button to proceed
  cy.get(selectors.next_btn2).click({ force: true } , { timeout: 10000 });
});
/// check the checkbox functionality
it('Check the checkbox functionality in Additional Details step of same as above and terms', () => {
  login('stha.luna0811@gmail.com', 'Anchor@17');
  goToAccountCentral();
  cy.get(selectors.edit_account_details, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });
  // Fill in valid details to reach Additional Details step
  cy.xpath(selectors.facility_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Valid Facility Name', { force: true });
  cy.xpath(selectors.department_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })   
    .type('Valid Department', { force: true });
  cy.xpath(selectors.contact_name, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })   
    .type('Valid Contact Name', { force: true });
  cy.xpath(selectors.tittle, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })   
    .type('Valid Title', { force: true });
  cy.xpath(selectors.primary_phone, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })   
    .type('123-456-7890', { force: true });
  // Click Next to reach Address Details step
  cy.get(selectors.next_btn).click({ force: true }, { timeout: 10000 });  
  // Fill in Address Line to proceed
  cy.xpath(selectors.address_line, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('123 Main St', { force: true });
  // Fill in City to proceed
  cy.xpath(selectors.city, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('Sample City', { force: true });
 
  cy.xpath(selectors.postal_code, { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .type('12345', { force: true });
  // Click Next button to reach Additional Details step
  cy.get(selectors.next_btn1).click({ force: true }, { timeout: 10000 }); 
  cy.wait(1000); 
  cy.get(selectors.next_btn2).click({ force: true }, { timeout: 10000 });
  // Interact with "Same as Above" checkbox
  cy.xpath(selectors.same_checkbox, { timeout: 10000 })
    .should('be.visible')
    .check({ force: true }) // Use check() for checkboxes
    .should('be.unchecked'); // Verify it's checked

});
});

 





