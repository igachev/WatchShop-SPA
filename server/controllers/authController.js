
const router = require('express').Router()
const authService = require('../services/authService.js')
const {getErrorMessage}= require('../utils/errorMsg.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

router.post('/register', async (req,res) => {
    const {email,password,repeatPassword} = req.body;
    try {
       const result = await authService.register(email,password,repeatPassword)
        res.status(201).json(result)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    try {
        const result = await authService.login(email,password)
        res.status(200).set('Authorization', `${result.accessToken}`).json(result);
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.get('/logout',(req,res) => {
res.status(200).json({ok:true})
})

router.get('/isAdmin', (req, res) => {
    let isAdmin = req.isAdmin || false;
   
 //   console.log(isAdmin);
    res.status(200).json({ isAdmin });
  });

router.get('/:userId/cart', authMiddleware.isAuthorized, async (req,res) => {
const userId = req.params.userId

try {
    const cartItems = await authService.getAllCartProducts(userId);
    res.status(200).json(cartItems)
} catch (err) {
    res.status(400).json({message: getErrorMessage(err)})
}
})

router.delete('/:userId/cart/:watchId', authMiddleware.isAuthorized, async (req,res) => {
    const userId = req.params.userId
    const watchId = req.params.watchId

    try {
        const deleteFromCart = await authService.deleteWatchFromCart(userId,watchId)
        res.status(200).json(deleteFromCart)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.post('/:userId/cart/:watchId',authMiddleware.isAuthorized, async (req,res) => {
    const userId = req.params.userId
    const watchId = req.params.watchId
    const {quantity,price,name,phone,address} = req.body;

    try {
        const updatedUserPurchaseHistory = await authService.addToUserPurchaseHistory(userId,watchId,quantity,price,name,phone,address)
        res.status(201).json(updatedUserPurchaseHistory)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.get('/:userId/purchaseHistory',async (req,res) => {
    const userId = req.params.userId

    try {
        const purchaseHistory = await authService.getPurchaseHistory(userId)
        res.status(200).json(purchaseHistory)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

module.exports = router