
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

exports.getCategory = (req,res)=>{
    return res.json(req.category)
}

exports.getAllCategories = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
           return res.status(400).json({
                err:"Categories not found"
            })
        }
        res.json(categories)
    })
}

exports.updatedCategory = (req,res)=>{
    const category = req.category
    const updatedCate = req.body.category.name

    category.save((err,updateItems)=>{
        if(err){
            res.status(400).json({
                err:"category doesn't updated"
            })
        }
        res.json(updateItems)
    })
}