
//import elements from user in controllers

const {getUserById,getUser} = require("../controllers/user")
const {isSignedIn,isAuthentication,isAdmin} = require("../controllers/auth")
//import some elements from auth in controllers



//import express

const express = require("express")
const router = express.Router()

//import user model

const User = require("../models/user")

//use getuserbyid and getuser middleware

router.param("userId",getUserById)

router.get('/user/:userId',isSignedIn,isAuthentication,getUser)


module.exports = router