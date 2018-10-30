import express from 'express';
import * as AuthUtils from './auth-utils';

export default passport => {
    let authRouter = express.Router();

    authRouter.post('/login', passport.authenticate('local'), (req, res) => {
        const user = req.user;
        req.session.user = req.user;
        res.json({
            success: true,
            message: 'user authenticated',
            payload: {
                user,
                token: AuthUtils.generateToken(user)
            }
        });
    });

    authRouter.get('/logout', (req, res) => {
        req.session.destroy(() => {
            req.logout();
            res.json({
                success: true,
                message: 'user logged out',
                payload: null
            });
        });
    });

    return authRouter;
};
