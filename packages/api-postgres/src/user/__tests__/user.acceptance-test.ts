import { getRepository } from 'typeorm';
import User, { Program } from '../../entity/User';
import TestClient from '../../testUtils/TestClient';
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
            const userRepository = getRepository(User);
            await userRepository.clear();
        });

        it('POST request method creates a new user', async () => {
            const client = new TestClient();
            const response = await client.creatUserViaAPI({
                firstName: 'Oliver',
                lastName: 'Queen',
                email: 'oliver@qc.com',
                password: '123456',
                program: Program.SURVIVAL
            });

            expect(response.body).toEqual(
                expect.objectContaining({
                    success: expect.any(Boolean),
                    message: expect.any(String),
                    payload: expect.any(Object)
                })
            );
            expect(response.body.payload).toHaveProperty('user');
        });

        it('GET request method fetches all users', async () => {
            const client = new TestClient();
            const response = await client.getAllUsers();
            expect(response.body).toEqual(
                expect.objectContaining({
                    success: expect.any(Boolean),
                    message: expect.any(String),
                    payload: expect.any(Object)
                })
            );
            expect(response.body.payload).toHaveProperty('users');
            expect(response.body.payload.users).toHaveLength(1);
        });
    });

    describe('/api/user/:id route', () => {
        let userId: string;

        beforeEach(async () => {
            const client = new TestClient();
            const user = await client.createTestUser({
                firstName: 'Oliver',
                lastName: 'Queen',
                email: 'oliver@qc.com',
                password: '123456',
                program: Program.SURVIVAL
            });
            userId = user.id;
        });

        afterEach(async () => {
            const userRepository = getRepository(User);
            await userRepository.clear();
        });

        it('GET request method fetches the user with the given id', async () => {
            const client = new TestClient();
            const response = await client.getUser(userId);

            expect(response.body).toEqual(
                expect.objectContaining({
                    success: expect.any(Boolean),
                    message: expect.any(String),
                    payload: expect.any(Object)
                })
            );
            expect(response.body.payload).toHaveProperty('user');
        });

        it('PATCH request method updates the user with the given id with the provided data', async () => {
            const client = new TestClient();
            const response = await client.updateUser(userId, { firstName: 'Ollie' });

            expect(response.body).toEqual(
                expect.objectContaining({
                    success: expect.any(Boolean),
                    message: expect.any(String),
                    payload: expect.any(Object)
                })
            );
            expect(response.body.payload).toHaveProperty('user');
        });

        it('DELETE request method deletes the user with the given id', async () => {
            const client = new TestClient();
            const response = await client.deleteUser(userId);

            expect(response.body).toEqual(
                expect.objectContaining({
                    success: expect.any(Boolean),
                    message: expect.any(String),
                    payload: expect.any(Object)
                })
            );
            expect(response.body.payload).toHaveProperty('user');

            const verify = await client.getAllUsers();
            expect(verify.body.payload.users).toHaveLength(0);
        });
    });
});
