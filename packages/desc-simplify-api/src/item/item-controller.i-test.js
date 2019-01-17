import { expect } from 'chai';

import * as Controller from './item-controller';
import { createUser } from '../user/user-controller';
import { User, Item, Note } from '../models';
import { userOllie, userBarry } from '../utils/user-test-utils';
import { dbConnection, deleteCollection } from '../utils/db-test-utils';
import { getMockItemData } from '../utils/item-test-utils';

const createOllie = () => createUser(userOllie);

const createBarry = () => createUser(userBarry);

describe('Item integration tests', () => {
    let barryId, ollieId;
    before(async () => {
        await deleteCollection(dbConnection, User, 'users');
        return createBarry()
            .then(user => (barryId = user._id))
            .then(() => createOllie())
            .then(user => (ollieId = user._id));
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

        it('creates a personal hygiene item without note', () => {
            const itemData = getMockItemData(ollieId).personalHygieneItemWithoutNote;
            return Controller.createItem(itemData).then(item => {
                expect(item).to.exist;
                expect(item.itemCategory).to.equal('PersonalHygiene');
                expect(item).to.have.property('submittedBy');
                expect(item.submittedBy._id.toString()).to.equal(ollieId.toString());
                expect(item.notes).to.be.an('array');
                expect(item.notes).to.have.length(0);
            });
        });

        it('creates an engagement item with a note', () => {
            const itemData = getMockItemData(barryId).engagementItemWithNote;
            return Controller.createItem(itemData).then(item => {
                expect(item).to.exist;
                expect(item.itemCategory).to.equal('Engagement');
                expect(item).to.have.property('submittedBy');
                expect(item.submittedBy._id.toString()).to.equal(barryId.toString());
                expect(item.notes).to.be.an('array');
                expect(item.notes).to.have.length(1);
            });
        });
        // TODO: add more tests for creating other item types
    });

    context('getItems()', () => {
        it('fetches an array of all the items', () => {
            const item1Data = getMockItemData(barryId).engagementItemWithNote;
            const item2Data = getMockItemData(barryId).householdItemWithoutNote;
            return Controller.createItem(item1Data)
                .then(() => Controller.createItem(item2Data))
                .then(() => Controller.getItems())
                .then(items => {
                    expect(items).to.exist;
                    expect(items).to.be.an('array');
                });
        });
    });

    context('getItem(id)', () => {
        it('fetches a single item');
    });

    context('updateItem(id, newData)', () => {
        it('updates a single item  with the newData');
    });

    context('deleteItem(id)', () => {
        it('deletes a single item');
    });

    context('addNote(itemId, noteData)', () => {
        it('adds a new note to an item');
    });
    // TODO: add more integration tests for remaining CRUD operations
});
