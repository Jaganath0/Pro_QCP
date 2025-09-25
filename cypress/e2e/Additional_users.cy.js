const selectors = {
  email: "#edit-name",
  password: "#edit-pass",
  submit: "#edit-submit",
  additional_users_tab: '/html[1]/body[1]/app-root[1]/div[1]/app-account-central[1]/section[1]/mat-tab-group[1]/mat-tab-header[1]/div[1]/div[1]/div[1]/div[5]/span[2]',
  add_additional_users: '#addAdditionalUserBtn > .mdc-button__label',
  cancle_btn: "//button[@id='usersModalClose']//span[@class='mat-mdc-button-touch-target']",
  drop_btn: "/html[1]/body[1]/div[4]/div[2]/div[1]/mat-dialog-container[1]/div[1]/div[1]/app-users-dialog[1]/form[1]/mat-dialog-content[1]/div[3]/mat-form-field[1]/div[1]/div[2]/div[1]/mat-select[1]/div[1]/div[2]/div[1]/*[name()='svg'][1]",
//   tittle: '/html[1]/body[1]/div[4]/div[2]/div[1]/mat-dialog-container[1]/div[1]/div[1]/app-users-dialog[1]/form[1]/mat-dialog-content[1]/div[2]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
// //   name_field: '/html[1]/body[1]/div[4]/div[2]/div[1]/mat-dialog-container[1]/div[1]/div[1]/app-users-dialog[1]/form[1]/mat-dialog-content[1]/div[1]/mat-form-field[1]/div[1]/div[2]/div[1]/input[1]',
};

// Helper function to login
function login(username, password) {
  cy.get(selectors.email).clear().type(username);
  cy.get(selectors.password).clear().type(password);
  cy.get(selectors.submit).click();

  cy.url({ timeout: 15000 }).should('not.include', '/user/login');
}

// Navigate to Account Central tab
function goToAdditionalUsers() {
  cy.xpath(selectors.additional_users_tab, { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  cy.url({ timeout: 10000 }).should('include', '#/account-central');
}

// Helper function to generate random name
function getRandomName(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let name = '';
  for (let i = 0; i < length; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
}

// Helper function to generate a random title
function getRandomTitle() {
  const titles = ["Manager", "Engineer", "Analyst", "Consultant", "Lead"];
  const randomIndex = Math.floor(Math.random() * titles.length);
  const randomNumber = Math.floor(Math.random() * 1000); // Adds a number suffix
  return `${titles[randomIndex]}_${randomNumber}`;
}

// Helper: select a random option from available mat-options
function selectRandomOption() {
  cy.get('mat-option', { timeout: 10000 }).then($options => {
    // Limit to first 3 options only
    const firstThree = $options.slice(0, 3);
    const randomIndex = Math.floor(Math.random() * firstThree.length);
    cy.wrap(firstThree[randomIndex]).click({ force: true });
  });
}
// helper functions for random data
function getRandomString(length = 10) {
  return Math.random().toString(36).substring(2, 2 + length);
}
function getRandomEmail() {
  return `${getRandomString(5)}@example.com`;
}

// // Helper: select a random location option from available mat-options
// function selectRandomLocationOption() {
//   cy.get('mat-option', { timeout: 10000 }).then($options => {
//     const optionCount = $options.length;
//     expect(optionCount).to.be.greaterThan(0); // make sure at least one exists

//     const randomIndex = Math.floor(Math.random() * optionCount);
//     cy.wrap($options[randomIndex]).click({ force: true });
//   });
// }



describe('CarePoint Login and Additional users', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.visit('https://pro-qcp-dev.carepointsolutions.com/', { failOnStatusCode: false });
    cy.get('[data-drupal-link-system-path="user/login"]', { timeout: 15000 }).click();
  });

  it('verify the functionality of Add Additional Users button', () => {
    login('stha.luna0811@gmail.com', 'Anchor@17');  
    goToAdditionalUsers();

    cy.get(selectors.add_additional_users)
      .should('be.visible')
      .click();

      // Wait for the modal to appear
cy.get('mat-dialog-container', { timeout: 20000 })
  .should('be.visible');

// Then target the input inside the modal using a relative selector
cy.get('mat-dialog-container input[formcontrolname="name"]', { timeout: 10000 })
  .should('be.visible')
  .type(getRandomName(), { force: true });


// Fill Title field with random health-sector title
cy.get('mat-dialog-container input[formcontrolname="title"]', { timeout: 10000 })
  .should('be.visible')
  .type(getRandomTitle(), { force: true });


// Open the dropdown using its formcontrolname
cy.get('mat-dialog-container mat-select[formcontrolname="role"]', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

// Wait for options to appear and select the first option
cy.get('mat-option', { timeout: 10000 })
  .should('be.visible')
  .first()
  .click({ force: true });
  // Select random dropdown option (example formcontrolname="role")
  selectRandomOption();


  ////using random email for adding testing location
  cy.get('mat-dialog-container input[formcontrolname="email"]', { timeout: 10000 })
  .should('be.visible')
  .type(getRandomEmail(), { force: true });
  // Open the dropdown
// Open the dropdown
cy.get('mat-dialog-container mat-select[formcontrolname="location"]', { timeout: 10000 })
  .should('be.visible')
  .click({ force: true });

// Grab all options and pick one at random
cy.get('mat-option', { timeout: 10000 }).then($options => {
  const count = $options.length;
  expect(count).to.be.greaterThan(0);

  // pick a random option
  const randomIndex = Math.floor(Math.random() * count);
  const randomOption = $options[randomIndex];

  // store the selected text
  const selectedText = randomOption.innerText.trim();

  // click it
  cy.wrap(randomOption).click({ force: true });

  // ✅ assertion: check dropdown now shows the chosen option
  cy.get('mat-dialog-container mat-select[formcontrolname="location"]')
    .should('contain.text', selectedText);
});
// cy.get('')driver.findElement(By.xpath("/html[1]/body[1]/div[4]/div[2]/div[1]/mat-dialog-container[1]/div[1]/div[1]/app-users-dialog[1]/form[1]/mat-dialog-actions[1]/div[1]/button[2]/span[4]"))
cy.get('mat-dialog-container app-users-dialog form mat-dialog-actions button:nth-of-type(2)', { timeout: 10000 })
      .should('be.visible')

});

//   .click({ force: true });



  });

