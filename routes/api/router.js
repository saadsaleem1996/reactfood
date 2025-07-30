const router = require('express').Router()
const ProductRoute = require('./proucts.routes')
const OrderRoute = require('./orders.routes')

router.use('/products', ProductRoute)
router.use('/orders', OrderRoute)

module.exports = router