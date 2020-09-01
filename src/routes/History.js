const express = require('express')
const route = express.Router()
const controller = require('../controller/History')
const validator = require('../helper/validator')

route.get('/', controller.all)
route.post('/', validator.addHistory, controller.add)
route.put('/', validator.editHistory, controller.edit)
route.delete('/', validator.deleteHistory, controller.delete)

module.exports = route