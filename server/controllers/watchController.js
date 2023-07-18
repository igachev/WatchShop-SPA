const router = require('express').Router()
const watchService = require('../services/watchService.js')
const authService = require('../services/authService.js')
const {getErrorMessage}= require('../utils/errorMsg.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.post('/create',authMiddleware.adminOnly, async (req,res) => {
const {brand,model,image,battery,mechanism,price,strap,glass,waterResistance} = req.body;

    try {
const result = await watchService.create(brand,model,image,battery,mechanism,price,strap,glass,waterResistance)
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

router.get('/search', async (req,res) => {
    const watches = await watchService.getAll();
    res.status(200).json(watches)
})

router.post('/search', async (req,res) => {
    const {searchValue} = req.body;

    try {
        const watches = await watchService.searchByBrand(searchValue)
        res.status(200).json(watches)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.get('/:watchId', async (req,res) => {
    const watchId = req.params.watchId
    try {
        const watch = await watchService.getOne(watchId)
        res.status(200).json(watch)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.post('/:watchId/rating', authMiddleware.isAuthorized, async (req,res) => {
    const watchId = req.params.watchId
    const userId = req.user?._id
    const {userRating} = req.body;

    try {
        const addRating = await watchService.rate(userId,watchId,userRating)
        res.status(201).json(addRating)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.get('/:watchId/rating', async (req,res) => {
    const watchId = req.params.watchId;

    try {
        const avgRating = await watchService.getRating(watchId)
        res.status(200).json(avgRating)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.post('/:watchId',authMiddleware.isAuthorized, async (req,res) => {
    const watchId = req.params.watchId;
    const userId = req.user?._id;

    try {
    const addedToCart = await authService.addToCart(userId,watchId)
    res.status(201).json(addedToCart)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.delete('/:watchId',authMiddleware.adminOnly, async (req,res) => {
    const watchId = req.params.watchId
    try {
        const watch = await watchService.deleteOne(watchId)
        res.status(200).json(watch)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.put('/:watchId',authMiddleware.adminOnly, async (req,res) => {
    const watchId = req.params.watchId;
    const {brand,model,image,battery,mechanism,price,strap,glass,waterResistance} = req.body;
    const data = {brand,model,image,battery,mechanism,price,strap,glass,waterResistance}

    try {
        const updatedWatch = await watchService.editOne(watchId,data)
        res.status(200).json(updatedWatch)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

module.exports = router;