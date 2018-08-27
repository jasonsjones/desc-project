import { expect } from 'chai';
import request from 'supertest';

import config from '../config/config';
import app from '../config/app';
import { createUser } from './user-controller';
import { dbConnection, dropCollection } from '../utils/db-test-utils';

const ollie = {
    name: {
        first: 'Oliver',
        last: 'Queen'
    },
    email: 'oliver@qc.com',
    password: 'thegreenarrow',
    roles: ['admin', 'approver']
};

const barry = {
    name: {
        first: 'Barry',
        last: 'Allen'
    },
    email: 'barry@starlabs.com',
    password: 'theflash',
    roles: ['requestor']
};

const createOllie = () => {
    return createUser(ollie);
};

const createBarry = () => {
    return createUser(barry);
};

describe('User acceptance tests', () => {
    context('POST /api/users', () => {
        before(() => dropCollection(dbConnection, 'users'));
        afterEach(() => dropCollection(dbConnection, 'users'));

        it('returns status code 200 and json payload when creating a new user', () => {
            return request(app)
                .post('/api/users/')
                .send(ollie)
                .expect(200)
                .then(res => {
                    const json = res.body;
                    expect(json).to.have.property('success');
                    expect(json).to.have.property('message');
                    expect(json).to.have.property('payload');
                    expect(json.payload).to.have.property('user');
                    expect(json.payload).to.have.property('token');
                    expect(json.success).to.be.true;
                });
        });

        it('returns status code 200 and json payload with error if required fields are not provided ', () => {
            return request(app)
                .post('/api/users/')
                .send({})
                .expect(200)
                .then(res => {
                    const json = res.body;
                    expect(json).to.have.property('success');
                    expect(json).to.have.property('message');
                    expect(json.success).to.be.false;
                });
        });
    });

    context('GET /api/users', () => {
        before(() => {
            return createOllie().then(() => createBarry());
        });

        afterEach(() => dropCollection(dbConnection, 'users'));

        it('returns status code 200 and json payload with all the users', () => {
            return request(app)
                .get('/api/users/')
                .expect(200)
                .then(res => {
                    const json = res.body;
                    expect(json).to.have.property('success');
                    expect(json).to.have.property('message');
                    expect(json).to.have.property('payload');
                    expect(json.success).to.be.true;
                    expect(json.payload.users).to.be.an('array');
                    expect(json.payload.users).to.have.length(2);
                });
        });
    });

    context('GET /api/users/:id', () => {
        afterEach(() => dropCollection(dbConnection, 'users'));

        it('returns the user with the given id', () => {
            return createBarry()
                .then(barry => request(app).get(`/api/users/${barry._id}`))
                .then(res => {
                    const json = res.body;
                    expect(json).to.have.property('success');
                    expect(json).to.have.property('message');
                    expect(json).to.have.property('payload');
                    expect(json.success).to.be.true;
                    expect(json.payload).to.have.property('user');
                    expect(json.payload.user).to.be.an('object');
                    expect(json.payload.user).to.have.property('name');
                    expect(json.payload.user).to.have.property('email');
                    expect(json.payload.user).to.have.property('roles');
                });
        });
    });

    context('PUT /api/users/:id', () => {
        afterEach(() => dropCollection(dbConnection, 'users'));

        it('updates the user with the provided data', () => {
            const updatedUserData = { email: 'flash@starlabs.com' };
            return createBarry().then(user =>
                request(app)
                    .put(`/api/users/${user._id}`)
                    .send(updatedUserData)
                    .expect(200)
                    .then(res => {
                        const json = res.body;
                        expect(json).to.have.property('success');
                        expect(json).to.have.property('message');
                        expect(json).to.have.property('payload');
                        expect(json.success).to.be.true;
                        expect(json.payload).to.have.property('user');
                        expect(json.payload.user).to.be.an('object');
                        expect(json.payload.user).to.have.property('name');
                        expect(json.payload.user).to.have.property('email');
                        expect(json.payload.user).to.have.property('roles');
                        expect(json.payload.user.email).to.equal(updatedUserData.email);
                    })
            );
        });
    });

    context('DELETE /api/users/:id', () => {
        afterEach(() => dropCollection(dbConnection, 'users'));
        it('deletes the user with the given id', () => {
            return createBarry().then(user =>
                request(app)
                    .delete(`/api/users/${user._id}`)
                    .expect(200)
                    .then(res => {
                        const json = res.body;
                        expect(json).to.have.property('success');
                        expect(json).to.have.property('message');
                        expect(json).to.have.property('payload');
                        expect(json.success).to.be.true;
                        expect(json.payload).to.have.property('user');
                        expect(json.payload.user).to.be.an('object');
                        expect(json.payload.user).to.have.property('name');
                        expect(json.payload.user).to.have.property('email');
                        expect(json.payload.user).to.have.property('roles');
                        expect(json.payload.user.email).to.equal(barry.email);
                    })
            );
        });
    });
});
