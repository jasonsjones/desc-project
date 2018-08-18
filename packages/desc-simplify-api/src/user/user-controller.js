import User from './user-model';

export const createUser = req => {
    if (!req.body) {
        return Promise.reject(new Error('req.body is required'));
    }
    let newUser = new User(req.body);
    return newUser.save();
};

export const getUsers = () => {
    return User.find({}).exec();
};
