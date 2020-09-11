const model = require('../model/History')
const response = require('../helper/response')
const redis = require('../config/redis')
const History = {}

History.all = async (req, res) => {
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

History.add = async (req, res) => {
    try {
        const {
            invoices,
            cashier,
            date,
            orders,
            amount
        } = req.body
        const data = await model.add(invoices, cashier, date, orders, amount)
        return response(res, 201, 'History added successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

History.edit = async (req, res) => {
    try {
        const {
            id,
            invoices,
            cashier,
            date,
            orders,
            amount
        } = req.body
        const data = await model.edit(id, invoices, cashier, date, orders, amount)
        return response(res, 200, 'History updated successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

History.delete = async (req, res) => {
    try {
        const {
            id
        } = req.body
        const data = await model.delete(id)
        return response(res, 200, 'History deleted successfully', data)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}
module.exports = History