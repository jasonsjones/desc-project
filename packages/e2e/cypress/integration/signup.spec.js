describe('User Signup', () => {
    const userData = {
        firstName: 'Raymond',
        lastName: 'Palmer',
        email: 'raymond@palmertech.com',
        program: 'Integrated Services',
        password: '123456'
    };

    after(() => {
        cy.exec('npm run db:reset');
    });

    describe('Signup', () => {
        it('does not submit form if data is missing', () => {
            cy.visit('http://localhost:4200/signup');
            cy.get('#firstName')
                .focus()
                .type(userData.firstName);

            // skip last name

            cy.get('#email')
                .focus()
                .type(userData.email);

            cy.get('input.select-dropdown')
                .focus()
                .click();
            cy.get('ul.dropdown-content')
                .contains(userData.program)
                .click();

            cy.get('#password')
                .focus()
                .type(userData.password);
            cy.get('#confirmPassword')
                .focus()
                .type(userData.password);

            cy.get('button')
                .contains('Sign Up')
                .click();

            cy.url().should('eq', 'http://localhost:4200/signup');
        });

        it('displays a message when the passwords do not match', () => {
            cy.visit('http://localhost:4200/signup');
            cy.get('#firstName')
                .focus()
                .type(userData.firstName);
            cy.get('#lastName')
                .focus()
                .type(userData.lastName);
            cy.get('#email')
                .focus()
                .type(userData.email);

            cy.get('input.select-dropdown')
                .focus()
                .click();
            cy.get('ul.dropdown-content')
                .contains(userData.program)
                .click();

            cy.get('#password')
                .focus()
                .type(userData.password);
            cy.get('#confirmPassword')
                .focus()
                .type('notthepassword');

            cy.get('.helper-text').should('contain', 'Passwords do NOT match');
        });

        it('signs up a new user', () => {
            cy.visit('http://localhost:4200/signup');
            cy.get('#firstName')
                .focus()
                .type(userData.firstName);
            cy.get('#lastName')
                .focus()
                .type(userData.lastName);
            cy.get('#email')
                .focus()
                .type(userData.email);

            cy.get('input.select-dropdown')
                .focus()
                .click();
            cy.get('ul.dropdown-content')
                .contains(userData.program)
                .click();

            cy.get('#password')
                .focus()
                .type(userData.password);
            cy.get('#confirmPassword')
                .focus()
                .type(userData.password);

            cy.get('button')
                .contains('Sign Up')
                .click();

            cy.url().should('eq', 'http://localhost:4200/');

            cy.get('nav .profile-menu a span').should(
                'contain',
                `${userData.firstName} ${userData.lastName}`
            );
            cy.get('h3').should('contain', userData.firstName);
        });

        it.skip('maintains new user context on page reload', () => {
            cy.reload();
            cy.get('h3').should('contain', userData.firstName);
        });

        it.skip('logs out the user after signup', () => {
            cy.get('.profile-menu > a').click();
            cy.get('.profile-menu a')
                .contains('Logout')
                .click();
            cy.url().should('eq', 'http://localhost:4200/');
            cy.get('h3').should('contain', 'Home Page');
            cy.get('h3').not('contain', userData.firstName);
        });
    });
});
