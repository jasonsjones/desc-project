import TestClient from '../../testUtils/TestClient';
import { Program } from '../../entity/User';
import { createPostgresConnection, closeConnection } from '../../config/database';
import { ItemPriority } from '../types';

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
        TestClient.dropItems();
    });

    afterAll(async () => {
        await TestClient.dropUsers();
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

                expect(response.status).toBe(201);
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

            it('creates a new urgent item', async () => {
                const response = await client.createItem({
                    category: 'engagement',
                    name: 'games',
                    priority: ItemPriority.URGENT,
                    requestorId: userId
                });

                expect(response.status).toBe(201);
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

    describe('api/items/:id route', () => {
        let itemId: string;
        beforeEach(async () => {
            await client.createItem({
                category: 'engagement',
                name: 'games',
                requestorId: userId
            });
            const response = await client.createItem({
                category: 'household',
                name: 'pillows',
                requestorId: userId
            });
            itemId = response.body.payload.item.id;
        });

        describe('GET request method', () => {
            it('fetches the item with the given id', async () => {
                const response = await client.getItem(itemId);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        message: 'item fetched',
                        payload: expect.objectContaining({
                            item: expect.any(Object)
                        })
                    })
                );
            });

            it('fetches the item with requestor data sanitized', async () => {
                const response = await client.getItem(itemId);
                expect(response.body.payload.item.submittedBy.password).not.toBeDefined();
            });

            it('with invalid item id returns a null item in the payload', async () => {
                const badId = '80453b6b-d1af-4142-903b-3ba9f92e7f39';
                const response = await client.getItem(badId);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        message: 'item not found',
                        payload: expect.objectContaining({
                            item: null
                        })
                    })
                );
            });
        });

        describe('DELETE request method', () => {
            it('deletes the item with the given id', async () => {
                const response = await client.deleteItem(itemId);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        message: 'item deleted',
                        payload: expect.objectContaining({
                            item: expect.any(Object)
                        })
                    })
                );
            });

            it('deletes the item and returns with requestor data sanitized', async () => {
                const response = await client.deleteItem(itemId);
                expect(response.body.payload.item.submittedBy.password).not.toBeDefined();
            });

            it('with invalid item id returns a null item in the payload', async () => {
                const badId = '80453b6b-d1af-4142-903b-3ba9f92e7f39';
                const response = await client.deleteItem(badId);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        message: 'item not found',
                        payload: expect.objectContaining({
                            item: null
                        })
                    })
                );
            });
        });
    });
});
