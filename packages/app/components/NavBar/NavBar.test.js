import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Navbar from './Navbar';

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
