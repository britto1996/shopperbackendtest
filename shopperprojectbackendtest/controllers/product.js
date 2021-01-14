//import formidable

const formidable = require("formidable");

//import lodash

const _ = require("lodash");

//import file system

const fs = require("fs");

//import product model

const Product = require("../models/user");

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

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
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

    res.json({
      message: fields,
    });

    let product = new Product(fields);
    if (files.photo) {
      if (files.photoSize > 3000000) {
        res.status(400).json({
          err: "file size is too big",
        });
      }
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
