const mongoose = require("mongoose")
const crypto = require("crypto")
const { v4: uuidv4 } = require('uuid')
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
},{timestamps:true})

userSchema.virtual("fullname").get(function(){
    return this.name.first + " " + this.name.last
})

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv4()
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        this._password
    })

userSchema.methods = {

    authentication:function(plainpassword){
        return this.encry_password === this.securePassword(plainpassword)
    },

    securePassword:function(plainpassword){
        if(!plainpassword){
            return ""
        }
        try {
            return crypto.createHmac('sha256', this.salt)
                   .update(plainpassword)
                   .digest('hex')
        } catch (error) {
            return ""
        }
    }
}




module.exports = mongoose.model("User",userSchema)