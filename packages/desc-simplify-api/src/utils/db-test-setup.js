import debug from 'debug';

import config from '../config/config';
import db from '../config/db';

const log = debug('test');
const dbConnection = db(config);

before(() => {
    log(`Running in ${config.env} mode`);
});

after(() => {
    dbConnection.close();
});
