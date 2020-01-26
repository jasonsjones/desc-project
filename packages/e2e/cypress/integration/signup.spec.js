describe('User Signup', () => {
    after(() => {
        cy.exec('npm run db:reset');
    });

    describe('Signup', () => {
        it('signs up a new user', () => {
            cy.visit('http://localhost:4200/signup');
            cy.get('#firstName')
                .focus()
                .type('Oliver');
            cy.get('#lastName')
                .focus()
                .type('Queen');
            cy.get('#email')
                .focus()
                .type('oliver@qc.com');

            cy.get('input.select-dropdown')
                .focus()
                .click();
            cy.get('ul.dropdown-content')
                .contains('Housing First')
                .click();

            cy.get('#password')
                .focus()
                .type('123456');
            cy.get('#confirmPassword')
                .focus()
                .type('123456');

            cy.get('button')
                .contains('Sign Up')
                .click();

            cy.url().should('eq', 'http://localhost:4200/');

            cy.get('h3').should('contain', 'Oliver');
        });

        it('logs out the user after signup', () => {
            cy.get('.profile-menu > a').click();
            cy.get('.profile-menu a')
                .contains('Logout')
                .click();
            cy.url().should('eq', 'http://localhost:4200/');
            cy.get('h3').should('contain', 'Home Page');
            cy.get('h3').not('contain', 'Oliver');
        });
    });
});
