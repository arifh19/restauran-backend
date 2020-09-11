const model = require("../model/User")
const response = require("../helper/response")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")

class Auth {
    login = async (req, res) => {
        try {
            const userDB = await model.getByUsername(req.body.username)
            if (userDB.length <= 0) {
                return respone(res, 200, "Username tidak terdaftar")
            }

            const passwordReq = req.body.password
            const check = await bcrypt.compare(passwordReq, userDB[0].password)

            if (check) {
                const result = await this.setLoginToken(userDB[0])
                return response(res, 200, 'Login successfully', result)

            } else {
                return response(res, 200, 'Login is failed', {})
            }

        } catch (error) {
            return response(res, 500, 'Error', error)
        }
    }

    setLoginToken = async (user) => {
        try {
            const payloadAccess = {
                type_token: 'access',
                uuid: user.uuid,
            }
            const payloadRefresh = {
                type_token: 'refresh',
                uuid: user.uuid,
            }

            const accessToken = jwt.sign(payloadAccess, process.env.JWT_KEYS, {
                expiresIn: 60 * 60
            })

            const refrehToken = jwt.sign(payloadRefresh, process.env.JWT_KEYS, {
                expiresIn: '24h'
            })
            const result = {
                access_token: accessToken,
                refresh_token: refrehToken,
                msg: "Token created, login success",
            }
            return result
        } catch (error) {
            throw error
        }
    }

    setRefreshToken = async (req, res) => {
        try {
            const {
                refresh_token
            } = req.headers
            const userId = jwtDecode(refresh_token)
            const userDB = await model.getById(userId.user)

            const payloadAccess = {
                type_token: 'access',
                uuid: userDB[0].uuid,
            }

            const accessToken = jwt.sign(payloadAccess, process.env.JWT_KEYS, {
                expiresIn: 60 * 60
            })

            const result = {
                access_token: accessToken,
                msg: "Token created, login success",
            }
            return response(res, 200, 'Refresh token successfully', result)

        } catch (error) {
            return response(res, 500, 'Error', error)
        }
    }
}

module.exports = new Auth()