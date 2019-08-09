import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Home = () => {
    const authCtx = useContext(AuthContext);
    return (
        <>
            {authCtx.contextUser ? (
                <h3 className="center-align teal-text">
                    Welcome, {`${authCtx.contextUser.name.first}`}
                </h3>
            ) : (
                <h3 className="center-align teal-text">Home Page</h3>
            )}
        </>
    );
};

export default Home;
