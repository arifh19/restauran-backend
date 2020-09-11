const express = require('express')
const route = express.Router()
const controller = require('../controller/User')
// const validator = require('../helper/validator')

route.get('/', controller.all)
route.post('/', controller.add)
route.put('/', controller.edit)
route.delete('/', controller.delete)

module.exports = route