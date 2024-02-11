const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10, // adjust as needed
    host: '127.0.0.1',
    user: 'root',
    password: 'andrea29',
    database: 'trivia'
});

module.exports = pool;