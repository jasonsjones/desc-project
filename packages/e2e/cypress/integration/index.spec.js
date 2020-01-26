describe('Index Page', () => {
    it('has a Home Page', () => {
        cy.visit('http://localhost:4200');
        cy.get('h3').should('contain', 'Home Page');
    });

    it('has nav bar with 3 anchor', () => {
        cy.visit('http://localhost:4200');
        cy.get('nav a').should('have.length', 3);
    });

    it('navigates to login page', () => {
        cy.visit('http://localhost:4200');
        cy.get('nav a')
            .contains('Sign In')
            .click();
        cy.url('includes', '/signin');
    });

    it('navigates to signup page', () => {
        cy.visit('http://localhost:4200');
        cy.get('nav a')
            .contains('Sign Up')
            .click();
        cy.url('includes', '/signup');
    });
});
