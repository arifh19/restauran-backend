require('dotenv/config')
const express = require('express')
const routes = require('./src/main')
const database = require('./src/config/Databases')
const bodyPraser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const redis = require('./src/config/redis')
const server = express()
const port = process.env.PORT
const isLogin = require('./src/middleware/validate')
const SimpleNodeLogger = require('simple-node-logger')

server.use(bodyPraser.urlencoded({
    extended: true
}))
server.use(bodyPraser.json())
server.use(morgan('dev'))
server.use(routes)
server.use(cors());
server.use("/public", express.static("public"))
// server.use("/public", express.static("public"))

const log = require('simple-node-logger').createSimpleLogger('project.log');

database.connect()
    .then((result) => {
        console.log("Database is connected")
    })
    .catch((error) => {
        console.log(`Database disconnected ${error}`)
    })

redis.redisCheck()
    .then((res) => {
        console.log(res)
    })
    .catch((error) => {
        console.log(error)
    })
server.listen(port, () => {
    console.log(`Service running on port ${port}`)
})
