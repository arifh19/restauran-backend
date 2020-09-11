const model = require('../model/History')
const response = require('../helper/response')
const redis = require('../config/redis')
const validator = require('../helper/validator')
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
        const data = {
            invoices: req.body.invoices,
            cashier: req.body.cashier,
            date: req.body.date,
            orders: req.body.orders,
            amount: req.body.amount
        };
        const {
            error
        } = validator.addHistory(data);

        if (error) {
            return response(res, 400, error.details[0].message);
        }
        const results = await model.add(data)
        return response(res, 201, 'History added successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

History.edit = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            invoices: req.body.invoices,
            cashier: req.body.cashier,
            date: req.body.date,
            orders: req.body.orders,
            amount: req.body.amount
        };
        const {
            error
        } = validator.editHistory(data);
        if (error) {
            return response(res, 400, error.details[0].message);
        }
        const results = await model.edit(data)
        return response(res, 200, 'History updated successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

History.delete = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
        };
        const {
            error
        } = validator.deleteHistory(data);
        if (error) {
            return response(res, 400, error.details[0].message);
        }
        const results = await model.delete(data)
        return response(res, 200, 'History deleted successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}
module.exports = History