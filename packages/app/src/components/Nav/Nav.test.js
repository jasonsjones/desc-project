import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import Nav from './Nav';

const renderWithRouter = () => {
    return render(
        <MemoryRouter>
            <Nav />
        </MemoryRouter>
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
});
