import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import { AuthProvider } from '../context/authContext';

if (typeof window !== 'undefined') {
    require('materialize-css');
    require('materialize-css/dist/css/materialize.css');
}

const Layout = ({ children }) => {
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
                <Navbar />
                <div className="container" style={{ marginTop: '40px' }}>
                    {children}
                </div>
            </AuthProvider>
        </React.Fragment>
    );
};

export default Layout;
