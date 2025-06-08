describe('products', () => {
    it('can search product and a product with the searched word in the name appears', () => {
        cy.intercept('GET', '**/api/search-products*').as('searchProducts');
        cy.intercept('POST', '**/api/login').as('loginRequest');
        //Login:
        cy.visit('http://localhost:5173/auth/login');
        cy.get('input[name="email"]').type('user@user.com');
        cy.get('input[name="password"]').type('user');
        cy.get('[data-cy="login-button"]').click();

        cy.wait('@loginRequest');

        cy.url().should('include', '/');
        //Search
        cy.get('input[name="search-input"]').type('star wars');
        cy.get('button[name="search-button"]').click();

        cy.wait('@searchProducts');

        cy.contains('Luke Skywalker').should('be.visible');
    });
});
