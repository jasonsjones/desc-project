import React from 'react';
import avatar from './default_avatar.png';

const avatarBgColor = '#e0f1f2';

const css = {
    userProfileContainer: {
        width: '960px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImage: {
        marginRight: '4rem',
        backgroundColor: avatarBgColor
    },
    userDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    userRoles: {}
};

const programMap = {
    housing: 'Housing First',
    integrated: 'Integrated Services',
    survival: 'Survival Services',
    health: 'Health Services',
    employment: 'Employment Services',
    research_innovation: 'Research & Innovation'
};

const rolesMap = {
    admin: 'Administrator',
    approver: 'Approver',
    requestor: 'Requestor',
    volunteer: 'Volunteer'
};

const UserRoles = ({ roles }) => {
    return (
        <div style={{ display: 'flex' }}>
            {roles.map((role, i) => (
                <p style={{ marginRight: '0.5rem', fontStyle: 'italic' }} key={i}>{`${
                    rolesMap[role]
                }${i !== roles.length - 1 ? ', ' : ''}`}</p>
            ))}
        </div>
    );
};

const UserProfileDetails = ({ user }) => {
    return (
        <div style={css.userProfileContainer}>
            <img
                className="circle responsive-img"
                style={css.userImage}
                width="200"
                height="200"
                src={avatar}
                alt="default user avatar"
            />
            <div style={css.userDetails}>
                <h3
                    className="teal-text text-darken-2"
                    style={{ margin: '0' }}
                >{`${user.name.first} ${user.name.last}`}</h3>
                <h5
                    className="grey-text text-darken-2"
                    style={{ marginTop: '0.5rem', marginBottom: '0' }}
                >
                    {programMap[user.program]}
                </h5>
                <div
                    className="grey-text text-darken-1"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '1.25rem',
                        marginTop: '0.5rem'
                    }}
                >
                    <UserRoles roles={user.roles} />
                    <p className="teal-text text-darken-2">{user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfileDetails;
