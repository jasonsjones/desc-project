import { Request, Response, NextFunction } from 'express';
import AuthUtils from './AuthUtils';
import User from '../entity/User';
import UserService from '../user/UserService';

class AuthController {
    static login(req: Request, res: Response): Response {
        const user = req.user as User;

        res.cookie('qid', AuthUtils.createRefreshToken(user), { httpOnly: true });
        const accessToken = AuthUtils.createAccessToken(user);

        return res.json({
            success: true,
            message: 'user authenticated',
            payload: {
                user: user.toClientJSON(),
                accessToken
            }
        });
    }

    static async getRefreshToken(req: Request, res: Response): Promise<Response> {
        const currentToken = req.cookies['qid'];

        if (!currentToken) {
            return AuthController.sendEmptyAccessToken(res);
        }

        let user: User;
        try {
            const tokenPayload: any = AuthUtils.verifyRefreshToken(currentToken);
            user = (await UserService.getUserById(tokenPayload.sub)) as User;
            if (!user) {
                return AuthController.sendEmptyAccessToken(res);
            }

            if (user && tokenPayload.version === user.refreshTokenVersion) {
                res.cookie('qid', AuthUtils.createRefreshToken(user), { httpOnly: true });
                return res.json({
                    success: true,
                    message: 'new access token issued',
                    payload: {
                        accessToken: AuthUtils.createAccessToken(user)
                    }
                });
            }
        } catch (err) {
            return AuthController.sendEmptyAccessToken(res);
        }

        return res.json({
            success: false,
            message: 'unable to issue new access token',
            payload: null
        });
    }

    // Middleware methods and utilities

    static processToken = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
        const { token, refreshToken } = AuthController.getTokens(req);
        if (token && refreshToken) {
            try {
                const decoded: any = AuthUtils.verifyAccessToken(token);
                if (decoded) {
                    req.user = {
                        id: decoded.sub,
                        email: decoded.email
                    };
                } else {
                    req.user = undefined;
                }
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    console.log('access token is expired.');
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

    private static sendEmptyAccessToken = (res: Response): Response => {
        return res.json({
            success: true,
            message: 'new access token requested.',
            payload: {
                accessToken: ''
            }
        });
    };
}

export default AuthController;