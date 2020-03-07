import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import passport from 'passport';
import { passportConfig } from './passport';
import IndexRouter from '../index/IndexRouter';
import AuthRouter from '../auth/AuthRouter';
import UserRouter from '../user/UserRouter';

const app = express();

passportConfig(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true }));
app.use(passport.initialize());

app.use('/', IndexRouter.getRouter());
app.use('/api/auth', AuthRouter.getRouter(passport));
app.use('/api/users', UserRouter.getRouter());

export default app;
