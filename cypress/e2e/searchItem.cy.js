describe('products', () => {
    it('can search product and a product with the searched word in the name appears', () => {
        //Login:
        cy.visit('http://localhost:5173/auth/login');
        cy.get('input[name="email"]').type('user@user.com');
        cy.get('input[name="password"]').type('user');
        cy.get('[data-cy="login-button"]').click();
        cy.url().should('include', '/');
        //Search
        cy.get('input[name="search-input"]').type('star wars');
        cy.get('button[name="search-button"]').click();
        cy.contains('Luke Skywalker').should('be.visible');
    });
});
