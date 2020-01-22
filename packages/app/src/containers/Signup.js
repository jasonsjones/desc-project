import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import SignupForm from '../components/SignupForm/SignupForm';
import AuthContext from '../context/AuthContext';

const Signup = props => {
    const authCtx = useContext(AuthContext);
    if (authCtx.contextUser) {
        return <Redirect to="/" />;
    }
    return <SignupForm {...props} />;
};

export default Signup;
