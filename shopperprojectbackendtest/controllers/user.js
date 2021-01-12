//import user model


const User = require("../models/user")
const Order = require("../models/order")


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

exports.isOrder = (req,res)=>{
    Order.find({user:req.profile._id})
        .populate("user","_id name")
        .exec((err,order)=>{
            if(err){
               return res.status(400).json({
                    err:"user order is empty"
                })
            }
           return res.json({
                message:order
            })
        })
}

exports.pushOrderInPurchaseList = (req,res,next)=>{
    
    
    const order = new Order(req.body)

    let purchases = []


    req.body.order.products.forEach(product=>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transcaction_id:req.body.order.transcaction_id

        })
    })

    //store purchases into the mongodb

    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:purchases}},
        {new:true},
        (err,purchases)=>{
            if(err){
               return res.status(400).json({
                    err:"unable to save purchase list"
                })
            }
            next()
        }
    )

    
}