import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from './config';

export default (app, passport) => {
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(passport.initialize());

    if (config.env !== 'testing') {
        app.use(morgan('dev'));
    }
};
