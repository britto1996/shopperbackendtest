//import express and router

const express = require("express");
const router = express.Router();

//import product model

const Product = require("../models/product");

//import logic of user , auth and products

const {
  getProductById,
  createProducts,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const {
  isSignedIn,
  isAuthentication,
  isAdmin,
} = require("../controllers/auth");

router.param("userId", getUserById);
router.param("productId", getProductById);

//create product
router.post("/product/create/:userId", createProducts);

//read product
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete product
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthentication,
  isAdmin,
  deleteProduct
);

//update product
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthentication,
  isAdmin,
  updateProduct
);

//listing product

router.get("/products",getAllProducts)


module.exports = router;
