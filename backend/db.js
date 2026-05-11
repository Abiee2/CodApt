// db.js
const mysql = require('mysql2');

// Use a pool (better than single connection)
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', // change if you have one
  database: 'codapt_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
console.log('DB PASS:', process.env.DB_PASSWORD);

module.exports = db.promise(); 