import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import User, { Program } from '../entity/User';

interface UpdatableUserFields {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export default class UserService {
    static async createUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        program?: Program
    ): Promise<User> {
        const saltLength = process.env.NODE_ENV === 'testing' ? 4 : 12;
        const hashedPassword = await bcrypt.hash(password, saltLength);
        const user = User.create({ firstName, lastName, email, password: hashedPassword, program });
        user.emailVerificationToken = v4();
        return user.save();
    }

    static getAllUsers(): Promise<User[]> {
        return User.find();
    }

    static getUserById(id: string): Promise<User | undefined> {
        return User.findOne({ where: { id } });
    }

    static getUserByEmail(email: string): Promise<User | undefined> {
        return User.findOne({ where: { email } });
    }

    static async updateUser(id: string, data: UpdatableUserFields): Promise<User | undefined> {
        await User.update({ id }, data);
        return UserService.getUserById(id);
    }

    static async deleteUser(id: string): Promise<User | undefined> {
        const user = await UserService.getUserById(id);
        await User.delete({ id });
        return user;
    }
}
