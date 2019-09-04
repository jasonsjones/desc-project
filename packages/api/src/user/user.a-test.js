import { expect } from 'chai';
import request from 'supertest';

import app from '../config/app';
import { User } from '../models';
import { createUser } from './user-controller';
import { dbConnection, deleteCollection } from '../utils/db-test-utils';
import { userOllie, userBarry, createUserAndGetToken } from '../utils/user-test-utils';

describe('User acceptance tests', () => {
    afterEach(async () => await deleteCollection(dbConnection, User, 'users'));

    context('POST /api/users', () => {
        it('returns status code 200 and json payload when creating a new user', () => {
            return request(app)
                .post('/api/users/')
                .send(userOllie)
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
        let token;
        before(() => {
            return createUser(userOllie)
                .then(() => createUserAndGetToken(userBarry))
                .then(data => {
                    token = data.token;
                });
        });

        it('returns status code 200 and json payload with all the users', () => {
            return request
                .agent(app)
                .get('/api/users/')
                .set('Cookie', [`access-token=${token}`])
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
    }).timeout(10000);

    context('GET /api/users/:id', () => {
        it('returns the user with the given id', () => {
            return createUser(userBarry)
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
        it('updates the user with the provided data', () => {
            const updatedUserData = { email: 'flash@starlabs.com' };
            return createUser(userBarry).then(user =>
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
                        expect(json.payload.user).to.have.property('program');
                        expect(json.payload.user).to.have.property('roles');
                        expect(json.payload.user.email).to.equal(updatedUserData.email);
                    })
            );
        });
    });

    context('DELETE /api/users/:id', () => {
        it('deletes the user with the given id', () => {
            return createUser(userBarry).then(user =>
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
                        expect(json.payload.user).to.have.property('program');
                        expect(json.payload.user).to.have.property('roles');
                        expect(json.payload.user.email).to.equal(userBarry.email);
                    })
            );
        });
    });
});
