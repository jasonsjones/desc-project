import { createConnection, getConnection } from 'typeorm';
import config from './config';

const envDbNameMap: Map<string, string> = new Map();
envDbNameMap.set('development', 'desc-dev');
envDbNameMap.set('testing', 'desc-test');

const dbName: string = envDbNameMap.get(config.env) as string;

export const createPostgresConnection = async (): Promise<void> => {
    try {
        if (config.env != 'production') {
            await createConnection(dbName);
            console.log(`connected to postgres database: ${getPostgresConnectionName()}`);
        }
        // else connect to heroku hosted postres
        // instance assigned to env var DATABASE_URL
    } catch (e) {
        console.error(e);
    }
};

export const getPostgresConnectionName = () => {
    return getConnection(dbName).name;
};

export const closeConnection = () => {
    return getConnection(dbName).close();
};
