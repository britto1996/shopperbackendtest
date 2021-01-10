//import user model

const User = require("../models/user")


//extract id from the getUserById

const getUserById = (req,res,next,_id)=>{
    User.findById(_id).exec((err,user)=>{
        if(err||!user){
           return res.status(400).json({
                err:"User in DB not found"
            })
        }
        req.profile = user
        next()
    })
}

const getUser = (req,res)=>{
    return res.json(req.profile)
}