const router = require('express').Router()
const watchService = require('../services/watchService.js')
const {getErrorMessage}= require('../utils/errorMsg.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.post('/create',authMiddleware.adminOnly, async (req,res) => {
const {brand,model,image,battery,mechanism,price,quantity} = req.body;
const owner = req?.user._id;

    try {
const result = await watchService.create(brand,model,image,battery,mechanism,price,quantity,owner)
res.status(201).json(result)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.get('/', async (req,res) => {
    try {
        const watches = await watchService.getAll()
        res.status(200).json(watches)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

module.exports = router;