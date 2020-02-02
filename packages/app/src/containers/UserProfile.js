import React, { useContext } from 'react';
import UserProfileDetails from '../components/UserProfileDetails';
import AuthContext from '../context/AuthContext';

const UserProfile = () => {
    const authCtx = useContext(AuthContext);

    return (
        <React.Fragment>
            <div style={{ marginTop: '5rem' }}>
                <UserProfileDetails user={authCtx.contextUser} />
            </div>
        </React.Fragment>
    );
};

export default UserProfile;
