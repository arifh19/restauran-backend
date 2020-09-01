const express = require('express')
const routes = express.Router()
const category = require('./routes/Category')
const product = require('./routes/Product')
const history = require('./routes/History')

routes.use('/category', category)
routes.use('/product', product)
routes.use('/history', history)

module.exports = routes