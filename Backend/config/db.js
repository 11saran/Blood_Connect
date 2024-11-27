const mysql = require('mysql2');
const { promisify } = require('util');
require('dotenv').config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

db.query = promisify(db.query).bind(db);

module.exports = db;
