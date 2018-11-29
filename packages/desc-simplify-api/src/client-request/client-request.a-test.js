import { expect } from 'chai';
import request from 'supertest';

import config from '../config/config';
import app from '../config/app';
import { createUser } from '../user/user-controller';
import User from '../user/user-model';
import Item from '../item/baseitem-model';
import Note from '../note/note-model';
import { dbConnection, deleteCollection } from '../utils/db-test-utils';
import { getMockItemData } from '../item/item-test-utils';

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

describe('Client Request acceptance tests', () => {
    let barryId;
    before(async () => {
        await deleteCollection(dbConnection, User, 'users');
        return createBarry().then(user => (barryId = user._id));
    });

    afterEach(async () => {
        await deleteCollection(dbConnection, Item, 'items');
        await deleteCollection(dbConnection, Note, 'notes');
    });

    after(async () => await deleteCollection(dbConnection, User, 'users'));

    context('POST /api/clientrequests', () => {
        it('creates a new client request when provided an array of requested items', () => {
            const item1 = getMockItemData(barryId).householdItemWithoutNote;
            const item2 = getMockItemData(barryId).clothingItemWithNote;
            const clientRequestData = {
                clientId: '12345678',
                submittedBy: barryId,
                items: [item1, item2]
            };

            return request(app)
                .post('/api/clientrequests/')
                .send(clientRequestData)
                .expect(200)
                .then(res => {
                    const json = res.body;
                    expect(json).to.have.property('success');
                    expect(json).to.have.property('message');
                    expect(json).to.have.property('payload');
                    expect(json.success).to.be.true;

                    const clientRequest = res.body.payload.clientRequest;
                    expect(clientRequest).to.exist;
                    expect(clientRequest).to.have.property('items');
                    expect(clientRequest.items).to.be.an('array');
                    expect(clientRequest.items).to.have.length(2);
                });
        });

        it('creates a new client request when provided an single requested item', () => {
            const item = getMockItemData(barryId).householdItemWithoutNote;
            const clientRequestData = {
                clientId: '12345678',
                submittedBy: barryId,
                items: item
            };

            return request(app)
                .post('/api/clientrequests/')
                .send(clientRequestData)
                .expect(200)
                .then(res => {
                    const json = res.body;
                    expect(json).to.have.property('success');
                    expect(json).to.have.property('message');
                    expect(json).to.have.property('payload');
                    expect(json.success).to.be.true;

                    const clientRequest = res.body.payload.clientRequest;
                    expect(clientRequest).to.exist;
                    expect(clientRequest).to.have.property('items');
                    expect(clientRequest.items).to.be.an('array');
                    expect(clientRequest.items).to.have.length(1);
                });
        });

        it('creates a new empty client request when no items are provided', () => {
            const clientRequestData = {
                clientId: '12345678',
                submittedBy: barryId
            };

            return request(app)
                .post('/api/clientrequests/')
                .send(clientRequestData)
                .expect(200)
                .then(res => {
                    const json = res.body;
                    expect(json).to.have.property('success');
                    expect(json).to.have.property('message');
                    expect(json).to.have.property('payload');
                    expect(json.success).to.be.true;

                    const clientRequest = res.body.payload.clientRequest;
                    expect(clientRequest).to.exist;
                    expect(clientRequest).to.have.property('items');
                    expect(clientRequest.items).to.be.an('array');
                    expect(clientRequest.items).to.have.length(0);
                });
        });
    });

    context('GET /api/clientrequests', () => {});
    context('GET /api/clientrequests/:id', () => {});
});
