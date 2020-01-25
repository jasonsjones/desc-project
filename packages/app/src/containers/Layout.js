import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav/Nav';
import { AuthProvider } from '../context/AuthContext';
import { fetchSessionUser } from '../services/auth';

const Layout = props => {
    const [contextUser, setContextUser] = useState(null);
    const [token, setToken] = useState('');
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchSessionUser().then(data => {
            if (data) {
                setContextUser(data.payload.user);
                setToken(data.payload.token);
            }

            setTimeout(() => {
                setIsFetching(false);
            }, 1000);
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
                {isFetching ? (
                    <div style={{ position: 'absolute', left: '35%', top: '50%', width: '30%' }}>
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <Nav />
                        <div className="container">{props.children}</div>
                    </React.Fragment>
                )}
            </AuthProvider>
        </React.Fragment>
    );
};

export default Layout;
