const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler( async (req, res) => {
    let {name, email, password} = req.body;

    // Check if account already exists
    let checkUser = await User.findOne({email});
    if (checkUser) {
        throw new Error('Account already exists');
    }

    //hash password and create account
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.json({
        name : user.name,
        email : user.email
    });
})

const loginUser = asyncHandler( async (req, res) => {
    let {email, password} = req.body;

    if (!email || !password) {
        throw new Error('Enter all fields');
    }

    //find user in database

    const user = await User.findOne({email});

    if(!user) {
        throw new Error('Email incorrect');
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
        throw new Error('Email or password incorrect');
    }

    //in case user found

    res.json({
        _id : user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accessToken: generateToken(user.id)
    })
})


const generateToken = (id) => {
    return jwt.sign({id}, 'lmfao');
}


module.exports = {
    registerUser,
    loginUser
}