// Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

const mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_shielkel',
    password        : '7268',
    database        : 'cs340_shielkel'
})

// Export it for use in our applicaiton
module.exports.pool = pool;