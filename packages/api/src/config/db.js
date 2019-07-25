import mongoose from 'mongoose';
import debug from 'debug';

const log = debug('db:connection');

export default config => {
    const getDbName = () => {
        return config.env !== 'testing' ? 'desc-dev' : 'desc-test';
    };

    const buildConnectionString = () => {
        return `${config.db.baseUri}/${getDbName()}?${config.db.options}`;
    };

    log('setting up mongodb...');
    mongoose.Promise = global.Promise;
    mongoose.connect(buildConnectionString(), {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
    });
    let db = mongoose.connection;

    db.once('open', () => {
        log(`Connected to ${getDbName()}`);
    });

    db.on('error', console.error.bind(console, 'connection error'));
    db.on('disconnected', () => {
        log(`Mongoose disconnected`);
    });

    process.on('SIGINT', () => {
        db.close(() => {
            log('Mongoose default connection closed via app termination');
            process.exit(0);
        });
    });

    process.once('SIGUSR2', () => {
        db.close(() => {
            log('Mongoose default connection closed via nodemon restart');
            process.kill(process.pid, 'SIGUSR2');
        });
    });
    return db;
};
