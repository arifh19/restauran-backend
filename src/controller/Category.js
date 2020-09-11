const model = require('../model/Category')
const response = require('../helper/response')
const redis = require('../config/redis')
const validator = require('../helper/validator')
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
        const data = {
            name: req.body.name,
        }
        const {
            error
        } = validator.addCategory(data);

        if (error) {
            return response(res, 400, error.details[0].message);
        }
        const results = await model.add(data)
        return response(res, 201, 'Category added successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Category.edit = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            name: req.body.name,
        }
        const {
            error
        } = validator.editCategory(data);
        if (error) {
            return response(res, 400, error.details[0].message);
        }
        const results = await model.edit(data)
        return response(res, 200, 'Category updated successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Category.delete = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
        }
        const {
            error
        } = validator.deleteCategory(data);
        if (error) {
            return response(res, 400, error.details[0].message);
        }
        const results = await model.delete(data)
        return response(res, 200, 'Category deleted successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

module.exports = Category