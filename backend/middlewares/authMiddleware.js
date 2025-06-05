const jwt = require("jsonwebtoken");
const User = require("../models/User");



const authMiddleware = async (req,res,next)=>{

    // Get the token from the request headers using req.headers.authorization means the header is called authorization
    //the header word is there because we created a header variable in the frontend in which the name is authorization and the value is the token
  
    
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'No token provided'});
    }
    try{
        
        
        const token =req.headers.authorization.split(' ')[1];
        
        // The token is usually in the format Bearer <token>
        // We will split the token and get the second part
        // The first part is the word Bearer and the second part is the token

        const decoded =jwt.verify(token, process.env.JWT_SECRET);
        // the token is verified by comparing it with the secret key
        // The decoded token will contain the user id and other information

        // We will use the user id to find the user in the database
        const user = await User.findById(decoded.id);
        console.log('User found:', user);


        req.user = user; // We will attach the user object to the request object

        next();// Call the next middleware

       

    }
    catch(err){return res.status(401).json({message: 'User not found'});}
}


// Middleware to authenticate JWT token
// This middleware will check if the token is valid and if the user exists in the database
// If the token is valid and the user exists, it will call the next middleware
// If the token is invalid or the user does not exist, it will return an error response
// This middleware will be used in the routes that require authentication
// the next middleware is the one that will handle the request
// and send back the response to the frontend

const adminOnly = (req,res,next)=>{
    if (req.user && req.user.role === 'admin') {
        next(); // Proceed
    } else {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
}

module.exports = {authMiddleware, adminOnly};
// The authMiddleware function is used to authenticate the user by verifying the JWT token
// The adminOnly function is used to restrict access to the route to admins only