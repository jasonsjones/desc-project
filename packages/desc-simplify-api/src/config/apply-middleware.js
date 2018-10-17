import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';
import FileStoreFactory from 'session-file-store';

import config from './config';
import { generateRandomToken } from '../auth/auth-utils';

const FileStore = FileStoreFactory(session);

const getSessionFilePath = () => {
    if (config.env === 'testing') {
        return { path: './test-sessions' };
    }
};

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};

const sessionOptions = {
    genid: () => generateRandomToken(),
    store: new FileStore(Object.assign({}, { retries: 2 }, getSessionFilePath())),
    cookie: {
        secure: false
    },
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true
};

export default (app, passport) => {
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(passport.initialize());
    app.use(cors(corsOptions));
    app.use(session(sessionOptions));

    if (config.env === 'development') {
        app.use(morgan('dev'));
    } else if (config.env == 'production') {
        app.use(morgan('combined'));
    }
};
