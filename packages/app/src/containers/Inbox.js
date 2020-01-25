import React, { useContext } from 'react';
import RequestorInbox from '../components/RequestorInbox';
import RequestTabs from '../components/RequestInbox/RequestTabs';
import AuthContext from '../context/AuthContext';

const Inbox = () => {
    const authContext = useContext(AuthContext);
    const isApprover = authContext.contextUser.roles.includes('approver');
    const isRequestor = authContext.contextUser.roles.includes('requestor');
    if (isApprover) {
        return <RequestTabs />;
    }

    if (isRequestor) {
        return <RequestorInbox />;
    }
    return <h3>Unknown role</h3>;
};

export default Inbox;
