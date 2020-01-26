describe('User Signup', () => {
    after(() => {
        cy.exec('npm run db:reset');
    });

    describe('Signup', () => {
        it('signs up a new user', () => {
            cy.visit('http://localhost:4200/signup');
            cy.get('#firstName')
                .focus()
                .type('Raymond');
            cy.get('#lastName')
                .focus()
                .type('Palmer');
            cy.get('#email')
                .focus()
                .type('raymond@palmertech.com');

            cy.get('input.select-dropdown')
                .focus()
                .click();
            cy.get('ul.dropdown-content')
                .contains('Integrated Services')
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

            cy.get('nav .profile-menu a span').should('contain', 'Raymond Palmer');
            cy.get('h3').should('contain', 'Raymond');
        });

        it('maintains new user context on page reload', () => {
            cy.reload();
            cy.get('h3').should('contain', 'Raymond');
        });

        it('logs out the user after signup', () => {
            cy.get('.profile-menu > a').click();
            cy.get('.profile-menu a')
                .contains('Logout')
                .click();
            cy.url().should('eq', 'http://localhost:4200/');
            cy.get('h3').should('contain', 'Home Page');
            cy.get('h3').not('contain', 'Raymond');
        });
    });
});
