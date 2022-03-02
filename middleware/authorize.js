const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

module.exports = asyncHandler(async (req,res, next) => {
    
    //check if token exists
    if (! req.headers.authorization) {
        res.status(401);
        throw new Error('Unauthorized, no token');
    }

    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');
    next();
})