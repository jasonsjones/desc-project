import dotenv from 'dotenv';

dotenv.config();

const getDbName = url => {
    const dbParts = url.split('/');
    return dbParts[dbParts.length - 1];
};

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const dbUrl = env === 'testing' ? process.env.DB_URL_TEST : process.env.DB_URL_DEV;
const dbName = getDbName(dbUrl);

const config = {
    name: 'desc-simplify-api',
    version: '1.0.0',
    env,
    port,
    dbUrl,
    dbName
};

export default config;
