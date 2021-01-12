const category = require("../models/category")
const Category = require("../models/category")

exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err){
           return res.status(400).json({
                err:"checking category not found"
            })
        }
        req.category = category
        next()
    })


}

exports.createCategory = (req,res)=>{
    const category = new Category(req.body)
    category.save((err,category)=>{
        if(err || !category){
           return res.json({
                err:"UNABLE TO SAVE CATEGORY"
            })
        }
        res.json({
            message:category
        })
    })
}