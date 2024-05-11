const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'maindb',
    password: 'Voinov2100)',
    port: 5432,
});

module.exports = pool;