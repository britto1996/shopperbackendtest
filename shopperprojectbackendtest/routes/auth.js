const express = require("express")
const router = express.Router()

const {signup,signin,signout} = require("../controllers/auth")
//custom error messages
const { check } = require("express-validator")

router.post("/signup",[
    check('name').isLength({min:3})
    .withMessage("name must contain atleast 3 characters"),
    
    check('email').isEmail()
    .withMessage("name must contain atleast 3 characters"),

    check('password').isLength({min:6})
    .withMessage("password must contain atleast 6 characters")
],signup)

router.post("/signin",[
    check('email').isEmail()
    .withMessage("Invalid email"),

    check('password').isLength({min:6})
    .withMessage("password must contain atleast 6 characters")
],signin)

router.get("/signout",signout)

module.exports = router;