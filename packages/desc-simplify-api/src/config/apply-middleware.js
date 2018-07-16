import express from 'express';
import morgan from 'morgan';

export default app => {
    app.use(express.static('public'));
    app.use(morgan('dev'));
};
