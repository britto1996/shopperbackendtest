const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategories,
  updatedCategory,
  removeCategory
} = require("../controllers/category");
const {
  isSignedIn,
  isAuthentication,
  isAdmin,
} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//create

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthentication,
  isAdmin,
  createCategory
);

//read

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

//update
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthentication,
  isAdmin,
  updatedCategory
);

//delete

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthentication,
  isAdmin,
  removeCategory
);


module.exports = router;
