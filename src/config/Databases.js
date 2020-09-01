const Pool = require('pg-pool')

const myDb = new Pool({
    user : "arif",
    password : "1sampai9",
    host : "localhost",
    database : "restaurant"
})

module.exports = myDb