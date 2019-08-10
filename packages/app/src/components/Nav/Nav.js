import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import UserDropdown from './UserDropdown';
import AuthContext from '../../context/AuthContext';
import './Nav.css';

import AuthContext from '../../context/AuthContext';

const Nav = () => {
    const authCtx = useContext(AuthContext);
    const isAuthed = authCtx.contextUser && authCtx.token;

    const initDropdown = () => {
        return Promise.resolve().then(() => {
            const elems = document.querySelectorAll('.dropdown-trigger');
            M.Dropdown.init(elems, {
                coverTrigger: false
            });
            return true;
        });
    };

    const handleLogout = () => {
        fetch('http://localhost:3000/api/auth/logout', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(() => {
                authCtx.logout();
            });
    };

    return (
        <nav className="nav-wrapper teal">
            <div className="container">
                <Link to="/">
                    <span className="brand-logo">DESC Portal</span>
                </Link>
                <ul className="right hide-on-med-and-down">
                    {!isAuthed && <SignedOutLinks />}
                    {isAuthed && (
                        <>
                            <SignedInLinks />
                            <UserDropdown user={authCtx.contextUser} handleLogout={handleLogout} />
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
