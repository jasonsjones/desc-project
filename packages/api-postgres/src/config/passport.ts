import User from '../entity/User';
import LocalStrategy from './strategies/local';
import UserService from '../user/UserService';
import { PassportStatic } from 'passport';

export const passportConfig = (passport: PassportStatic): void => {
    passport.serializeUser((user: User, done: (err: any, id?: any) => void) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: string, done: (err: any, user?: User) => void) => {
        return UserService.getUserById(id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
            })
            .catch(err => done(err));
    });
    passport.use('local', LocalStrategy);
};
