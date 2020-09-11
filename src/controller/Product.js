const model = require('../model/Product')
const response = require('../helper/response')
const redis = require('../config/redis')
const Product = {}

Product.all = async (req, res) => {
    try {
        let column
        let sort
        if (req.query.column === 'category') {
            column = 'T2.name'
            sort = req.query.sort
        } else if (Object.keys(req.query).length === 2) {
            column = `T1.${req.query.column}`
            sort = req.query.sort
        } else {
            column = 'id'
            sort = 'DESC'
        }

        const data = await model.getAll(column, sort)
        const data_redis = JSON.stringify(data)
        redis.redisDB.setex(req.originalUrl, 30, data_redis)
        let message
        if (data.length === 0) {
            message = 'No Data'
        } else {
            message = 'List Data'
        }
        return response(res, 200, message, data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Product.show = async (req, res) => {
    try {
        const id = req.params.id
        const data = await model.get(id)
        let message
        if (data.length === 0) {
            message = 'No Data'
        } else {
            message = 'Data is found'
        }
        return response(res, 200, message, data)

    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Product.add = async (req, res) => {
    try {
        const {
            name,
            price,
            stock,
            category_id
        } = req.body
        const {
            filename
        } = req.file
        console.log(filename)
        const data = await model.add(name, filename, price, stock, category_id)
        return response(res, 201, 'Product added successfully', data)

    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Product.edit = async (req, res) => {
    try {
        const {
            id,
            name,
            price,
            stock,
            category_id
        } = req.body
        const {
            filename
        } = req.file
        const data = await model.edit(id, name, filename, price, stock, category_id)
        return response(res, 200, 'Product updated successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Product.delete = async (req, res) => {
    try {
        const id = req.params.id
        const data = await model.delete(id)
        return response(res, 200, 'Product deleted successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Product.searchByName = async (req, res) => {
    try {
        const name = req.params.name
        const data = await model.searchByName(name)

        let message
        if (data.length === 0) {
            message = 'Data is not found'
        } else {
            message = 'Data is found'
        }
        const data_redis = JSON.stringify(data)
        redis.redisDB.setex(req.originalUrl, 30, data_redis)
        return response(res, 200, message, data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

module.exports = Product