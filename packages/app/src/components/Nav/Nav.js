import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'materialize-css';

import AuthContext from '../../context/AuthContext';

const Nav = () => {
    const authCtx = useContext(AuthContext);
    const isAuthed = authCtx.contextUser && authCtx.token;

    const handleLogout = () => {
        fetch('http://localhost:3000/api/auth/logout', {
            method: 'GET',
            credentials: 'include'
        }).then(() => {
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
                    {isAuthed && (
                        <li style={{ display: 'flex', alignItems: 'center' }}>
                            <i
                                style={{ marginLeft: '20px' }}
                                className="small material-icons prefix"
                            >
                                account_circle
                            </i>
                            <span style={{ margin: '0 8px' }}>
                                {`${authCtx.contextUser.name.first} ${authCtx.contextUser.name.last}`}
                            </span>
                            <i className="small material-icons prefix">expand_more</i>
                        </li>
                    )}
                    {isAuthed && (
                        <li>
                            <NavLink to="/" onClick={handleLogout}>
                                Logout
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
