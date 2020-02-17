import pkgJSON from '../../package.json';

const { NODE_ENV: env = 'development', PORT: port = 3001 } = process.env;

const baseUrl = env === 'production' ? 'https://desc-api.herokuapp.com' : 'http://localhost';

const config = {
    name: 'desc-simplify-api',
    version: pkgJSON.version,
    env,
    baseUrl,
    port
};

export default config;
