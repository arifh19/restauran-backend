const express = require('express')
const route = express.Router()
const controller = require('../controller/Category')
const validator = require('../helper/validator')

route.get('/', controller.all)
route.post('/', validator.addCategory, controller.add)
route.put('/', validator.editCategory, controller.edit)
route.delete('/', validator.deleteCategory, controller.delete)

module.exports = route