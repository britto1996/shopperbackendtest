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
const ProductCart = mongoose.model("ProductCart",ProductCartSchema)
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
    status:{
        type:String,
        default:"Recieved",
        enum:["delivered","recieved","cancelled","shipped","processing"]
    },
    address:{
        type:String
    }
},{timestamps:true})

const Order = mongoose.model("Order",orderSchema)

module.exports = { ProductCart,Order }
