const express = require('express')
const routes = require('./src/main')
const database = require('./src/config/Databases')
const bodyPraser = require('body-parser')
const morgan =  require('morgan')
const server = express()
const port = 13000

server.use(bodyPraser.urlencoded({extended:false}))
server.use(bodyPraser.json())
server.use(morgan('dev'))
server.use(routes)

database.connect()
.then((result)=>{
    console.log("Database connected")
})
.catch((error)=>{
    console.log(`Database disconnected ${error}`)
})

server.listen(port, () =>{
    console.log(`Service running on port ${port}`)
})