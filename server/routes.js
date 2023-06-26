const router = require('express').Router()
const authController = require('./controllers/authController.js')
const watchController = require('./controllers/watchController.js')

router.use('/users',authController)
router.use('/watches',watchController)

module.exports = router