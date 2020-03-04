import express from 'express';
import UserController from './UserController';

class UserRouter {
    private static router = express.Router();
    static getRouter(): express.Router {
        UserRouter.defineRoutes();
        return UserRouter.router;
    }

    private static defineRoutes(): void {
        UserRouter.router
            .route('/')
            .post(UserController.createUser)
            .get(UserController.getAllUsers);

        UserRouter.router
            .route('/:id')
            .get(UserController.getUser)
            .patch(UserController.updateUser);
    }
}

export default UserRouter;
