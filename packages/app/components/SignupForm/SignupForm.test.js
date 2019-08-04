import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SignupForm from '.';

describe('SignupForm', () => {
    afterEach(cleanup);

    it('renders an input for first name', () => {
        const { getByLabelText } = render(<SignupForm />);
        expect(getByLabelText('First Name')).toBeTruthy();
    });

    it('renders an input for last name', () => {
        const { getByLabelText } = render(<SignupForm />);
        expect(getByLabelText('Last Name')).toBeTruthy();
    });

    it('renders an input for email', () => {
        const { getByLabelText } = render(<SignupForm />);
        expect(getByLabelText('Your Email')).toBeTruthy();
    });

    it('renders an input for password', () => {
        const { getByLabelText } = render(<SignupForm />);
        expect(getByLabelText('Password')).toBeTruthy();
    });

    it('renders an input to confirm password', () => {
        const { getByLabelText } = render(<SignupForm />);
        expect(getByLabelText('Confirm Password')).toBeTruthy();
    });
});
