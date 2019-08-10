import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <>
            <li>
                <NavLink to="/signup" activeClassName="teal darken-1">
                    Sign Up
                </NavLink>
            </li>
            <li>
                <NavLink to="/signin" activeClassName="teal darken-1">
                    Sign In
                </NavLink>
            </li>
        </>
    );
};

export default SignedOutLinks;
