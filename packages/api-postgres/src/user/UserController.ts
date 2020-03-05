import { Request, Response } from 'express';
import UserService from './UserService';

class UserController {
    static createUser(req: Request, res: Response): Promise<Response> {
        const { firstName, lastName, email, password } = req.body;

        return UserService.createUser(firstName, lastName, email, password).then(user => {
            return res.json({
                success: true,
                message: 'user created',
                payload: { user }
            });
        });
    }

    static getAllUsers(_: Request, res: Response): Promise<Response> {
        return UserService.getAllUsers().then(users => {
            return res.json({
                success: true,
                message: 'all users fetched',
                payload: { users }
            });
        });
    }

    static getUser(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        return UserService.getUserById(id).then(user => {
            return res.json({
                success: true,
                message: 'user fetched',
                payload: { user }
            });
        });
    }

    static updateUser(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const data = req.body as { firstName: string; lastName: string; email: string };
        return UserService.updateUser(id, data).then(updatedUser => {
            return res.json({
                success: true,
                message: 'user updated',
                payload: { user: updatedUser }
            });
        });
    }

    static deleteUser(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        return UserService.deleteUser(id).then(deletedUser => {
            return res.json({
                success: true,
                message: 'user deleted',
                payload: { user: deletedUser }
            });
        });
    }
}

export default UserController;
