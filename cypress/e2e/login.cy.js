describe('Login de usuario', () => {
    it('tests login as user', () => {
        cy.visit('http://localhost:5173/auth/login');

        cy.get('input[name="email"]').type('user@user.com');
        cy.get('input[name="password"]').type('user');


        cy.get('[data-cy="login-button"]').click();


        cy.url().should('include', '/');

        cy.contains('Track & Shop with Ease');
    });
});
