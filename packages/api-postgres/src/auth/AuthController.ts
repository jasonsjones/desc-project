import { Request, Response } from 'express';
import AuthUtils from './AuthUtils';
import User from '../entity/User';

class AuthController {
    static login(req: Request, res: Response): Response {
        const user = req.user as User;

        res.cookie('qid', AuthUtils.createRefreshToken(user), { httpOnly: true });
        const token = AuthUtils.createAccessToken(user);

        return res.json({
            success: true,
            message: 'user authenticated',
            payload: {
                user,
                token
            }
        });
    }
}

export default AuthController;
