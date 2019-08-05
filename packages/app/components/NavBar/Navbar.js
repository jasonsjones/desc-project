import { useContext } from 'react';
import Link from 'next/link';

import AuthContext from '../../context/authContext';

const Navbar = () => {
    const authCtx = useContext(AuthContext);
    const isAuthed = authCtx.contextUser && authCtx.token;
    return (
        <nav className="nav-wrapper teal">
            <div className="container">
                <Link href="/">
                    <a className="brand-logo">DESC Portal</a>
                </Link>
                <ul className="right hide-on-med-and-down">
                    {!isAuthed && (
                        <li>
                            <Link href="/signup">
                                <a>Sign Up</a>
                            </Link>
                        </li>
                    )}
                    {!isAuthed && (
                        <li>
                            <Link href="/signin">
                                <a>Sign In</a>
                            </Link>
                        </li>
                    )}
                    {isAuthed && (
                        <li>
                            <Link href="/create">
                                <a>Create Request</a>
                            </Link>
                        </li>
                    )}
                    {isAuthed && (
                        <li>
                            <Link href="/inbox">
                                <a>View Requests</a>
                            </Link>
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
                            <span style={{ margin: '0 8px' }}>{authCtx.contextUser.name}</span>
                            <i className="small material-icons prefix">expand_more</i>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
