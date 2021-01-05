const mongoose = require("mongoose")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const saltRounds = 10
const userSchema = new mongoose.Schema({
    name:{
        first:String,
        last:String
    },
    email:{
        type:String,
        lowercase:true
    },
    encry_password:{
        type:String
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchase:{
        type:Array,
        default:[]
    }
})

userSchema.virtual("fullname").get(()=>{
    return this.name.first + " " + this.name.last
})

//password must be save assynchronous
userSchema.pre("save",(next)=>{
    const user = this

//hash the password if it has been modified(or new)
if(!user.isModified("password")){
    return next()
}

//generate a salt
bcrypt.genSalt(saltRounds,(err,salt)=>{
    if(err){
        return next(err)
    }

//hash the password using new salt
bcrypt.hash(user.encry_password,salt,(err,hash)=>{
    if(err){
        return next(err)
    }
//override the cleartext password with the hashed one
    user.encry_password = hash
    next()
})
})

})

userSchema.methods = {
    securePassword:(userpassword,candidatepassword)=>{
        bcrypt.compare(userpassword,this.encry_password,(err,isMatch)=>{
            candidatepassword(null,isMatch)
        })
    }
}




module.exports = mongoose.model("User",userSchema)