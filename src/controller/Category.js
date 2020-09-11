const model = require('../model/Category')
const response = require('../helper/response')
const redis = require('../config/redis')
const Category = {}

Category.all = async (req, res) => {
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

Category.add = async (req, res) => {
    try {
        const {
            name
        } = req.body
        const data = await model.add(name)
        return response(res, 201, 'Category added successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Category.edit = async (req, res) => {
    try {
        const {
            id,
            name
        } = req.body
        const data = await model.edit(id, name)
        return response(res, 200, 'Category updated successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Category.delete = async (req, res) => {
    try {
        const {
            id
        } = req.body
        const data = await model.delete(id)
        return response(res, 200, 'Category deleted successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

module.exports = Category