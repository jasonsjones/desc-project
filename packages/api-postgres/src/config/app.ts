import express from 'express';
import bodyParser from 'body-parser';
import IndexRouter from '../index/IndexRouter';
import UserRouter from '../user/UserRouter';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', IndexRouter.getRouter());
app.use('/api/users', UserRouter.getRouter());

export default app;
