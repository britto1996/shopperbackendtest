//import user model

const user = require("../models/user")
const User = require("../models/user")


//extract id from the getUserById

 exports.getUserById = (req,res,next,_id)=>{
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

 exports.getUser = (req,res)=>{

    //TODO:GET BACK HERE FOR PASSWORD
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}

exports.userUpdate = (req,res)=>{
    User.findByIdAndUpdate({_id:req.profile._id},
        {$set:req.body},
        {new:true , useFindAndModify:false},
        
        (err,user)=>{
            if(err||!user){
               return res.json({
                    err:"user doesn't authorise to update"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            res.json({
                message:user
            })
        })
}