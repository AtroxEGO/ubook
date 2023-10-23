require("dotenv").config();
// const mysql = require('mysql');
const mysql2 = require("mysql2/promise");

// // Old Version Of MySQL
// const db = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'localhost',
//     user            : 'root',
//     password        : process.env.DB_PASSWORD,
//     database        : 'ubook'
// });

// New Version Of MySQL
const pool = mysql2.createPool({
  host: "localhost",
  database: "ubook2",
  user: "root",
  // password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Config For Single Connections
const mysqlConfig = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "ubook",
};

module.exports = { pool, mysqlConfig };
