const jwt = require('jsonwebtoken');
const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const { catchAsyncErron } = require('./catchAsyncError');

exports.isAdmin = catchAsyncErron(async (req, res, next) => {
    
    try {
        const id = req.id;
        const admin = await User.findById(id).exec();
        if(!admin.isAdmin){
            res.status(401).json({ message: 'UNAUTHORIZED REQUEST' });
        }
        next();
        
    } catch (error) {
        return next(new errorHandler('Invalid or expired token. Please login again.', 401));
    }
});