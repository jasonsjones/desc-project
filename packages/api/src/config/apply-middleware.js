import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};

export default (app, passport) => {
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cors(corsOptions));
    app.use(passport.initialize());

    if (config.env === 'development') {
        app.use(morgan('dev'));
    } else if (config.env == 'production') {
        app.use(morgan('combined'));
    }
};
