import TestClient from '../../testUtils/TestClient';
import TestUtils from '../../testUtils/TestUtilities';
import { createPostgresConnection, closeConnection } from '../../config/database';
import { Program } from '../../entity/User';
import { ItemData, ItemCategory, HouseLocation } from '../../item/types';

describe('ClientRequest route acceptance tests', () => {
    const clientId = '123456789';
    let userId: string;
    let client: TestClient;
    let item1: ItemData;
    let item2: ItemData;

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

        item1 = {
            clientId,
            category: ItemCategory.HOUSEHOLD,
            name: 'pillows',
            quantity: 2,
            location: HouseLocation.RAINIER_HOUSE,
            requestorId: userId
        };

        item2 = {
            clientId,
            category: ItemCategory.ENGAGEMENT,
            name: 'games',
            location: HouseLocation.AURORA_HOUSE,
            requestorId: userId,
            note: 'Board games are perfect'
        };
    });

    afterEach(async () => {
        await TestUtils.dropNotes();
        await TestUtils.dropItems();
        await TestUtils.dropClientRequests();
    });

    afterAll(async () => {
        await TestUtils.dropUsers();
        await closeConnection();
    });

    describe('/api/clientrequests route', () => {
        describe('POST request method', () => {
            it('creates a new client reqeust', async () => {
                const response = await client.createClientRequest({
                    clientId,
                    requestorId: userId,
                    items: [item1, item2]
                });

                expect(response.status).toBe(201);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        message: 'client request created',
                        payload: expect.objectContaining({
                            clientRequest: expect.any(Object)
                        })
                    })
                );
            });

            it('creates a new client reqeust without items', async () => {
                const response = await client.createClientRequest({
                    clientId,
                    requestorId: userId
                });

                expect(response.status).toBe(201);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        message: 'client request created',
                        payload: expect.objectContaining({
                            clientRequest: expect.any(Object)
                        })
                    })
                );
            });

            it('responds with error if clientId is not provided', async () => {
                const response = await client.createClientRequest({
                    requestorId: userId,
                    items: [item1, item2]
                });

                expect(response.status).toBe(200);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        message: 'error creating client request',
                        payload: expect.objectContaining({
                            error: expect.any(String),
                            clientRequest: null
                        })
                    })
                );
            });

            it('responds with error if requestorId is not provided', async () => {
                const response = await client.createClientRequest({
                    clientId,
                    items: [item1, item2]
                });

                expect(response.status).toBe(200);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        message: 'error creating client request',
                        payload: expect.objectContaining({
                            error: expect.any(String),
                            clientRequest: null
                        })
                    })
                );
            });

            it('responds with error if requestorId is not found', async () => {
                const badId = '80453b6b-d1af-4142-903b-3ba9f92e7f39';
                const response = await client.createClientRequest({
                    clientId,
                    requestorId: badId,
                    items: [item1, item2]
                });

                expect(response.status).toBe(200);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        message: 'error creating client request',
                        payload: expect.objectContaining({
                            error: expect.any(String),
                            clientRequest: null
                        })
                    })
                );
            });
        });
    });
});
