import { getRepository } from 'typeorm';
import User from '../../entity/User';
import TestClient from '../../testUtils/TestClient';
import { createPostgresConnection, closeConnection } from '../../config/database';

describe('User route acceptance tests', () => {
    beforeAll(async () => {
        await createPostgresConnection();
    });

    afterAll(async () => {
        await closeConnection();
    });

    afterEach(async () => {
        const userRepository = getRepository(User);
        await userRepository.clear();
    });

    it('POST /api/user creates a new user', async () => {
        const client = new TestClient();
        const response = await client.creatUser({
            firstName: 'Oliver',
            lastName: 'Queen',
            email: 'oliver@qc.com',
            password: '123456'
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

    it('GET /api/user fetches all users', async () => {
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
    });
});
