import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const config = {
    name: 'desc-simplify-api',
    version: '1.0.0',
    env,
    port,
    dbUrl: env === 'testing' ? process.env.DB_URL_TEST : process.env.DB_URL_DEV
};

export default config;
