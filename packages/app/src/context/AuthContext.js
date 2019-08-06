import React from 'react';

const AuthContext = React.createContext({
    contextUser: null,
    token: '',
    login: () => {},
    logout: () => {}
});

const AuthProvider = AuthContext.Provider;
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
export default AuthContext;
