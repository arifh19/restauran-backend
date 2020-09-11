const express = require('express')
const route = express.Router()
const controller = require('../controller/Category')
const validator = require('../helper/validator')
const cache = require('../middleware/cache')
const authorize = require('../middleware/authorize')
const isLogin = require('../middleware/validate')

route.get('/', isLogin, authorize.grantAccess(['admin', 'operator']), cache, controller.all)
route.post('/', isLogin, validator.addCategory, authorize.grantAccess(['admin']), controller.add)
route.put('/', isLogin, validator.editCategory, authorize.grantAccess(['admin']), controller.edit)
route.delete('/', isLogin, validator.deleteCategory, authorize.grantAccess(['admin']), controller.delete)

module.exports = route