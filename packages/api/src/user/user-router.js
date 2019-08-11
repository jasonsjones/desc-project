import express from 'express';
import * as UserController from './user-controller';
import * as AuthUtils from '../auth/auth-utils';

export default () => {
    let userRouter = express.Router();
    userRouter
        .route('/')
        .get((req, res) => {
            UserController.getUsers()
                .then(users => {
                    res.json({
                        success: true,
                        message: 'users fetched',
                        payload: { users }
                    });
                })
                .catch(err =>
                    res.json({
                        success: false,
                        message: err.message,
                        error: err
                    })
                );
        })
        .post((req, res, next) => {
            UserController.createUser(req.body)
                .then(user => {
                    req.user = user;
                    req.login(user, err => {
                        if (err) {
                            return next(err);
                        }
                        return res.json({
                            success: true,
                            message: 'user created',
                            payload: {
                                user: user.toClientJSON(),
                                token: AuthUtils.generateToken(user)
                            }
                        });
                    });
                })
                .catch(err =>
                    res.json({
                        success: false,
                        message: err.message,
                        error: err
                    })
                );
        });

    userRouter
        .route('/:id([0-9a-zA-Z]{24})')
        .get((req, res) => {
            UserController.getUser(req.params.id)
                .then(user =>
                    res.json({
                        success: true,
                        message: 'user fetched',
                        payload: { user }
                    })
                )
                .catch(err =>
                    res.json({
                        success: false,
                        message: err.message,
                        error: err
                    })
                );
        })
        .put((req, res) => {
            UserController.updateUser(req.params.id, req.body)
                .then(user =>
                    res.json({
                        success: true,
                        message: 'user updated',
                        payload: { user }
                    })
                )
                .catch(err =>
                    res.json({
                        success: false,
                        message: err.message,
                        error: err
                    })
                );
        })
        .delete((req, res) => {
            UserController.deleteUser(req.params.id)
                .then(user =>
                    res.json({
                        success: true,
                        message: 'user deleted',
                        payload: { user }
                    })
                )
                .catch(err =>
                    res.json({
                        success: false,
                        message: err.message,
                        error: err
                    })
                );
        });

    userRouter.route('/me').get(async (req, res) => {
        let payload = null;
        if (req.user) {
            const user = await UserController.getUser(req.user.id);
            if (user) {
                const token = AuthUtils.generateToken(user);
                payload = { user: user.toClientJSON(), token };
            }
        } else {
            payload = {
                user: null,
                token: ''
            };
        }
        return res.json({
            success: true,
            message: 'auth user endpoint',
            payload
        });
    });

    return userRouter;
};
