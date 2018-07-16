import express from 'express';
import morgan from 'morgan';
import debug from 'debug';

import config from './config';
import applyMiddleware from './apply-middleware';
import attachRouters from './attach-routers';

const app = express();
const log = debug('app');
log(`app starting up in ${config.env} mode`);

app.set('view engine', 'ejs');

applyMiddleware(app);
attachRouters(app);

export default app;
