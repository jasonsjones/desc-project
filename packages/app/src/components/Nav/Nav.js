import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';
import M from 'materialize-css';

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
                    {!isAuthed && (
                        <li>
                            <NavLink to="/signup" activeClassName="teal darken-1">
                                Sign Up
                            </NavLink>
                        </li>
                    )}
                    {!isAuthed && (
                        <li>
                            <NavLink to="/signin" activeClassName="teal darken-1">
                                Sign In
                            </NavLink>
                        </li>
                    )}
                    {isAuthed && (
                        <li>
                            <NavLink to="/create">Create Request</NavLink>
                        </li>
                    )}
                    {isAuthed && (
                        <li>
                            <NavLink to="/inbox">View Requests</NavLink>
                        </li>
                    )}
                    {isAuthed && initDropdown() && (
                        <>
                            <li className="profile-menu">
                                <a href="#!" className="dropdown-trigger" data-target="profile">
                                    <i
                                        style={{ marginLeft: '10px' }}
                                        className="small material-icons prefix"
                                    >
                                        account_circle
                                    </i>
                                    <span style={{ margin: '0 8px' }}>
                                        {`${authCtx.contextUser.name.first} ${authCtx.contextUser.name.last}`}
                                    </span>
                                    <i className={`small material-icons prefix`}>expand_more</i>
                                </a>
                            </li>
                            <div>
                                <ul id="profile" className="dropdown-content">
                                    <li>
                                        <a href="#!">Profile</a>
                                    </li>
                                    <li>
                                        <Link to="/" onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
