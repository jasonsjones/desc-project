import React, { useState } from 'react';
import Nav from '../components/Nav/Nav';
import { AuthProvider } from '../context/AuthContext';

const Layout = props => {
    const [contextUser, setContextUser] = useState(null);
    const [token, setToken] = useState('');

    const login = (user, token) => {
        setContextUser(user);
        setToken(token);
    };

    const logout = () => {
        setContextUser(null);
        setToken('');
    };

    return (
        <React.Fragment>
            <AuthProvider value={{ contextUser, token, login, logout }}>
                <Nav />
                <div className="container">{props.children}</div>
            </AuthProvider>
        </React.Fragment>
    );
};

export default Layout;
