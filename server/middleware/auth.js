const User = require('../Model/User');
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require("jsonwebtoken")

exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return next(new ErrorHandler('Please Login to continue', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next()
})