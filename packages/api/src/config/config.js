import 'dotenv/config';
import pkgJSON from '../../package.json';

const {
    NODE_ENV: env = 'development',
    PORT: port = 3000,
    JWT_SECRET: token_secret = 'defaulttokensecret12345',
    SESSION_SECRET: session_secret = 'defaultsessionsecret54321',
    SESSION_NAME: session_name = 'connect.sid',
    DB_USER: dbUser,
    DB_PASSWORD: dbPassword,
    DB_HOST1: dbHost1,
    DB_HOST2: dbHost2,
    DB_HOST3: dbHost3,
    DB_OPTIONS: dbOptions
} = process.env;

const db = {
    baseUri: `mongodb://${dbUser}:${dbPassword}@${dbHost1},${dbHost2},${dbHost3}`,
    options: dbOptions
};

const config = {
    name: 'desc-simplify-api',
    version: pkgJSON.version,
    env,
    port,
    token_secret,
    session_secret,
    session_name,
    db
};

export default config;
