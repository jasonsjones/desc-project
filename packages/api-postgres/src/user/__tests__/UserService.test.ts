import { getRepository } from 'typeorm';
import UserService from '../UserService';
import User from '../../entity/User';
import { createPostgresConnection, closeConnection } from '../../config/database';

const getUserShapeToVerify = (): {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    fullName: string;
    emailVerificationToken: string;
    isEmailVerified: boolean;
    resetTokenVersion: number;
    passwordResetToken: string;
    passwordResetTokenExpiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
} => {
    return {
        id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        fullName: expect.any(String),
        emailVerificationToken: expect.any(String),
        isEmailVerified: expect.any(Boolean),
        resetTokenVersion: expect.any(Number),
        passwordResetToken: expect.any(String),
        passwordResetTokenExpiresAt: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    };
};

const testUser = {
    firstName: 'John',
    lastName: 'Diggle',
    email: 'john@qc.com',
    password: '123456'
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
            const { firstName, lastName, email, password } = testUser;
            const result = await UserService.createUser(firstName, lastName, email, password);
            userId = result.id;

            expect(result).toEqual(expect.objectContaining(getUserShapeToVerify()));
            expect(result.password).not.toEqual(testUser.password);
        });
    });

    describe('get[All]User* methods', () => {
        it('getAllUsers() fetches all the users', async () => {
            const result = await UserService.getAllUsers();

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(expect.objectContaining(getUserShapeToVerify()));
        });

        it('getUserById() fetches the user with the given id', async () => {
            const result = await UserService.getUserById(userId);

            expect(result).toEqual(expect.objectContaining(getUserShapeToVerify()));
        });
    });
});
