const express = require('express')
const route = express.Router()
const controller = require('../controller/History')
const validator = require('../helper/validator')
const isLogin = require('../middleware/validate')

route.get('/', isLogin, controller.all)
route.post('/', isLogin, validator.addHistory, controller.add)
route.put('/', isLogin, validator.editHistory, controller.edit)
route.delete('/', isLogin, validator.deleteHistory, controller.delete)

module.exports = route