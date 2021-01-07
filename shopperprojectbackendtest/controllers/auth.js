
//import user model

const User = require("../models/user")


//register field

exports.signup = (req,res)=>{
    let user = new User(req.body)
    console.log(user)
    user.save((err,user)=>{
        if(err || !user){
            res.json({
                err:"UNABLE TO SAVE IN A DB"
            })
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id,
            purchase:user.purchase
        })
    })
}


//logout field

exports.signout = (req,res)=>{
    res.json({
        message:"user log out successfully"
    })
}