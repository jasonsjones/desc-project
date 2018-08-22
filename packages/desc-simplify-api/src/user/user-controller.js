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

export const getUser = id => {
    if (!id) {
        return Promise.reject(new Error('id paramater is required'));
    }
    return User.findById(id).exec();
};

export const updateUser = (id, userData = {}) => {
    if (!id) {
        return Promise.reject(new Error('id paramater is required'));
    }
    return User.findByIdAndUpdate(id, userData, { new: true }).exec();
};

export const deleteUser = id => {
    if (!id) {
        return Promise.reject(new Error('id paramater is required'));
    }
    return User.findByIdAndRemove(id).exec();
};
