const jwt = require('../promisifyToken/jsonwebtoken.js');
const SECRET = process.env.JWT_SECRET
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
require("dotenv").config();

exports.authentication = async (req,res,next) => {
    if(req.headers['authorization'] !== undefined) {
    const token = req.headers['authorization'];
 
    if(token) {
        try {
            const decodedToken = await jwt.verify(token,SECRET);
            
            req.user = decodedToken;
            req.isAdmin = decodedToken.email === ADMIN_EMAIL;
           
        } catch (err) {
            res.status(401).json({message: 'Invalid token'})
            return
        }
    }
    }
    next()
}

exports.isAuthorized = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized access' })
    }
  
    next()
  }

exports.adminOnly = (req, res, next) => {
    if (req?.isAdmin) {
     // res.status(200).json({isAdmin: req.user.isAdmin})
      next(); // User is an admin, proceed to the next middleware/route handler
    } else {
      res.status(403).json({ message: 'Access denied. Admin only.' });
    }
  };