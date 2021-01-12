const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory } = require("../controllers/category");
const {
  isSignedIn,
  isAuthentication,
  isAdmin,
} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthentication,
  isAdmin,
  createCategory
);

module.exports = router;
