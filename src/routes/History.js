const express = require('express')
const route = express.Router()
const controller = require('../controller/History')
const validator = require('../helper/validator')
const multer = require('multer')

const upload = multer({
    dest: 'uploads/'
})

route.get('/', controller.all)
route.post('/', upload.none(), validator.addHistory, controller.add)
route.put('/', validator.editHistory, controller.edit)
route.delete('/', validator.deleteHistory, controller.delete)

module.exports = route