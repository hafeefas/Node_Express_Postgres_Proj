const {Pool} = require('pg');

//Creating new Pool instance with my database details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employees',
    password:'123',
    port: 5432,
});

module.exports = pool;