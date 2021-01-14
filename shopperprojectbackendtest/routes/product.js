//import express and router

const express = require("express");
const router = express.Router();

//import product model

const Product = require("../models/product");

//import logic of user , auth and products

const { getProductById,createProducts } = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const {
  isSignedIn,
  isAuthentication,
  isAdmin,
} = require("../controllers/auth");

router.param("userId",getUserById)
router.param("productId",getProductById)

router.get("/product/create/:productId",createProducts)


module.exports = router;
