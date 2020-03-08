import { Request, Response, NextFunction } from 'express';
import AuthUtils from './AuthUtils';
import User from '../entity/User';
import UserService from '../user/UserService';

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

    static async me(req: Request, res: Response): Promise<Response> {
        let payload = null;
        const reqUser = req.user as User;
        if (reqUser) {
            const user: User = (await UserService.getUserById(reqUser.id)) as User;
            if (user) {
                res.cookie('qid', AuthUtils.createRefreshToken(user), { httpOnly: true });
                const token = AuthUtils.createAccessToken(user);
                payload = {
                    user,
                    token
                };
            }
        } else {
            payload = {
                user: null,
                token: ''
            };
        }

        return res.json({
            successs: true,
            message: 'authenticated user',
            payload
        });
    }

    static processToken = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
        const { token, refreshToken } = AuthController.getTokens(req);
        let user: User;
        if (token && refreshToken) {
            try {
                const decoded: any = AuthUtils.verifyAccessToken(token);
                if (decoded) {
                    user = (await UserService.getUserById(decoded.sub)) as User;
                    req.user = user;
                } else {
                    req.user = undefined;
                }
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    const decodedRefreshToken: any = AuthUtils.verifyRefreshToken(refreshToken);
                    if (decodedRefreshToken) {
                        user = (await UserService.getUserById(decodedRefreshToken.sub)) as User;
                        if (user && decodedRefreshToken.version === user.refreshTokenVersion) {
                            req.user = user;
                        } else {
                            req.user = undefined;
                        }
                    }
                }
            }
        } else {
            req.user = undefined;
        }
        next();
    };

    private static getTokens = (req: Request): { token: string; refreshToken: string } => {
        let bearerToken = null;
        if (req.headers.authorization) {
            bearerToken = req.headers.authorization.split(' ')[1];
        }

        const token = bearerToken as string;
        const refreshToken = req.cookies && req.cookies['qid'];

        return {
            token,
            refreshToken
        };
    };
}

export default AuthController;
