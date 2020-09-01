const model = require('../model/History')
const templateResponse = require('../helper/response')
const History = {}

History.all = async (req, res) =>{
    try{
        const data = await model.getAll()
        const response = templateResponse(true, 200, 'Data found', data)
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

History.add = async (req, res) =>{
    try{
        const { invoices, cashier, date, orders, amount } = req.body
        console.log(req.body)
        const now = new Date().toISOString()
        const data = await model.add(invoices, cashier, date, orders, amount, now)
        const response = templateResponse(true, 201, 'History added successfully', data)
        return res.status(201).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

History.edit = async (req, res) =>{
    try{
        const { id, invoices, cashier, date, orders, amount } = req.body
        const now = new Date().toISOString()
        const data = await model.edit(id, invoices, cashier, date, orders, amount, now)
        const response = templateResponse(true, 200, 'History updated successfully', data)
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

History.delete = async (req, res) =>{
    try{
        const { id } = req.body
        const data = await model.delete(id)
        const response = templateResponse(true, 200, 'History deleted successfully', data)
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}
module.exports = History