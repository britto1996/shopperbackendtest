const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const ProductCartSchema = new mongoose.Schema({
    product:{
        type:{ObjectId},
        ref:"Product"
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    count:{
        type:Number
    },
    amount:{
        type:Number
    }
})
const orderSchema = new mongoose.Schema({
    products:[ProductCartSchema],
    transcaction_id:{
        type:Number
    },
    order:{
        type:Number
    },
    product:{
        type:{ObjectId},
        ref:"Product"
    },
    user:{
        type:{ObjectId},
        ref:"User"
    },
    address:{
        type:String
    }
})

module.exports = mongoose.model("Order",orderSchema)
