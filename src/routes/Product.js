const express = require('express')
const route = express.Router()
const controller = require('../controller/Product')
const validator = require('../helper/validator')

route.get('/', controller.all)
route.post('/', validator.addProduct, controller.add)
route.put('/', validator.editProduct, controller.edit)
route.delete('/', validator.deleteProduct, controller.delete)
route.get('/search/:name', controller.searchByName)

module.exports = route