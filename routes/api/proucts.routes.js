'use strict'
const router = require('express').Router()
const Controller = require('../../controllers/products.controller')


router.post('/',  Controller.createProducts)
router.post('/addCart',  Controller.addTocard)
router.put('/',  Controller.updateProduct)
router.delete('/',  Controller.deleteProduct)

 

module.exports = router