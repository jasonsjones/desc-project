import { expect } from 'chai';
import request from 'supertest';

import config from '../config/config';
import app from '../config/app';
import { User } from '../models';
import { createUser } from '../user/user-controller';
import { userOllie } from '../utils/user-test-utils';
import { dbConnection, deleteCollection } from '../utils/db-test-utils';

describe('Auth acceptance tests', () => {
    before(async () => await deleteCollection(dbConnection, User, 'users'));
    afterEach(async () => await deleteCollection(dbConnection, User, 'users'));

    describe('POST /api/auth/login', () => {
        it('returns status code of 200 and json with user and token on success', () => {
            return createUser(userOllie)
                .then(() =>
                    request(app)
                        .post('/api/auth/login')
                        .send({ email: userOllie.email, password: userOllie.password })
                        .expect(200)
                )
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

        it('returns status code of 401 if password is incorrect', () => {
            return createUser(userOllie).then(() =>
                request(app)
                    .post('/api/auth/login')
                    .send({ email: userOllie.email, password: 'wrongPassword' })
                    .expect(401)
            );
        });

        it('returns status code of 401 if user (email) is not found', () => {
            return createUser(userOllie).then(() =>
                request(app)
                    .post('/api/auth/login')
                    .send({ email: 'ollie@qc.com', password: userOllie.password })
                    .expect(401)
            );
        });
    });

    describe('GET /api/auth/logout', () => {
        it('returns status code 200 and json payload', () => {
            return createUser(userOllie)
                .then(() =>
                    request(app)
                        .get('/api/auth/logout')
                        .expect(200)
                )
                .then(res => {
                    const json = res.body;
                    expect(json).to.have.property('success');
                    expect(json).to.have.property('message');
                    expect(json).to.have.property('payload');
                });
        });
    });
});
