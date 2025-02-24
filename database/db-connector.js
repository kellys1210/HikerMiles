// Code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

const mysql = require("mysql");

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_peterer2",
  password: "2620",
  database: "cs340_peterer2",
});

// Export it for use in our applicaiton
module.exports.pool = pool;
