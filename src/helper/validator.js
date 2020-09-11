const joi = require('joi')

class Validator {

    addCategory(data) {
        const schema = joi.object({
            name: joi.string().required(),
        })
        return schema.validate(data);
    }

    editCategory(data) {
        const schema = joi.object({
            id: joi.number().required(),
            name: joi.string().required(),
        })
        return schema.validate(data);
    }

    deleteCategory(data) {
        const schema = joi.object({
            id: joi.number().required(),
        })
        return schema.validate(data);
    }

    addProduct(data) {
        const schema = joi.object({
            name: joi.string().required(),
            image: joi.string().required(),
            price: joi.number().required(),
            stock: joi.number().required(),
            category_id: joi.number().required(),
        })
        return schema.validate(data);
    }

    editProduct(data) {
        const schema = joi.object({
            id: joi.number().required(),
            name: joi.string().required(),
            image: joi.string().required(),
            price: joi.number().required(),
            stock: joi.number().required(),
            category_id: joi.number().required(),
        })
        return schema.validate(data);
    }

    addHistory(data) {
        const schema = joi.object({
            invoices: joi.string().required(),
            cashier: joi.string().required(),
            date: joi.string().required(),
            orders: joi.string().required(),
            amount: joi.string().required(),
        })
        return schema.validate(data);
    }

    editHistory(data) {
        const schema = joi.object({
            id: joi.number().required(),
            invoices: joi.string().required(),
            cashier: joi.string().required(),
            date: joi.string().required(),
            orders: joi.string().required(),
            amount: joi.string().required(),
        })
        return schema.validate(data);
    }

    deleteHistory(data) {
        const schema = joi.object({
            id: joi.number().required(),
        })
        return schema.validate(data);
    }

    Login(data) {
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required(),
        })
        return schema.validate(data);
    }

    addUser(data) {
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required(),
            name: joi.string().required(),
            role: joi.string().required(),
        })
        return schema.validate(data);
    }
    editUser(data) {
        const schema = joi.object({
            id: joi.string().required(),
            username: joi.string().required(),
            password: joi.string().required(),
            name: joi.string().required(),
            role: joi.string().required(),
        })
        return schema.validate(data);
    }
    deleteUser(data) {
        const schema = joi.object({
            id: joi.string().required(),
        })
        return schema.validate(data);
    }
}

module.exports = new Validator()