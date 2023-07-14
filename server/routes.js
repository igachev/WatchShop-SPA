const router = require('express').Router()
const authController = require('./controllers/authController.js')
const watchController = require('./controllers/watchController.js')
const subscriptionController = require('./controllers/subscriptionController.js')

router.use('/users',authController)
router.use('/watches',watchController)
router.use('/subscription',subscriptionController)

module.exports = router