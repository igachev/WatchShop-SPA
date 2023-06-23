const User = require('../models/User.js')

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