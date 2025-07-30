const router = require('express').Router()
const ProductRoute = require('./proucts.routes')
const OrderRoute = require('./orders.routes')
const RegistrationRoute = require('./registration.routes')
const LoginRoute = require('./login.routes')
const LogoutRoute = require('./logout.routes')
const ProfileRoutes = require('./profile.routes')

router.use('/products', ProductRoute)
router.use('/orders', OrderRoute)
router.use('/register', RegistrationRoute)
router.use('/login', LoginRoute)
router.use('/logout', LogoutRoute)
router.use('/profile', ProfileRoutes)

module.exports = router