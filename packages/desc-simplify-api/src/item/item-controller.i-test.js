import { expect } from 'chai';

import * as Controller from './item-controller';
import { createUser } from '../user/user-controller';
import { createItem } from '../item/item-controller';
import { User, Item, Note } from '../models';
import { userOllie, userBarry } from '../utils/user-test-utils';
import { dbConnection, deleteCollection } from '../utils/db-test-utils';
import { getMockItemData } from '../utils/item-test-utils';

const createOllie = () => createUser(userOllie);

const createBarry = () => createUser(userBarry);

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
