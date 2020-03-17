import TestClient from '../../testUtils/TestClient';
import { Program } from '../../entity/User';
import { createPostgresConnection, closeConnection } from '../../config/database';
import { getRepository } from 'typeorm';
import Item from '../../entity/Item';

describe('Item route acceptance tests', () => {
    let userId: string;
    let client: TestClient;

    beforeAll(async () => {
        client = new TestClient();

        await createPostgresConnection();
        const user = await client.createTestUser({
            firstName: 'Oliver',
            lastName: 'Queen',
            email: 'oliver@desc.org',
            password: '123456',
            program: Program.SURVIVAL
        });
        userId = user.id;
    });

    afterAll(async () => {
        const itemRepository = await getRepository(Item);
        await itemRepository.clear();

        await TestClient.deleteUserByEmail('oliver@desc.org');
        await closeConnection();
    });

    describe('/api/items route', () => {
        it('creates a new item', async () => {
            const response = await client.createItem({
                category: 'engagement',
                name: 'games',
                requestorId: userId
            });

            expect(response.body).toEqual(
                expect.objectContaining({
                    success: true,
                    message: expect.any(String),
                    payload: expect.objectContaining({
                        item: expect.any(Object)
                    })
                })
            );
        });
    });
});
