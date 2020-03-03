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
}

export default UserController;
