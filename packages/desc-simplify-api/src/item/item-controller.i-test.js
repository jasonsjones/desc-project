import { expect } from 'chai';

import * as Controller from './item-controller';
import { createUser } from '../user/user-controller';
import { createItem } from '../item/item-controller';
import User from '../user/user-model';
import Item from '../item/baseitem-model';
import Note from '../note/note-model';
import { dbConnection, deleteCollection } from '../utils/db-test-utils';
import { getMockItemData } from './item-test-utils';

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

const createOllie = () => createUser(ollie);

const createBarry = () => createUser(barry);

describe('Item integration tests', () => {
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

    context('createItem()', () => {
        it('creates a household item without a note', () => {
            const itemData = getMockItemData(barryId).householdItemWithoutNote;
            return Controller.createItem(itemData).then(item => {
                expect(item).to.exist;
                expect(item.itemCategory).to.equal('Household');
                expect(item).to.have.property('submittedBy');
                expect(item.submittedBy._id.toString()).to.equal(barryId.toString());
                expect(item.notes).to.be.an('array');
                expect(item.notes).to.have.length(0);
            });
        });

        it('creates a clothing item with a note', () => {
            const itemData = getMockItemData(barryId).clothingItemWithNote;
            return Controller.createItem(itemData).then(item => {
                expect(item).to.exist;
                expect(item.itemCategory).to.equal('Clothing');
                expect(item).to.have.property('submittedBy');
                expect(item.submittedBy._id.toString()).to.equal(barryId.toString());
                expect(item.notes).to.be.an('array');
                expect(item.notes).to.have.length(1);
            });
        });

        // TODO: add more tests for creating other item typs
    });

    // TODO: add more integration tests for remaining CRUD operations
});
