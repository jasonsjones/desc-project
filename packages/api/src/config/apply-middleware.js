import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';
import { verifyToken } from '../auth/auth-utils';

const getTokens = req => {
    let bearerToken = null;
    if (req.headers.authorization) {
        bearerToken = req.headers.authorization.split(' ')[1];
    }

    const token = bearerToken || req.cookies['access-token'];
    const refreshToken = req.cookies['refresh-token'];

    return {
        token,
        refreshToken
    };
};

const processToken = (req, res, next) => {
    const { token } = getTokens(req);
    if (token) {
        try {
            const decoded = verifyToken(token);
            if (decoded) {
                req.user = {
                    id: decoded.sub,
                    email: decoded.email
                };
            }
        } catch (err) {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
};

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};

export default (app, passport) => {
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(cors(corsOptions));
    app.use(passport.initialize());
    app.use(processToken);

    if (config.env === 'development') {
        app.use(morgan('dev'));
    } else if (config.env == 'production') {
        app.use(morgan('combined'));
    }
};
