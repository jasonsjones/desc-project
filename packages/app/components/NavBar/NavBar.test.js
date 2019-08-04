import React from './node_modules/react';
import { render, cleanup } from './node_modules/@testing-library/react';
import Navbar from '.';

describe('NavBar', () => {
    afterEach(cleanup);

    it('renders the brand logo', () => {
        const { getByText } = render(<Navbar />);
        expect(getByText(/DESC/)).toBeTruthy();
    });

    it('renders a Sign Up link', () => {
        const { getByText } = render(<Navbar />);
        expect(getByText('Sign Up')).toBeTruthy();
    });

    it('renders a Sign In link', () => {
        const { getByText } = render(<Navbar />);
        expect(getByText('Sign In')).toBeTruthy();
    });
});
