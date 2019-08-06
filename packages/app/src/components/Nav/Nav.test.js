import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import Nav from './Nav';
import { AuthProvider } from '../../context/AuthContext';

const contextUser = {
    name: {
        first: 'Oliver',
        last: 'Queen'
    },
    email: 'ollie@qc.com'
};

const token = 'eythisisthetokenoftheauthuser1234';

const renderWithRouterAndContext = () => {
    return render(
        <AuthProvider value={{ contextUser, token }}>
            <Router>
                <Nav />
            </Router>
        </AuthProvider>
    );
};

const renderWithRouter = () => {
    return render(
        <Router>
            <Nav />
        </Router>
    );
};

describe('NavBar', () => {
    afterEach(cleanup);

    it('renders the brand logo', () => {
        const { getByText } = renderWithRouter();
        expect(getByText(/DESC/)).toBeTruthy();
    });

    it('renders a Sign Up link', () => {
        const { getByText } = renderWithRouter();
        expect(getByText('Sign Up')).toBeTruthy();
    });

    it('renders a Sign In link', () => {
        const { getByText } = renderWithRouter();
        expect(getByText('Sign In')).toBeTruthy();
    });

    it('sign in link is not present if user is authenticated', () => {
        const { queryByText } = renderWithRouterAndContext();
        expect(queryByText('Sign In')).toBeNull();
    });

    it('sign up link is not present if user is authenticated', () => {
        const { queryByText } = renderWithRouterAndContext();
        expect(queryByText('Sign Up')).toBeNull();
    });
});
