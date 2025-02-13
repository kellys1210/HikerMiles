const mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_shielkel',
    password        : '####',
    database        : 'cs340_shielkel'
})

// Export it for use in our applicaiton
module.exports.pool = pool;