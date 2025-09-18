const selectors = {
  name: '[name="name"]',
  email: '[name="mail"]',
  subject: '[name="subject[0][value]"]',
  message: '[name="message[0][value]"]',
  submit: '#edit-submit',
  preview: '#edit-preview',
};

function goToContactPage() {
  cy.url().then((url) => {
    if (!url.includes('/contact')) {
      cy.get('#top-menu > :nth-child(3) > a', { timeout: 15000 }).click();
    }
  });
}

// helper functions for random data
function getRandomString(length = 10) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function getRandomEmail() {
  return `${getRandomString(5)}@example.com`;
}

// generate a random paragraph with multiple sentences
function getRandomParagraph(sentenceCount = 3) {
  const words = [
    "care", "health", "support", "system", "service", "quality", "patient",
    "doctor", "nurse", "solution", "community", "future", "test", "cypress",
    "automation", "contact", "feedback", "development", "message", "random"
  ];
  let paragraph = "";
  for (let i = 0; i < sentenceCount; i++) {
    let sentence = [];
    const sentenceLength = Math.floor(Math.random() * 5) + 8; // 8–12 words
    for (let j = 0; j < sentenceLength; j++) {
      const word = words[Math.floor(Math.random() * words.length)];
      sentence.push(word);
    }
    let fullSentence = sentence.join(" ");
    fullSentence = fullSentence.charAt(0).toUpperCase() + fullSentence.slice(1) + ". ";
    paragraph += fullSentence;
  }
  return paragraph.trim();
}

describe('Visit CarePoint contact page', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    cy.visit('https://pro-qcp-dev.carepointsolutions.com/', {
      failOnStatusCode: false,
      timeout: 30000,
    });
  });

  it('Should display contact form fields', () => {
    goToContactPage();

    cy.get(selectors.name).should('be.visible');
    cy.get(selectors.email).should('be.visible');
    cy.get(selectors.subject).should('be.visible');
    cy.get(selectors.submit).should('be.visible');
  });
//// check form validation with blank fields
  it('Submit the form with blank fields (check HTML5 validation)', () => {
    goToContactPage();

    cy.get(selectors.submit).click();

    cy.get(selectors.name).then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
    });

    cy.get(selectors.email).then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
    });

    cy.get(selectors.subject).then(($el) => {
      expect($el[0].checkValidity()).to.be.false;
///Assert the validation message for name field
    cy.get(selectors.name).then(($el) => {
      expect($el[0].validationMessage).to.eq('Please fill out this field.');});
    });
  });
/// check form validation with white spaces
  it('Submit the form with white spaces', () => {
    goToContactPage();

    cy.get(selectors.name).clear().type('   ');
    cy.get(selectors.email).clear().type('   ');
    cy.get(selectors.subject).clear().type('   ');
    cy.get(selectors.submit).click();
  });
/// check form validation with leaving name field blank
  it('Submit the form leaving blank name field', () => {
    goToContactPage();

    cy.get(selectors.email).clear().type(getRandomEmail());
    cy.get(selectors.subject).clear().type(`Subject ${getRandomString(8)}`);
    cy.get(selectors.message).clear().type(getRandomParagraph(4));

    cy.get(selectors.submit).click();

    cy.get(selectors.name).then(($el) => {
      expect($el[0].validationMessage).to.eq('Please fill out this field.');
    });
  });
/// check form validation with leaving email field blank
  it('Submit the form leaving blank email field', () => {
    goToContactPage();

    cy.get(selectors.name).clear().type(`User ${getRandomString(5)}`);
    cy.get(selectors.subject).clear().type(`Subject ${getRandomString(8)}`);
    cy.get(selectors.message).clear().type(getRandomParagraph(4));

    cy.get(selectors.submit).click();

    cy.get(selectors.email).then(($el) => {
      expect($el[0].validationMessage).to.eq('Please fill out this field.');
    });
  });
/// check form validation with leaving subject field blank
  it('Submit the form leaving blank subject field', () => {
    goToContactPage();

    cy.get(selectors.name).clear().type(`User ${getRandomString(5)}`);
    cy.get(selectors.email).clear().type(getRandomEmail());
    cy.get(selectors.message).clear().type(getRandomParagraph(4));

    cy.get(selectors.submit).click();

    cy.get(selectors.subject).then(($el) => {
      expect($el[0].validationMessage).to.eq('Please fill out this field.');
    });
  });
/// check form validation with leaving message field blank
  it('Submit the form leaving blank message field', () => {
    goToContactPage();

    cy.get(selectors.name).clear().type(`User ${getRandomString(5)}`);
    cy.get(selectors.email).clear().type(getRandomEmail());
    cy.get(selectors.subject).clear().type(`Subject ${getRandomString(8)}`);

    cy.get(selectors.submit).click();

    cy.get(selectors.message).then(($el) => {
      expect($el[0].validationMessage).to.eq('Please fill out this field.');
    });
  });
/// check form validation with invalid email format
  it('Check with invalid email format', () => {
    goToContactPage();

    cy.get(selectors.name).clear().type(`User ${getRandomString(5)}`);
    cy.get(selectors.email).clear().type('invalidEmailFormat');
    cy.get(selectors.subject).clear().type(`Subject ${getRandomString(8)}`);
    cy.get(selectors.message).clear().type(getRandomParagraph(4));

    cy.get(selectors.submit).click();

    cy.get(selectors.email).then(($el) => {
      expect($el[0].validationMessage).to.contain("Please include an '@'");
    });
  });
/// preview the form with valid data
  it('Submit the form with valid data click for preview button', () => {
    goToContactPage();

    cy.get(selectors.name).clear().type(`User ${getRandomString(5)}`);
    cy.get(selectors.email).clear().type(getRandomEmail());
    cy.get(selectors.subject).clear().type(`Subject ${getRandomString(8)}`);
    cy.get(selectors.message).clear().type(getRandomParagraph(6));

    // cy.get(selectors.preview).click();
  });
/// submit the form with valid data
  it('Submit the form with valid data click for send message button', () => {
    goToContactPage();

    cy.get(selectors.name).clear().type(`User ${getRandomString(5)}`);
    cy.get(selectors.email).clear().type(getRandomEmail());
    cy.get(selectors.subject).clear().type(`Subject ${getRandomString(8)}`);
    cy.get(selectors.message).clear().type(getRandomParagraph(6));

    // cy.get(selectors.submit).click();
  });
});
