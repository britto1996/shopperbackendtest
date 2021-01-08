const express = require("express")
const router = express.Router()

const {signup,signin,signout,isSignedIn} = require("../controllers/auth")
//custom error messages
const { check } = require("express-validator")
const user = require("../models/user")

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

//add a test route field

router.get("/testroute",isSignedIn,(req,res)=>{
    res.json({
        message:req.auth
    })
})

router.get("/signout",signout)


module.exports = router;