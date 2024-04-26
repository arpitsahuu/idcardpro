const {catchAsyncErron} = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

// Authenticate the User 
const isAuthenticatedBoth = catchAsyncErron(async(req,res,next) =>{
    try {
        const token = req.header("Authorization");
      
       
        // Ckeck if Token Exit in req or header
        if(!token){
            return next(new errorHandler("Unauthorized request",401))
        }
    
        // decode JWT Token 
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded)

        const decodeSchool = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded)

        
        if(!decoded && !decodeSchool){
            return next(new errorHandler("Invalid Access Token",400))
        }

        if(decoded){
            req.id = await decoded._id;

        } else {
            req.id = await decodeSchool._id
        }
    
        next();
    } catch (error) {
        next(new errorHandler(error.message || "Invalid Access Token"));
    }
})

module.exports = isAuthenticatedBoth;