const { ProductCart , Order } = require("../models/order")
const product = require("../models/product")

exports.getOrderById = (req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
           return res.status(400).json({
                err:"No products ordered"
            })
        }
        req.order = order
        next()
    })
}

exports.createProduct = (req,res)=>{
    req.body.order.user = req.profile
    let order = new Order(req.body.order)
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                err:"order failed to store in db"
            })
        }
        res.json({
            message:order
        })
    })
}

exports.getAllOrder = (req,res)=>{
    Order.find()
    .populate("user" , "_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
            err:"order failed to store in db"
        })
        }
        res.json({
            message:order
        })
        
        
    })
}

exports.getStatus = (req,res)=>{
    res.json(Order.schema.path("status").enumValues)
}

exports.updateOrder = (req,res)=>{
    Order.updateMany({id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
            return res.json({
                 err:"order not updated"
            })
            }
             res.json({
            message:order
        })
           
        },
       
        )
}