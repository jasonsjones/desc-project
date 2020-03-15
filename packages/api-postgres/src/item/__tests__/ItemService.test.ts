import ItemService from '../ItemService';
import { createPostgresConnection, closeConnection } from '../../config/database';
import Item from '../../entity/Item';
import { getRepository } from 'typeorm';
import { EngagementItem } from '../../entity/EngagementItem';
import { HouseholdItem } from '../../entity/HouseholdItem';
import { ItemCategory } from '../types';

describe('Item service', () => {
    beforeAll(async () => {
        await createPostgresConnection();
    });

    afterEach(async () => {
        const itemRepository = await getRepository(Item);
        await itemRepository.clear();
    });

    afterAll(async () => {
        await closeConnection();
    });

    it('creates a new engagement item', async () => {
        const itemName = 'games';
        const item = (await ItemService.createItem(ItemCategory.ENGAGEMENT, {
            name: itemName
        })) as EngagementItem;

        expect(item).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: itemName
            })
        );
    });

    it('creates a new household item', async () => {
        const item = (await ItemService.createItem(ItemCategory.HOUSEHOLD, {
            name: 'bedding'
        })) as HouseholdItem;

        expect(item).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: 'bedding'
            })
        );
    });
});
