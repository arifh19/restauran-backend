const model = require('../model/Category')
const templateResponse = require('../helper/response')
const Category = {}

Category.all = async (req, res) =>{
    try{
        const data = await model.getAll()
        const response = templateResponse(true, 200, 'Data found', data)
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

Category.add = async (req, res) =>{
    try{
        const { name } = req.body
        const date = new Date().toISOString()
        const data = await model.add(name, date)
        const response = templateResponse(true, 201, 'Category added successfully', data)
        return res.status(201).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

Category.edit = async (req, res) =>{
    try{
        const { id, name } = req.body
        const date = new Date().toISOString()
        const data = await model.edit(id, name, date)
        const response = templateResponse(true, 200, 'Category updated successfully', data)
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

Category.delete = async (req, res) =>{
    try{
        const { id } = req.body
        const data = await model.delete(id)
        const response = templateResponse(true, 200, 'Category deleted successfully', data)
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

module.exports = Category