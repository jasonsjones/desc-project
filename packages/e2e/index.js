require('dotenv/config');
const config = require('./config');
const db = require('./db');

const connection = db(config);

connection.dropCollection('users', () => {
    console.log('users collection dropped.');
});

connection.close();
