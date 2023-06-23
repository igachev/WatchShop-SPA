const mongoose = require('mongoose')
require("dotenv").config();

async function setupDatabase() {
    mongoose.set('strictQuery',false)
    await mongoose.connect('mongodb://127.0.0.1:27017/watchShop')
    console.log('db connected');
}

module.exports = setupDatabase