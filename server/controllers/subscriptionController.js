const router = require('express').Router()
const subscribeService = require('../services/subscribeService.js')
const {getErrorMessage}= require('../utils/errorMsg.js')

router.post('/', async (req,res) => {
    const {subscriptionEmail} = req.body;

    try {
        const sendEmail = await subscribeService.sendEmail(subscriptionEmail)
        res.status(200).json(sendEmail)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})


module.exports = router