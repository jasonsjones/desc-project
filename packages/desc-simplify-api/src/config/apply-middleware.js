import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export default (app, passport) => {
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(passport.initialize());
};
