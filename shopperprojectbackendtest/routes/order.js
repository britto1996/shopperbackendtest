//import elements from user in controller

const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");

//import elements from auth in controllers

const {
  isSignedIn,
  isAuthentication,
  isAdmin,
} = require("../controllers/auth");

//import elements from product

const { productSold } = require("../controllers/product");

//import elements from order

const {
  getOrderById,
  createProduct,
  getAllOrder,
  getStatus,
  updateOrder
} = require("../controllers/order");

//import express and router

const express = require("express");
const router = express.Router();

router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual routes

//Create route
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthentication,
  pushOrderInPurchaseList,
  productSold,
  createProduct
);

//Read route
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthentication,
  isAdmin,
  getAllOrder
);

//Status router
router.get(
  "/order/status/:userId",
  
  isSignedIn,
  isAuthentication,
  isAdmin,
  
  getStatus)

//Update router
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthentication,
  isAdmin,
  updateOrder
)

module.exports = router;
