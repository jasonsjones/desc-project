import ItemService from '../ItemService';
import { createPostgresConnection, closeConnection } from '../../config/database';
import User, { Program } from '../../entity/User';
import Item from '../../entity/Item';
import { getRepository } from 'typeorm';
import { ItemCategory, ItemPriority } from '../types';
import UserService from '../../user/UserService';
import TestUtils from '../../testUtils/TestUtilities';

describe('Item service', () => {
    let userId: string;
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
                category: ItemCategory.ENGAGEMENT,
                name: itemName,
                requestorId: userId
            });

            expect(item).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'engagement',
                    priority: 'standard',
                    quantity: 1,
                    name: itemName,
                    submittedBy: expect.any(User)
                })
            );
        });

        it('creates a new household item', async () => {
            const item = await ItemService.createItem({
                category: ItemCategory.HOUSEHOLD,
                name: 'pillows',
                quantity: 2,
                requestorId: userId
            });

            expect(item).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'household',
                    priority: 'standard',
                    quantity: 2,
                    name: 'pillows',
                    submittedBy: expect.any(User)
                })
            );
        });

        it('creates a new urgent household item', async () => {
            const item = await ItemService.createItem({
                category: ItemCategory.HOUSEHOLD,
                name: 'pillows',
                priority: ItemPriority.URGENT,
                quantity: 2,
                requestorId: userId
            });

            expect(item).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    category: 'household',
                    name: 'pillows',
                    priority: 'urgent',
                    quantity: 2,
                    submittedBy: expect.any(User)
                })
            );
        });

        it('does not create a new item if the requestor is not found', async () => {
            const unkownUserId = '4a29f793-ad0f-4388-9a40-0c0423c5b78c';
            const item = await ItemService.createItem({
                category: ItemCategory.HOUSEHOLD,
                name: 'bedding',
                requestorId: unkownUserId
            });

            expect(item).toBeUndefined();
        });
    });

    describe('getAllItems() method', () => {
        beforeEach(async () => {
            await ItemService.createItem({
                category: ItemCategory.ENGAGEMENT,
                name: 'games',
                requestorId: userId
            });
            await ItemService.createItem({
                category: ItemCategory.HOUSEHOLD,
                name: 'bedding',
                quantity: 2,
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
                    submittedBy: expect.any(User)
                })
            );
        });
    });

    describe('getItemById() method', () => {
        let itemId: string;
        beforeEach(async () => {
            const games = await ItemService.createItem({
                category: ItemCategory.ENGAGEMENT,
                name: 'games',
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
                    submittedBy: expect.any(User)
                })
            );
        });

        it('returns undefined if the item with the given id is not found', async () => {
            const badId = '80453b6b-d1af-4142-903b-3ba9f92e7f39';
            const item = await ItemService.getItemById(badId);
            expect(item).toBeUndefined();
        });
    });

    describe('deleteItem() method', () => {
        let itemId: string;
        beforeEach(async () => {
            const games = await ItemService.createItem({
                category: ItemCategory.ENGAGEMENT,
                name: 'games',
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
