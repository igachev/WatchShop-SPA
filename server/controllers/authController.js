
const router = require('express').Router()
const authService = require('../services/authService.js')
const {getErrorMessage}= require('../utils/errorMsg.js')

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

module.exports = router