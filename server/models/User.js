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
    userPurchaseHistory: [
        {
            watchId: {
                type: mongoose.Types.ObjectId,
                ref:'Watch',
                required:[true,'watchId is required']
            },
            date: {
                type: Date,
                default: Date.now
            },
           
            quantity: {
                type: Number,
                min: [1,'quantity must be larger than 0'],
                required:[true,'quantity is required']
            },
            totalSum: {
                type: Number,
                required:[true,'totalSum is required']
            },
            name: {
                type: String,
                required:[true,'name is required']
            },
            phone: {
                type: String,
                required:[true,'phone is required']
            },
            address: {
                type: String,
                required:[true,'address is required']
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