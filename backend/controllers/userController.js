const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

// @desc  Register a new user
// @route /api/users
// @acess Public 
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if user already exists
    const userExist = await User.findOne({ email })

    if(userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Has password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new errpr('Invalid user data')
    }
}) 

// @desc  Login a new user
// @route /api/users/login
// @acess Public 
const loginUser = asyncHandler(async(req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser,
}