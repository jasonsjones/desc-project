import jwt from 'jsonwebtoken';
import User from '../entity/User';

class AuthUtils {
    static createAccessToken = (user: User): string => {
        const token = jwt.sign(
            {
                sub: user.id,
                email: user.email
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '2m' }
        );
        return token;
    };

    static createRefreshToken = (user: User): string => {
        const token = jwt.sign(
            {
                sub: user.id,
                email: user.email,
                version: user.refreshTokenVersion
            },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '7d' }
        );
        return token;
    };

    static verifyAccessToken = (token: string): string | object => {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    };

    static verifyRefreshToken = (token: string): string | object => {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
    };
}

export default AuthUtils;
