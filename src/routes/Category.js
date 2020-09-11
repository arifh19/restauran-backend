const express = require('express')
const route = express.Router()
const controller = require('../controller/Category')
const validator = require('../helper/validator')
const cache = require('../middleware/cache')
const authorize = require('../middleware/authorize')
const {
    verifyToken
} = require('../middleware/validate')

route.get('/', verifyToken, authorize.grantAccess(['admin', 'operator']), cache, controller.all)
route.post('/', validator.addCategory, authorize.grantAccess(['admin']), controller.add)
route.put('/', validator.editCategory, authorize.grantAccess(['admin']), controller.edit)
route.delete('/', validator.deleteCategory, authorize.grantAccess(['admin']), controller.delete)

module.exports = route