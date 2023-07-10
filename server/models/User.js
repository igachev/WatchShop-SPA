const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'email is required'],
    },
    
    password: {
        type: String,
        required: [true,'password is required'],
    },
    userBoughtHistory: [
        {
            watchId: {
                type: mongoose.Types.ObjectId,
                ref:'Watch'
            },
            date: {
                type: Date,
                default: Date.now
            },
           
            quantity: {
                type: Number,
                min: 1
            },
            totalSum: {
                type: Number
            },
            name: {
                type: String
            },
            phone: {
                type: String
            },
            address: {
                type: String
            }
        }
    ],
    shopCart: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Watch'
        }
    ],
})

userSchema.pre('save', async function() {
this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.validatePassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}


const User = mongoose.model('User',userSchema)

module.exports = User;