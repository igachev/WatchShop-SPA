const express = require('express')

const app = express()

const setupDatabase = require('./config/initDatabase.js')


setupDatabase()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`server started...`);
    })
})