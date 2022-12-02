const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const User = require('./../modals/User');


const signToken =id =>{
    return  jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword

    });
    const token = signToken(newUser._id)
    res.status(201).json({
        status: "success",
        token
    })
})
exports.login = catchAsync(async(req,res,next)=>{
    console.log(req.body);
    const {email,password} = req.body;


    const user =await User.findOne({email}).select('+password')
 
    if(!user || !await user.correctPassword(password,user.password)){
        return next(console.log("not"))
    }

    const token =signToken(user._id)
    res.status(200).json({
        status:"success",
        token
    })


})