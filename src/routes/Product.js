const express = require('express')
const upload = require("../middleware/upload")
const route = express.Router()
const controller = require('../controller/Product')
const validator = require('../helper/validator')
const cache = require('../middleware/cache')
const {
    verifyToken
} = require('../middleware/validate')

route.get('/', verifyToken, cache, controller.all)
route.post('/', verifyToken, upload.single('image'), validator.addProduct, controller.add)
route.put('/', verifyToken, upload.single('image'), validator.editProduct, controller.edit)
route.delete('/:id', verifyToken, controller.delete)
route.get('/search/:name', verifyToken, cache, controller.searchByName)
route.get('/:id', verifyToken, cache, controller.show)

module.exports = route