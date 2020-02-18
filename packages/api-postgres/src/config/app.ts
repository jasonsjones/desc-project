import express from 'express';
import IndexRouter from '../index/IndexRouter';

const app = express();
app.use('/', IndexRouter.getRouter());

export default app;
