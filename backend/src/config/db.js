const mysql = require('mysql');
require('dotenv').config();
const { DB_HOST,
    DB_USER,
    PASSWORD,
    DB_NAME
} = process.env

const connection = mysql.createConnection({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: PASSWORD

})

module.exports = connection

  