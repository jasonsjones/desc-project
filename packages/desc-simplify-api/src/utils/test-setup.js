import debug from 'debug';
import config from '../config/config';

const log = debug('test');

export default () => {
    before(() => {
        log(`Running in ${config.env} mode`);
    });
};
