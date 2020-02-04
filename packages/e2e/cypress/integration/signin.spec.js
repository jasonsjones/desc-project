describe('User Signin', () => {
    const user = {
        name: {
            first: 'Oliver',
            last: 'Queen'
        },
        email: 'oliver@qc.com',
        program: 'employment',
        password: 'thegreenarrow',
        roles: ['admin', 'approver']
    };

    before(() => {
        // Will likely need to be refactored out as a Cypress.Command to reuse in all the other
        // tests.  Most likely consolidate a command to create a user and sign in.
        return cy.request({
            url: 'http://localhost:3000/api/users/testonly',
            method: 'POST',
            body: user
        });
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('qid');
    });

    after(() => {
        cy.exec('npm run db:reset');
    });

    it('shows error if user is unauthorized', () => {
        cy.visit('http://localhost:4200/signin');
        cy.get('#email')
            .focus()
            .type('random@desc.org');

        cy.get('#password')
            .focus()
            .type('randompassword1234');

        cy.get('button')
            .contains('Sign In')
            .click();

        cy.get('form .red-text').should('contain', 'Unathorized user.');
    });

    it('successfully logs in an existing user', () => {
        cy.visit('http://localhost:4200/signin');
        cy.get('#email')
            .focus()
            .type(user.email);

        cy.get('#password')
            .focus()
            .type(user.password);

        cy.get('button')
            .contains('Sign In')
            .click();

        cy.url().should('eq', 'http://localhost:4200/');

        cy.get('nav .profile-menu a span').should(
            'contain',
            `${user.name.first} ${user.name.last}`
        );
        cy.get('h3').should('contain', user.name.first);
    });

    it('maintains user context on page reload', () => {
        cy.reload();
        cy.get('h3').should('contain', user.name.first);
    });

    it('logs out the user after signup', () => {
        cy.visit('http://localhost:4200/');

        cy.get('.profile-menu > a').click();
        cy.get('.profile-menu a')
            .contains('Logout')
            .click();
        cy.url().should('eq', 'http://localhost:4200/');
        cy.get('h3').should('contain', 'Home Page');
        cy.get('h3').not('contain', user.name.first);
    });
});
