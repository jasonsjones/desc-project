import { createPostgresConnection, closeConnection } from '../../config/database';
import UserService from '../../user/UserService';
import { Program } from '../../entity/User';
import TestUtils from '../../testUtils/TestUtilities';
import ItemService from '../../item/ItemService';
import { ItemCategory, HouseLocation } from '../../item/types';
import NoteService from '../NoteService';

describe('Note service', () => {
    let userId: string;
    let itemId: string;

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

        const games = await ItemService.createItem({
            clientId: '967865',
            category: ItemCategory.ENGAGEMENT,
            name: 'games',
            location: HouseLocation.AURORA_HOUSE,
            requestorId: userId
        });

        itemId = games?.id as string;
    });

    afterAll(async () => {
        // order matters
        await TestUtils.dropItems();
        await TestUtils.dropUsers();
        await closeConnection();
    });

    describe('createNote() method', () => {
        afterEach(async () => {
            await TestUtils.dropNotes();
        });

        it('creates a new note', async () => {
            const note = await NoteService.createNote({ body: 'This is a test', userId, itemId });

            expect(note).toEqual(
                expect.objectContaining({
                    id: expect.any(String)
                })
            );
        });

        it('throws error if user id is invalid', async () => {
            const invalidUserId = '5a75038a-05e6-404b-8f5f-8bba3fed11f6';
            try {
                await NoteService.createNote({
                    body: 'This should throw error',
                    userId: invalidUserId,
                    itemId
                });
            } catch (e) {
                expect(e.message).toBe('Invalid user');
            }
        });

        it('throws error if item id is invalid', async () => {
            const invalidItemId = 'ad259d3d-3386-4df1-904f-0218b6f6891c';
            try {
                await NoteService.createNote({
                    body: 'This should throw error',
                    userId,
                    itemId: invalidItemId
                });
            } catch (e) {
                expect(e.message).toBe('Invalid item');
            }
        });
    });
});
