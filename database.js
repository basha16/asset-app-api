const mysql = require('mysql2/promise')
require('dotenv').config();

const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'assest_management',
    connectionLimit: 10,
    queueLimit: 0,
    port: process.env.PORT
})

module.exports = {
    db
}