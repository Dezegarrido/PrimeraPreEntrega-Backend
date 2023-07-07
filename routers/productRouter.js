const express = require('express')

const { Router } = express

const productRouter = Router()

const products = [

]

productRouter.get('/', (req,res) =>{
    const status = req.query.status

    if(!status){
        return res.send(products)
    }

    const productsFiltered = products.filter(product => product.status === status)

    return res.send(productsFiltered)
})

productRouter.get('/:pid', (req,res) =>{
    const pid = parseInt(req.params.pid)

    console.log(req.query)

    const product = products.find(product => product.id === pid)
    
    if(!product){
        return res.send({})
    }

    const productCopy = {...product}

    return res.send(productCopy)
})

productRouter.post('/' , (req,res) => {
    const product = req.body

    product.id = products.length + 1

    products.push(product)

    return res.status(201).json(product)
})

productRouter.put('/:pid', (req,res) =>{

    const data = req.body

    const pid = parseInt(req.params.pid)

    const product = products.find(product => product.id === pid)
    
    if(!product){
        return res.status(404).json({
            error: 'Product not found'
        })
    }

    product.title = data.title || product.title
    product.description = data.description || product.description
    product.code = data.code || product.code
    product.price = data.price || product.price
    product.status = data.status || product.status
    product.stock = data.stock || product.stock
    product.category = data.category || product.category

    return res.json(product)
})

productRouter.delete('/:pid', (req,res) => {

    const pid = parseInt(req.params.pid)

    const productIndex = products.findIndex(product => product.id === pid) //TRIPLE = significa que valida el valor y tipo de dato. DOBLE = significa que valida el valor
    
    if(productIndex === -1){
        return res.status(404).json({
            error: 'product not found'
        })
    }

    products.splice(productIndex, 1) //Splice elimina un elemento del arreglo, dandole un indice/posicion y cuantos elementos quiere borrar.

    return res.status(204).json({})
})

module.exports = productRouter