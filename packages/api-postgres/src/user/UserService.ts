import User from '../entity/User';

export default class UserService {
    static createUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Promise<User> {
        const user = User.create({ firstName, lastName, email, password });
        return user.save();
    }

    static getAllUsers(): Promise<User[]> {
        return User.find();
    }

    static getUserById(id: string): Promise<User | undefined> {
        return User.findOne({ where: { id } });
    }
}
