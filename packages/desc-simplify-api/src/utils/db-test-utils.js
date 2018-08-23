import debug from 'debug';
import config from '../config/config';
import db from '../config/db';

const log = debug('db:collections');

export const dbConnection = db(config);

export const dropCollection = (connection, collectionName) => {
    connection.dropCollection(collectionName, () => {
        log(`dropping '${collectionName}' collection`);
    });
};