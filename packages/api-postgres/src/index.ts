import app from './config/app';
import config from './config/config';

process.env.TZ = 'UTC';

const startApp = (): void => {
    app.listen(config.port, () =>
        console.log(`express server running at ${config.baseUrl}:${config.port}`)
    );
};

startApp();
