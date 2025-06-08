describe('non permission tests', () => {
    it('redirection to login if not logged in', () => {
      cy.visit('http://localhost:5173/');
      cy.url().should('include', '/auth/login');
    });

    it('redirection to non authorized page if trying to go to admin as user', () => {

        cy.intercept('POST', '**/api/login').as('loginRequest');
      
        cy.visit('http://localhost:5173/auth/login');

        cy.get('input[name="email"]').type('user@user.com');
        cy.get('input[name="password"]').type('user');

        cy.get('[data-cy="login-button"]').click();

        cy.wait('@loginRequest');

        cy.url().should('include', '/');

        cy.contains('Track & Shop with Ease');

        cy.visit('http://localhost:5173/admin');

        cy.url().should('include', '/auth/access');

    });
})
