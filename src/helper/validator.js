const Validator = require('validatorjs')
const response = require('./response')

const validation = {}

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages)
    validation.passes(() => callback(null, true))
    validation.fails(() => callback(validation.errors, false))
}

validation.main = (req, res, next, validationRule) => {
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return response(res, 400, 'Validation failed', err)
        } else {
            next();
        }
    });
}

validation.addCategory = (req, res, next) => {
    const validationRule = {
        "name": "required|string",
    }
    validation.main(req, res, next, validationRule)
}

validation.editCategory = (req, res, next) => {
    const validationRule = {
        "id": "required|integer",
        "name": "required|string",
    }
    validation.main(req, res, next, validationRule)

}

validation.deleteCategory = (req, res, next) => {
    const validationRule = {
        "id": "required|integer",
    }
    validation.main(req, res, next, validationRule)
}

validation.addProduct = (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "price": "required|integer",
        "stock": "required|integer",
        "category_id": "required|integer",
    }
    validation.main(req, res, next, validationRule)

}

validation.editProduct = (req, res, next) => {
    const validationRule = {
        "id": "required|integer",
        "name": "required|string",
        "price": "required|integer",
        "stock": "required|integer",
        "category_id": "required|integer",
    }
    validation.main(req, res, next, validationRule)

}

validation.addHistory = (req, res, next) => {
    const validationRule = {
        "invoices": "required|string",
        "cashier": "required|string",
        "date": "required|string",
        "orders": "required|string",
        "amount": "required|string",
    }
    validation.main(req, res, next, validationRule)

}

validation.editHistory = (req, res, next) => {
    const validationRule = {
        "id": "required|integer",
        "invoices": "required|string",
        "cashier": "required|string",
        "date": "required|date",
        "orders": "required|string",
        "amount": "required|integer",
    }
    validation.main(req, res, next, validationRule)
}

validation.deleteHistory = (req, res, next) => {
    const validationRule = {
        "id": "required|integer",
    }
    validation.main(req, res, next, validationRule)
}

module.exports = validation