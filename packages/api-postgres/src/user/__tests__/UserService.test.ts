import { getRepository } from 'typeorm';
import UserService from '../UserService';
import User from '../../entity/User';
import { createPostgresConnection, closeConnection } from '../../config/database';

const testUser = {
    firstName: 'John',
    lastName: 'Diggle',
    email: 'john@qc.com'
};

describe('User service integration tests', () => {
    let userId: string;
    beforeAll(async () => {
        await createPostgresConnection();
    });

    afterAll(async () => {
        const userRepository = await getRepository(User);
        await userRepository.clear();
        await closeConnection();
    });

    describe('createUser method', () => {
        it('creates a new user', async () => {
            const { firstName, lastName, email } = testUser;
            const result = await UserService.createUser(firstName, lastName, email);
            userId = result.id;

            expect(result).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    firstName: expect.any(String),
                    lastName: expect.any(String),
                    email: expect.any(String)
                })
            );
        });
    });

    describe('get[All]User* methods', () => {
        it('getAllUsers() fetches all the users', async () => {
            const result = await UserService.getAllUsers();

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    firstName: expect.any(String),
                    lastName: expect.any(String),
                    email: expect.any(String)
                })
            );
        });

        it('getUserById() fetches the user with the given id', async () => {
            const result = await UserService.getUserById(userId);

            expect(result).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    firstName: expect.any(String),
                    lastName: expect.any(String),
                    email: expect.any(String)
                })
            );
        });
    });
});
