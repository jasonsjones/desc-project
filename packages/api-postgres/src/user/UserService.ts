import bcrypt from 'bcryptjs';
import User from '../entity/User';

export default class UserService {
    static async createUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = User.create({ firstName, lastName, email, password: hashedPassword });
        return user.save();
    }

    static getAllUsers(): Promise<User[]> {
        return User.find();
    }

    static getUserById(id: string): Promise<User | undefined> {
        return User.findOne({ where: { id } });
    }
}
