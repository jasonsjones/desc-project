import { expect } from 'chai';
import request from 'supertest';

import config from '../config/config';
import app from '../config/app';
import { createUser } from '../user/user-controller';
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

describe('Auth acceptance tests', () => {
    describe('POST /api/auth/login', () => {
        before(() => dropCollection(dbConnection, 'users'));
        afterEach(() => dropCollection(dbConnection, 'users'));

        it('returns status code of 200 and json with user and token on success', () => {
            return createUser(ollie)
                .then(() =>
                    request(app)
                        .post('/api/auth/login')
                        .send({ email: ollie.email, password: ollie.password })
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
            return createUser(ollie).then(() =>
                request(app)
                    .post('/api/auth/login')
                    .send({ email: ollie.email, password: 'wrongPassword' })
                    .expect(401)
            );
        });

        it('returns status code of 401 if user (email) is not found', () => {
            return createUser(ollie).then(() =>
                request(app)
                    .post('/api/auth/login')
                    .send({ email: 'ollie@qc.com', password: ollie.password })
                    .expect(401)
            );
        });
    });
});
