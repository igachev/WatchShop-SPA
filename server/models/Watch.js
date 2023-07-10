const mongoose = require('mongoose')

const watchSchema = new mongoose.Schema({
    brand: {
        type:String,
        required:[true,'brand is required']
    },
    model: {
        type:String,
        required:[true,'model is required']
    },
    image: {
        type: String,
        required:[true,'image is required']
    },
    battery: {
        type: String,
        required:[true,'battery is required']
    },
    mechanism: {
        type: String,
        required: [true,'mechanism is required'],
        enum: {
            values: ["mechanical", "automatic", "quartz"],
            message: 'Invalid mechanism'
         }
    },
    price: {
        type: Number,
        required:[true,'price is required']
    },
    strap: {
        type:String,
        required:[true,'strap is required']
    },
    glass: {
        type:String,
        required:[true,'glass is required']
    },
    waterResistance: {
        type:String,
        required:[true,'waterResistance is required']
    },
    rating: [
        {
            userId: {
                type: String
            },
            userRating: {
                type: Number
            }
        }
    ]
    
})

const Watch = mongoose.model('Watch',watchSchema)

module.exports = Watch;