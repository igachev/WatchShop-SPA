const jwt = require('../promisifyToken/jsonwebtoken.js');
const SECRET = process.env.SECRET
require("dotenv").config();

exports.authentication = async (req,res,next) => {
    const token = req.header['X-Authorization'];

    if(token) {
        try {
            const decodedToken = await jwt.verify(token,SECRET);
            req.user = decodedToken
        } catch (err) {
            res.status(401).json({message: 'Invalid token'})
        }
    }

    next()
}
