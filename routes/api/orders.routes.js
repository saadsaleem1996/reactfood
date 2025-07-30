'use strict'
const router = require('express').Router()
const Controller = require('../../controllers/orders.controller')


router.post('/',  Controller.createOrders)
router.put('/',  Controller.updateOrders)
router.delete('/',Controller.placeOrder)

 

module.exports = router