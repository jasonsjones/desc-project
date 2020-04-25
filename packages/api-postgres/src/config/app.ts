import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import passport from 'passport';
import { passportConfig } from './passport';
import IndexRouter from '../index/IndexRouter';
import AuthRouter from '../auth/AuthRouter';
import UserRouter from '../user/UserRouter';
import AuthController from '../auth/AuthController';
import ItemRouter from '../item/ItemRouter';
import ClientRequestRouter from '../clientRequest/ClientRequestRouter';

const app = express();

passportConfig(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:4200'], credentials: true }));
app.use(passport.initialize());

app.use(AuthController.processToken);

app.use('/', IndexRouter.getRouter());
app.use('/api/auth', AuthRouter.getRouter(passport));
app.use('/api/users', UserRouter.getRouter());
app.use('/api/items', ItemRouter.getRouter());
app.use('/api/clientrequests', ClientRequestRouter.getRouter());

export default app;
