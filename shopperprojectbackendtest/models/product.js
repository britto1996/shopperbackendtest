const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:32,

    },
    description:{
        type:String,
        maxlength:2000
    },
    price:{
        type:Number
    },
    category:{
        type:ObjectId,
        ref:"Category"
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number
    },
    photo:{
        type:Buffer,
        contentType:String
    }
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)