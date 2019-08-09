import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav/Nav';
import { AuthProvider } from '../context/AuthContext';

const Layout = props => {
    const [contextUser, setContextUser] = useState(null);
    const [token, setToken] = useState('');
    useEffect(() => {
        fetch('http://localhost:3000/api/users/me', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    setContextUser(data.payload.user);
                    setToken(data.payload.token);
                }
            });
    }, []);

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
