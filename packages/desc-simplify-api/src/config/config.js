import dotenv from 'dotenv';

dotenv.config();

const {
    NODE_ENV: env = 'development',
    PORT: port = 3000,
    JWT_SECRET: token_secret = 'defaulttokensecret12345',
    SESSION_SECRET: session_secret = 'defaultsessionsecret54321',
    SESSION_NAME: session_name = 'connect.sid',
    DB_URL_DEV = 'mongo://localhost:27017/desc-api-dev',
    DB_URL_TEST = 'mongo://localhost:27017/desc-api-test'
} = process.env;

const getDbName = url => {
    const dbParts = url.split('/');
    return dbParts[dbParts.length - 1];
};

const dbUrl = env === 'testing' ? DB_URL_TEST : DB_URL_DEV;
const dbName = getDbName(dbUrl);

const config = {
    name: 'desc-simplify-api',
    version: '1.0.0',
    env,
    port,
    token_secret,
    session_secret,
    session_name,
    dbUrl,
    dbName
};

export default config;
