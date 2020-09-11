const response = require("../helper/response")
const jwt = require("jsonwebtoken")
// const jwtDecode = require("jwt-decode")

const verifyToken = (req, res, next) => {
    const {
        access_token
    } = req.headers
    if (!access_token) {
        const result = {
            msg: "Login dulu",
        }
        return response(res, 401, 'Error', result)
    }

    jwt.verify(access_token, process.env.JWT_KEYS, (err, decode) => {
        if (err) {
            return response(res, 401, 'Error', err)
        } else if (decode.type_token === 'access') {
            next()
        } else {
            let message = {
                message: "Token has wrong type"
            }
            return response(res, 401, 'Error', message)
        }

    })
}
const refreshToken = (req, res, next) => {
    try {
        const {
            refresh_token
        } = req.headers

        if (!refresh_token) {
            const result = {
                msg: "Refresh Token is required",
            }
            return response(res, 401, 'Error', result)
        }

        jwt.verify(refresh_token, process.env.JWT_KEYS, (err, decode) => {
            if (err) {
                return response(res, 401, 'Error', err)
            } else if (decode.type_token === 'refresh') {
                next()
            } else {
                let message = {
                    message: "Token has wrong type"
                }
                return response(res, 401, 'Error', message)
            }
        })
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

module.exports = {
    verifyToken,
    refreshToken
}