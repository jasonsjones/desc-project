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

    afterEach(async () => {
        const itemRepository = await getRepository(Item);
        await itemRepository.clear();
    });

    afterAll(async () => {
        await TestClient.deleteUserByEmail('oliver@desc.org');
        await closeConnection();
    });

    describe('/api/items route', () => {
        describe('POST request method', () => {
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

        describe('GET request method', () => {
            beforeEach(async () => {
                await client.createItem({
                    category: 'engagement',
                    name: 'games',
                    requestorId: userId
                });
                await client.createItem({
                    category: 'household',
                    name: 'pillows',
                    requestorId: userId
                });
            });

            it('fetches all the items', async () => {
                const response = await client.getAllItems();

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        message: expect.any(String),
                        payload: expect.objectContaining({
                            items: expect.any(Object)
                        })
                    })
                );
                expect(response.body.payload.items).toHaveLength(2);
            });

            it('includes sanitized user info', async () => {
                const response = await client.getAllItems();
                expect(response.body.payload.items[0].submittedBy.password).not.toBeDefined();
            });
        });
    });
});
