import express from 'express';
import config from './config';

const app = express();

app.get('/', (_, res): void => {
    res.json({
        success: true,
        message: 'api endpoint is not here',
        url: 'http://localhost:3001/api'
    });
});

app.get('/api', (_, res): void => {
    res.json({
        name: config.name,
        version: config.version
    });
});

export default app;
