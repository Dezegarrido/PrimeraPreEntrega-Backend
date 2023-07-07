const express = require('express')

const { Router } = express

const cartRouter = Router()

const carts = [

]

cartRouter.post('/' , (req,res) => {
    const cart = req.body

    cart.id = carts.length + 1

    carts.push(cart)

    return res.status(201).json(cart)
})

cartRouter.get('/:cid', (req,res) =>{
    const cid = parseInt(req.params.cid)

    console.log(req.query)

    const cart = carts.find(cart => cart.id === cid)
    
    if(!cart){
        return res.send({})
    }

    const cartCopy = {...cart}

    return res.send(cartCopy)
})

cartRouter.post('/:cid/product/:pid' , (req,res) => {
    const cart = req.body

    cart.id = carts.length + 1

    carts.push(cart)

    return res.status(201).json(cart)
})


module.exports = cartRouter