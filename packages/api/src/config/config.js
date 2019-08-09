import 'dotenv/config';
import pkgJSON from '../../package.json';

const {
    NODE_ENV: env = 'development',
    PORT: port = 3000,
    JWT_SECRET: token_secret = 'defaulttokensecret12345',
    DB_USER: dbUser,
    DB_PASSWORD: dbPassword,
    DB_URL: dbUrl = null,
    DB_NAME_DEV: dbNameDev = 'desc-dev',
    DB_NAME_TEST: dbNameTest = 'desc-test',
    DB_HOST1: dbHost1,
    DB_HOST2: dbHost2,
    DB_HOST3: dbHost3,
    DB_OPTIONS: dbOptions
} = process.env;

const generateDbBaseUri = () => {
    if (dbHost1 && dbHost2 && dbHost3) {
        return `mongodb://${dbUser}:${dbPassword}@${dbHost1},${dbHost2},${dbHost3}`;
    }
    if (dbUrl) {
        return `mongodb://${dbUser}:${dbPassword}@${dbUrl}`;
    }
    return `mongodb://localhost:27017`;
};

const db = {
    baseUri: generateDbBaseUri(),
    options: dbOptions,
    name: {
        dev: dbNameDev,
        test: dbNameTest
    }
};

const config = {
    name: 'desc-simplify-api',
    version: pkgJSON.version,
    env,
    port,
    token_secret,
    db
};

export default config;
