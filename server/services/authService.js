const User = require('../models/User.js')
const jwt = require('../promisifyToken/jsonwebtoken.js')
require('dotenv').config();
const SECRET = process.env.JWT_SECRET

exports.register = async (email,password,repeatPassword) => {
    const user = await User.findOne({email})

    if(user) {
        throw new Error('User already exists!')
    }

    if(password !== repeatPassword) {
        throw new Error('passwords missmatch!')
    }

    await User.create({email,password})
}

exports.login = async (email,password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error('Invalid email or password')
    }

    const checkPassword = await user.validatePassword(password)

    if(!checkPassword) {
        throw new Error('Invalid email or password')
    }


    const payload = {_id: user._id, email: user.email};
    const token = await jwt.sign(payload, SECRET)
    
    return {
        _id: user._id,
        email: user.email,
        accessToken: token
        
    }
}

exports.addToCart = async (_id,watchId) => {
    const updatedUser = await User.findOneAndUpdate(
        { _id },
        { $push: { shopCart: watchId } },
        { new: true }
      );
    
      if (!updatedUser) {
        throw new Error('Invalid user');
      }
    
      return updatedUser;
}

exports.getAllCartProducts = async (userId) => {
const cartItems = await User.findById(userId).populate('shopCart')

return cartItems.shopCart

}