const model = require('../model/User')
const response = require('../helper/response')
const hashPassword = require('../helper/hash')
const {
    v4: uuidv4
} = require('uuid')

const User = {}


User.all = async (req, res) => {
    try {
        const data = await model.getAll()
        let message
        if (data.length === 0) {
            message = 'No Data'
        } else {
            message = 'List Data'
        }
        const data_redis = JSON.stringify(data)
        redis.redisDB.setex(req.originalUrl, 30, data_redis)
        return response(res, 200, message, data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

User.getByUsername = async (req, res) => {
    try {
        const data = await model.getUsername(req.body.username)
        return response(res, 200, message, data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

User.add = async (req, res) => {
    try {
        const passHash = await hashPassword(req.body.password)
        const {
            name,
            username,
            role
        } = req.body
        const uuid = uuidv4()
        const data = await model.add(uuid, name, username, passHash, role)
        return response(res, 201, 'User added successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

User.edit = async (req, res) => {
    try {
        const {
            id,
            name,
            username,
            password,
            role
        } = req.body
        const data = await model.edit(id, name, username, password, role)
        return response(res, 200, 'User updated successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

User.delete = async (req, res) => {
    try {
        const {
            id
        } = req.body
        const data = await model.delete(id)
        return response(res, 200, 'User deleted successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

module.exports = User