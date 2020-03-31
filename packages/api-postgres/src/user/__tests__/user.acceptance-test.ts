import { Program } from '../../entity/User';
import TestClient from '../../testUtils/TestClient';
import TestUtils from '../../testUtils/TestUtilities';
import { createPostgresConnection, closeConnection } from '../../config/database';

describe('User route acceptance tests', () => {
    beforeAll(async () => {
        await createPostgresConnection();
    });

    afterAll(async () => {
        await closeConnection();
    });

    describe('/api/user route', () => {
        afterAll(async () => {
            await TestUtils.dropUsers();
        });

        it('POST request method creates a new user', async () => {
            const client = new TestClient();
            const response = await client.creatUserViaAPI({
                firstName: 'Oliver',
                lastName: 'Queen',
                email: 'oliver@desc.org',
                password: '123456',
                program: Program.SURVIVAL
            });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(
                expect.objectContaining({
                    success: true,
                    message: expect.any(String),
                    payload: expect.objectContaining({
                        // user: expect.any(Object)
                        user: expect.objectContaining({
                            id: expect.any(String),
                            firstName: 'Oliver',
                            lastName: 'Queen',
                            email: 'oliver@desc.org',
                            program: expect.any(String)
                        })
                    })
                })
            );
        });

        it('GET request method fetches all users', async () => {
            const client = new TestClient();
            const response = await client.getAllUsers();
            expect(response.body).toEqual(
                expect.objectContaining({
                    success: true,
                    message: expect.any(String),
                    payload: expect.objectContaining({
                        users: expect.arrayContaining([expect.any(Object)])
                    })
                })
            );
            expect(response.body.payload.users).toHaveLength(1);
        });
    });

    describe('/api/user/:id route', () => {
        let userId: string;
        let client: TestClient;
        const unknownId = '9ff6515e-814a-4d1c-bc27-9a768c4aa242';

        beforeEach(async () => {
            client = new TestClient();
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
            await TestUtils.dropUsers();
        });

        describe('GET request method', () => {
            it('fetches the user with the given id', async () => {
                const response = await client.getUser(userId);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        message: expect.any(String),
                        payload: expect.objectContaining({
                            user: expect.any(Object)
                        })
                    })
                );
            });

            it('with invalid user id returns a null user in the payload', async () => {
                const response = await client.getUser(unknownId);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        message: expect.any(String),
                        payload: expect.objectContaining({
                            user: null
                        })
                    })
                );
            });
        });

        describe('PATCH request method', () => {
            it('updates the user with the given id', async () => {
                const response = await client.updateUser(userId, { firstName: 'Ollie' });

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        message: expect.any(String),
                        payload: expect.objectContaining({
                            user: expect.any(Object)
                        })
                    })
                );
            });

            it('with invalid user id returns a null user in the payload', async () => {
                const response = await client.updateUser(unknownId, { firstName: 'Ollie' });

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        message: expect.any(String),
                        payload: expect.objectContaining({
                            user: null
                        })
                    })
                );
            });
        });

        describe('DELETE request method', () => {
            it('deletes the user with the given id', async () => {
                const response = await client.deleteUser(userId);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        message: expect.any(String),
                        payload: expect.objectContaining({
                            user: expect.any(Object)
                        })
                    })
                );

                const verificatonResponse = await client.getAllUsers();
                expect(verificatonResponse.body.payload.users).toHaveLength(0);
            });

            it('with invalid user id returns a null user in the payload', async () => {
                const response = await client.deleteUser(unknownId);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                        message: expect.any(String),
                        payload: expect.objectContaining({
                            user: null
                        })
                    })
                );

                const verificationResponse = await client.getAllUsers();
                expect(verificationResponse.body.payload.users).toHaveLength(1);
            });
        });
    });
});
