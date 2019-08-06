import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SigninForm from './SigninForm';

describe('SignupForm', () => {
    afterEach(cleanup);

    it('renders an input for email', () => {
        const { getByLabelText } = render(<SigninForm />);
        expect(getByLabelText('Your Email')).toBeTruthy();
    });

    it('renders an input for password', () => {
        const { getByLabelText } = render(<SigninForm />);
        expect(getByLabelText('Password')).toBeTruthy();
    });
});
