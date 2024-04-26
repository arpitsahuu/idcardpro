const {catchAsyncErron} = require("../middlewares/catchAsyncError");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

// Authenticate the User 
const isAuthenticated = catchAsyncErron(async(req,res,next) =>{
    try {
        const token = req.header("Authorization")|| req.cookies?.token ;
        console.log(token)
      
       
        // Ckeck if Token Exit in req or header
        if(!token){
            return next(new errorHandler("Unauthorized request",401))
        }
    
        // decode JWT Token 
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded)

        
        if(!decoded){
            return next(new errorHandler("Invalid Access Token",400))
        }
    
        req.id = await decoded._id;
        next();
    } catch (error) {
        next(new errorHandler(error.message || "Invalid Access Token"));
    }
})

module.exports = isAuthenticated;