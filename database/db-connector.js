// Code based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app

const mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_holcomau',
    password        : 'WwogXgAdExNQ',
    database        : 'cs340_holcomau'
})

// Export it for use in our applicaiton
module.exports.pool = pool;