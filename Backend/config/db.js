const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); // ✅ Native promise support

module.exports = db;
