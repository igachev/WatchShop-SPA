const jwt = require('../promisifyToken/jsonwebtoken.js');
const SECRET = process.env.SECRET
require("dotenv").config();

exports.authentication = async (req,res,next) => {
    const token = req.header['X-Authorization'];

    if(token) {
        try {
            const decodedToken = await jwt.verify(token,SECRET);
            req.user = decodedToken;
            req.isAdmin = decodedToken.isAdmin;
        } catch (err) {
            res.status(401).json({message: 'Invalid token'})
        }
    }

    next()
}

exports.adminOnly = (req, res, next) => {
    if (req.user?.isAdmin) {
      next(); // User is an admin, proceed to the next middleware/route handler
    } else {
      res.status(403).json({ message: 'Access denied. Admin only.' });
    }
  };