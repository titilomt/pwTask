const configFile  = require("../../config/local");
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: configFile.host,
    port: configFile.port,
    user: configFile.user,
    password: configFile.pass,
    database: configFile.db,
    dateStrings: 'date'
});

module.exports = pool;