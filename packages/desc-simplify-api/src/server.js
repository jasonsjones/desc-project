import debug from 'debug';

import app from './config/app';
import config from './config/config';

const log = debug('app');

app.listen(config.port, () => {
    log(`node server running at http://localhost:${config.port}`);
});
