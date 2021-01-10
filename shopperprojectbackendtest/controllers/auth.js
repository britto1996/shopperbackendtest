

//import json webtoken

const jwt = require('jsonwebtoken')

//import express json 

const expressJwt = require('express-jwt')

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


//login field

exports.signin = (req,res)=>{
    const {email,password} = req.body
    const user = new User(req.body)
    let errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.json({
            err:errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err||!user){
            return res.json({
                err:"Invalid email"
            })
        }
        if(!user.authentication(password)){
           return res.json({
                err:"email or password does not match"
        })
    }

     //set token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET)

    //put token in to the cookie
    res.cookie("token",token,{expire:new Date() + 9999})

    //display user model to the front end
    const {_id,email,name,role} = user
    return res.json({
        token,user:{_id,name,email,role}
    })


    })
     
    
   




    
}




    


//logout field

exports.signout = (req,res)=>{
    res.clearCookie("token")
    res.json({
        message:"user log out successfully"
    })
}


//protected route field

exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty:"auth"
})


//custom middlewares

 exports.isAuthentication = (req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        res.json({
            err:"Access denied"
        })
        
    }
    next()
   
}

 exports.isAdmin = (req,res,next)=>{
    const user = new User(req.body)
    if(user.role==0){
        res.json({
            err:"Can't access this page"
        })
    }
    next()
    
}




