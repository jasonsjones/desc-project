import ItemService from '../ItemService';
import { createPostgresConnection, closeConnection } from '../../config/database';
import User from '../../entity/User';
import Item from '../../entity/Item';
import { getRepository } from 'typeorm';
import { EngagementItem } from '../../entity/EngagementItem';
import { HouseholdItem } from '../../entity/HouseholdItem';
import { ItemCategory } from '../types';
import UserService from '../../user/UserService';
import TestClient from '../../testUtils/TestClient';

describe('Item service', () => {
    let userId: string;
    beforeAll(async () => {
        await createPostgresConnection();
        userId = (await UserService.createUser('Test', 'User', 'test@desc.org', '123456')).id;
    });

    afterEach(async () => {
        const itemRepository = await getRepository(Item);
        await itemRepository.clear();
    });

    afterAll(async () => {
        await TestClient.deleteUserByEmail('test@desc.org');

        await closeConnection();
    });

    it('creates a new engagement item', async () => {
        const itemName = 'games';
        const item = (await ItemService.createItem(ItemCategory.ENGAGEMENT, {
            name: itemName,
            requestorId: userId
        })) as EngagementItem;

        expect(item).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                submittedBy: expect.any(User),
                name: itemName
            })
        );
    });

    it('creates a new household item', async () => {
        const item = (await ItemService.createItem(ItemCategory.HOUSEHOLD, {
            name: 'bedding',
            requestorId: userId
        })) as HouseholdItem;

        expect(item).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                submittedBy: expect.any(User),
                name: 'bedding'
            })
        );
    });

    it('does not create a new item if the requestor is not found', async () => {
        const unkownUserId = '4a29f793-ad0f-4388-9a40-0c0423c5b78c';
        const item = (await ItemService.createItem(ItemCategory.HOUSEHOLD, {
            name: 'bedding',
            requestorId: unkownUserId
        })) as HouseholdItem;

        expect(item).toBeUndefined();
    });
});
