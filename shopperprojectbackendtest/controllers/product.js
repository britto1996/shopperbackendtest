//import formidable

const formidable = require("formidable");

//import lodash

const _ = require("lodash");

//import file system

const fs = require("fs");

//import product model

const Product = require("../models/product");
const product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, products) => {
    if (err) {
      return res.status(400).json({
        err: "product not found",
      });
    }
    req.products = products;
    next();
  });
};

exports.createProducts = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
     return res.status(400).json({
        err: "images not found",
      });
    }

    //destructure the fields

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        err: "please fill out all fields",
      });
    }

   
    let product = new Product(fields);
    // console.log(product)
    if (file.photo) {
      if (file.photoSize > 3000000) {
         res.status(400).json({
          err: "file size is too big",
        });
      }
      // console.log(file.photo)

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.contentType;


      
    }

    
    //save product images to the db

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          err: "product doesn't save in to db",
        });
      }
      res.json({
        message: product,
      });
    });
  });
};

exports.getProduct = (req,res)=>{
    req.product.photo = undefined
    return res.json(
      {item:req.product}
      )
}

exports.photo = (req,res,next)=>{

    if(req.product.photo.data){
      res.set("Content-Type",req.product.photo.contentType)
      return res.json({
        photoItem:req.product.photo.data
      })
    }
    next()
}

exports.deleteProduct = (req,res)=>{
    let product = req.product
    product.remove((err,deleteProduct)=>{
        if(err){
         return res.status(400).json({
            err:"deletion of the product failed"
          })
        }
        res.json({
          message:`The product ${deleteProduct} successfully`
        })
    })
}

exports.updateProduct = (req,res)=>{

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
     return res.status(400).json({
        err: "images not found",
      });
    }

    //destructure the fields

  

    
    //updation code
    let product = req.product
    product = _.extend(product,fields)

    // console.log(product)
    if (file.photo) {
      if (file.photoSize > 3000000) {
         res.status(400).json({
          err: "file size is too big",
        });
      }
      // console.log(file.photo)

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.contentType;


      
    }

    
    //save product images to the db

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          err: "product doesn't updated",
        });
      }
      res.json({
        message: product,
      });
    });
  });  
}

//listing of products

exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit):8
    let updatedBy = req.query.updatedBy ? req.query.updatedBy : "_id"
    Product.find()
    .select("-photo")
    .sort([[updatedBy,"asc"]])
    .populate("category")
    .limit(limit)
    .exec((err,products)=>{
      if(err){
        return res.status(400).json({
          message:"Product not found"
        })
      }
      res.json({
        message:products
      })
    })
}