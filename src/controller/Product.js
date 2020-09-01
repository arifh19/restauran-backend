const model = require('../model/Product')
const templateResponse = require('../helper/response')
const Product = {}

Product.all = async (req, res) =>{
    try{
        let column
        let sort
        if (req.query.column === 'category'){
            column = 'T2.name'
            sort = req.query.sort
        }
        else if(Object.keys(req.query).length === 2){
            column = `T1.${req.query.column}`
            sort = req.query.sort
        }
        else {
            column = 'id'
            sort = 'DESC' 
        }
        const data = await model.getAll(column, sort)
        let response
        if (data.length === 0){
            response = templateResponse(true, 200, 'No Data', data)
        }else {
            response = templateResponse(true, 200, 'List Data', data)
        }
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

Product.add = async (req, res) =>{
    try{
        const { name, image, price, stock, category_id } = req.body
        const date = new Date().toISOString()
        const data = await model.add(name, image, price, stock, category_id, date)
        const response = templateResponse(true, 201, 'Product added successfully', data)
        return res.status(201).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

Product.edit = async (req, res) =>{
    try{
        const { id, name, image, price, stock, category_id } = req.body
        const date = new Date().toISOString()
        const data = await model.edit(id, name, image, price, stock, category_id, date)
        const response = templateResponse(true, 200, 'Product updated successfully', data)
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

Product.delete = async (req, res) =>{
    try{
        const { id } = req.body
        const data = await model.delete(id)
        const response = templateResponse(true, 200, 'Product deleted successfully', data)
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

Product.searchByName = async (req, res) =>{
    try{
        const name = req.params.name
        const data = await model.searchByName(name)
        let response
        if (data.length === 0){
            response = templateResponse(true, 200, 'Data is not found', data)
        }else {
            response = templateResponse(true, 200, 'Data is found', data)
        }        
        return res.status(200).json(response)
    }catch(error){
        const response = templateResponse(false, 500, 'Error', error)
        return res.status(500).json(response)
    }
}

module.exports = Product