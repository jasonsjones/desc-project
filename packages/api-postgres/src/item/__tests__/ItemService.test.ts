import ItemService from '../ItemService';
import { createPostgresConnection, closeConnection } from '../../config/database';
import User, { Program } from '../../entity/User';
import Item from '../../entity/Item';
import { getRepository } from 'typeorm';
import { ItemCategory, ItemPriority, ItemStatus, HouseLocation } from '../types';
import UserService from '../../user/UserService';
import TestUtils from '../../testUtils/TestUtilities';

describe('Item service', () => {
    let userId: string;
    const clientId = '123456789';

    beforeAll(async () => {
        await createPostgresConnection();
        userId = (
            await UserService.createUser(
                'Test',
                'User',
                'test@desc.org',
                '123456',
                Program.SURVIVAL
            )
        ).id;
    });

    afterEach(async () => {
        const itemRepository = await getRepository(Item);
        await itemRepository.clear();
    });

    afterAll(async () => {
        await TestUtils.dropUsers();
        await closeConnection();
    });

    describe('createItem() method', () => {
        it('creates a new engagement item', async () => {
            const itemName = 'games';
            const item = await ItemService.createItem({
                clientId,
                category: ItemCategory.ENGAGEMENT,
                name: itemName,
                location: HouseLocation.AURORA_HOUSE,
                requestorId: userId
            });

            expect(item).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'engagement',
                    priority: 'standard',
                    quantity: 1,
                    name: itemName,
                    submittedBy: expect.any(User),
                    status: 'active',
                    location: 'aurora house'
                })
            );
        });

        it('creates a new household item', async () => {
            const item = await ItemService.createItem({
                clientId,
                category: ItemCategory.HOUSEHOLD,
                name: 'pillows',
                quantity: 2,
                location: HouseLocation.RAINIER_HOUSE,
                requestorId: userId
            });

            expect(item).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'household',
                    priority: 'standard',
                    quantity: 2,
                    name: 'pillows',
                    submittedBy: expect.any(User),
                    status: 'active',
                    location: 'rainier house'
                })
            );
        });

        it('creates a new urgent household item', async () => {
            const item = await ItemService.createItem({
                clientId,
                category: ItemCategory.HOUSEHOLD,
                name: 'pillows',
                priority: ItemPriority.URGENT,
                quantity: 2,
                location: HouseLocation.CLEMENT_PLACE,
                requestorId: userId
            });

            expect(item).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'household',
                    name: 'pillows',
                    priority: 'urgent',
                    quantity: 2,
                    submittedBy: expect.any(User),
                    status: 'active',
                    location: 'clement place'
                })
            );
        });

        it('creates a new household item with wishlist status', async () => {
            const item = await ItemService.createItem({
                clientId,
                category: ItemCategory.HOUSEHOLD,
                name: 'pillows',
                status: ItemStatus.WISHLIST,
                quantity: 2,
                location: HouseLocation.AURORA_HOUSE,
                requestorId: userId
            });

            expect(item).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'household',
                    name: 'pillows',
                    priority: 'standard',
                    quantity: 2,
                    submittedBy: expect.any(User),
                    status: 'wishlist',
                    location: 'aurora house'
                })
            );
        });

        it('does not create a new item if the requestor is not found', async () => {
            const unkownUserId = '4a29f793-ad0f-4388-9a40-0c0423c5b78c';
            const item = await ItemService.createItem({
                clientId,
                category: ItemCategory.HOUSEHOLD,
                name: 'bedding',
                location: HouseLocation.AURORA_HOUSE,
                requestorId: unkownUserId
            });

            expect(item).toBeUndefined();
        });
    });

    describe('getAllItems() method', () => {
        beforeEach(async () => {
            await ItemService.createItem({
                clientId,
                category: ItemCategory.ENGAGEMENT,
                name: 'games',
                location: HouseLocation.EASTLAKE,
                requestorId: userId
            });
            await ItemService.createItem({
                clientId,
                category: ItemCategory.HOUSEHOLD,
                name: 'bedding',
                quantity: 2,
                location: HouseLocation.AURORA_HOUSE,
                requestorId: userId
            });
        });

        it('fetches all the items', async () => {
            const items = await ItemService.getAllItems();

            expect(items).toHaveLength(2);
            expect(items[1]).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'household',
                    name: 'bedding',
                    quantity: 2,
                    submittedBy: expect.any(User),
                    status: 'active',
                    location: 'aurora house'
                })
            );
        });
    });

    describe('getItemById() method', () => {
        let itemId: string;
        beforeEach(async () => {
            const games = await ItemService.createItem({
                clientId,
                category: ItemCategory.ENGAGEMENT,
                name: 'games',
                location: HouseLocation.AURORA_HOUSE,
                requestorId: userId
            });

            itemId = games?.id as string;
        });

        it('fetches the item with the given id', async () => {
            const item = await ItemService.getItemById(itemId);

            expect(item).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'engagement',
                    name: 'games',
                    quantity: 1,
                    submittedBy: expect.any(User),
                    status: 'active'
                })
            );
        });

        it('returns undefined if the item with the given id is not found', async () => {
            const badId = '80453b6b-d1af-4142-903b-3ba9f92e7f39';
            const item = await ItemService.getItemById(badId);
            expect(item).toBeUndefined();
        });
    });

    describe('updateItem() method', () => {
        let itemId: string;
        const unknownId = '80453b6b-d1af-4142-903b-3ba9f92e7f39';

        beforeEach(async () => {
            const games = await ItemService.createItem({
                clientId,
                category: ItemCategory.HOUSEHOLD,
                name: 'pillows',
                quantity: 2,
                location: HouseLocation.AURORA_HOUSE,
                requestorId: userId
            });

            itemId = games?.id as string;
        });

        it('updates the status of the item with the given id', async () => {
            const updatedItem = await ItemService.updateItem(itemId, {
                status: ItemStatus.APPROVED
            });

            expect(updatedItem).toEqual(
                expect.objectContaining({
                    status: 'approved'
                })
            );
        });

        it('updates the priority of the item with the given id', async () => {
            const updatedItem = await ItemService.updateItem(itemId, {
                priority: ItemPriority.URGENT
            });

            expect(updatedItem).toEqual(
                expect.objectContaining({
                    priority: 'urgent'
                })
            );
        });

        it('updates the quantity of the item with the given id', async () => {
            const updatedItem = await ItemService.updateItem(itemId, {
                quantity: 4
            });

            expect(updatedItem).toEqual(
                expect.objectContaining({
                    quantity: 4
                })
            );
        });

        it('updates the name and category of the item with the given id', async () => {
            const updatedItem = await ItemService.updateItem(itemId, {
                category: ItemCategory.ENGAGEMENT,
                name: 'games'
            });
            expect(updatedItem).toEqual(
                expect.objectContaining({
                    category: 'engagement',
                    name: 'games'
                })
            );
        });

        it('updates the location of the item with the given id', async () => {
            const updatedItem = await ItemService.updateItem(itemId, {
                location: HouseLocation.EASTLAKE
            });
            expect(updatedItem).toEqual(
                expect.objectContaining({
                    location: 'eastlake'
                })
            );
        });

        it('returns undefined if attemmpts to update item  with unknown id', async () => {
            const updatedItem = await ItemService.updateItem(unknownId, {
                category: ItemCategory.ENGAGEMENT,
                name: 'games'
            });

            expect(updatedItem).toBeUndefined();
        });
    });

    describe('deleteItem() method', () => {
        let itemId: string;
        beforeEach(async () => {
            const games = await ItemService.createItem({
                clientId,
                category: ItemCategory.ENGAGEMENT,
                name: 'games',
                location: HouseLocation.AURORA_HOUSE,
                requestorId: userId
            });

            itemId = games?.id as string;
        });

        it('deletes the item with the given id', async () => {
            const item = await ItemService.deleteItem(itemId);

            expect(item).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'engagement',
                    name: 'games',
                    submittedBy: expect.any(User)
                })
            );

            const items = await ItemService.getAllItems();
            expect(items).toHaveLength(0);
        });
    });
});
