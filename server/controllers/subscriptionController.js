const router = require('express').Router()
const subscribeService = require('../services/subscribeService.js')
const {getErrorMessage}= require('../utils/errorMsg.js')

router.post('/', async (req,res) => {
    const {email} = req.body;

    try {
        const sendEmail = await subscribeService.sendEmail(email)
        res.status(200).json(sendEmail)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})


module.exports = router