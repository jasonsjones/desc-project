import { expect } from 'chai';

import User from './user-model';
import * as Controller from './user-controller';
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

const dig = {
    name: {
        first: 'John',
        last: 'Diggle'
    },
    email: 'dig@qc.com',
    password: 'spartan',
    roles: ['approver']
};

describe('User Controller integration tests', () => {
    afterEach(done => {
        dropCollection(dbConnection, 'users');
        done();
    });

    describe('createUser()', () => {
        it('creates a new user with the given data', () => {
            return Controller.createUser(ollie).then(newUser => {
                expect(newUser).to.exist;
                expect(newUser).to.have.property('_id');
                expect(newUser).to.have.property('name');
                expect(newUser.name).to.have.property('first');
                expect(newUser.name).to.have.property('last');
                expect(newUser).to.have.property('email');
                expect(newUser).to.have.property('roles');
            });
        });
    });

    describe('getUsers()', () => {
        it('returns an array with all the users', () => {
            return Controller.createUser(ollie)
                .then(() => Controller.createUser(dig))
                .then(() => Controller.getUsers())
                .then(users => {
                    expect(users).to.be.an('array');
                    expect(users).to.have.length(2);
                });
        });
    });

    describe('getUser(id)', () => {
        it('returns the user with the given id', () => {
            return Controller.createUser(ollie)
                .then(ollie => Controller.getUser(ollie._id))
                .then(user => {
                    expect(user).to.exist;
                    expect(user).to.have.property('_id');
                    expect(user).to.have.property('name');
                    expect(user.name).to.have.property('first');
                    expect(user.name).to.have.property('last');
                    expect(user).to.have.property('email');
                    expect(user).to.have.property('roles');
                });
        });
    });
    describe('updateUser(id, userData)', () => {
        it('updates the data of the user with the given id', () => {
            const email = 'diggle@qc.com';
            return Controller.createUser(dig)
                .then(diggle => Controller.updateUser(diggle._id, { email }))
                .then(user => {
                    expect(user).to.exist;
                    expect(user).to.have.property('_id');
                    expect(user).to.have.property('name');
                    expect(user.name).to.have.property('first');
                    expect(user.name).to.have.property('last');
                    expect(user).to.have.property('email');
                    expect(user).to.have.property('roles');
                    expect(user.email).to.equal(email);
                });
        });
    });

    describe('deleteUser(id)', () => {
        it('deletes the user with the given id', () => {
            return Controller.createUser(ollie)
                .then(ollie => Controller.deleteUser(ollie._id))
                .then(user => {
                    expect(user).to.exist;
                    expect(user).to.have.property('_id');
                    expect(user).to.have.property('name');
                    expect(user.name).to.have.property('first');
                    expect(user.name).to.have.property('last');
                    expect(user).to.have.property('email');
                    expect(user).to.have.property('roles');
                });
        });
    });
});
