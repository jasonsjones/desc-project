import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NavBar from '.';

describe('NavBar', () => {
    afterEach(cleanup);
    it('renders a Sign Up link', () => {
        const { getByText } = render(<NavBar />);
        expect(getByText('Sign Up')).toBeTruthy();
    });

    it('renders a Sign In link', () => {
        const { getByText } = render(<NavBar />);
        expect(getByText('Sign In')).toBeTruthy();
    });
});
