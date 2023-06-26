const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'email is required'],
    },
    
    password: {
        type: String,
        required: [true,'password is required'],
    },
    
})

userSchema.pre('save', async function() {
this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.validatePassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}

userSchema.methods.isAdmin = function() {
    const result = this.email == ADMIN_EMAIL
    return result
}

const User = mongoose.model('User',userSchema)

module.exports = User;