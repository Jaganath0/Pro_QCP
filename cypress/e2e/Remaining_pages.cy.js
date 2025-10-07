describe('Visit CarePoint FAQ and Customer Support pages', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);

    cy.visit('https://pro-qcp-dev.carepointsolutions.com/', { failOnStatusCode: false });

    cy.get('#top-menu > :nth-child(2) > a', { timeout: 15000 }).click();
    cy.get('.example-icon', { timeout: 15000 }).click();

    cy.url({ timeout: 10000 }).should('include', '/faq');
    cy.contains('Frequently Asked Questions', { timeout: 10000 }).should('be.visible');
  });

  it('should display the FAQ page', () => {
    cy.log('FAQ page is visible',{timeout:15000});
  });

  it('check functionality of cart button to navigate to cart page', () => {
    cy.get('.cart-block--summary__count', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait(3000);
    cy.url({ timeout: 15000 }).should('include', '/cart');
  });

  it('should navigate to Customer Support page in the same Cypress tab', () => {
    // Click the support link and get its href
    cy.get('a[href*="support.carepointsolutions.com/portal/en/home"]', { timeout: 15000 })
      .first()
      .then(($link) => {
        const url = $link.prop('href');
        cy.visit(url);
      });

    // Now that we're in a different origin, use cy.origin() to interact safely
    cy.origin('https://support.carepointsolutions.com', () => {
      cy.url({ timeout: 15000 }).should('include', '/portal/en/home');
      cy.contains('Welcome to CarePoint Solutions Inc', { timeout: 15000 }).should('be.visible');
    });
  });

}); 
