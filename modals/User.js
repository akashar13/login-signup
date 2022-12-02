const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"],
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    password:{
        type:String,
        required:[true,'Password please'],
        minlength:8,
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,'Password please'],
        validate:{
            validator: function (el){
                return el ===this.password
            },
            message:'Passwords does not match'
        }
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword =undefined;
    next();
})
userSchema.methods.correctPassword = async function(candidate,user){
    return await bcrypt.compare(candidate,user)
}
const User = mongoose.model('User',userSchema)

module.exports = User