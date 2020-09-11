const express = require("express")
const route = express.Router()
const controller = require('../controller/Auth')
const {
    refreshToken
} = require('../middleware/validate')

route.post("/login", controller.login)
route.post("/refresh", refreshToken, controller.setRefreshToken)

module.exports = route