const express = require('express')
const upload = require("../middleware/upload")
const route = express.Router()
const controller = require('../controller/Product')
const validator = require('../helper/validator')
const cache = require('../middleware/cache')
const isLogin = require('../middleware/validate')

route.get('/', isLogin, cache, controller.all)
route.post('/', isLogin, upload.single('image'), validator.addProduct, controller.add)
route.put('/', isLogin, upload.single('image'), validator.editProduct, controller.edit)
route.delete('/:id', isLogin, controller.delete)
route.get('/search/:name', isLogin, cache, controller.searchByName)
route.get('/:id', isLogin, cache, controller.show)

module.exports = route