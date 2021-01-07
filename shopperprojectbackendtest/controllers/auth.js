
//import user model

const User = require("../models/user")

//import validation field to provide error messages

const { validationResult } = require("express-validator")

//register field

exports.signup = (req,res)=>{
    let errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
       return res.json({
            err:errors.array()[0].msg
        })
    }
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
            purchase:user.purchase,
            id:user._id
        })
    })
}


//logout field

exports.signout = (req,res)=>{
    res.json({
        message:"user log out successfully"
    })
}