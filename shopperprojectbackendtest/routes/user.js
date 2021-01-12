



//import elements from user in controllers

const {getUserById,getUser,userUpdate,isOrder} = require("../controllers/user")
const {isSignedIn,isAuthentication,isAdmin} = require("../controllers/auth")




//import some elements from auth in controllers



//import express

const express = require("express")
const router = express.Router()

//import user model

const User = require("../models/user")
const { Mongoose } = require("mongoose")

//use getuserbyid and getuser middleware

router.param("userId",getUserById)

router.get('/user/:userId',isSignedIn,isAuthentication,getUser)

router.get('/orders/user/:userId',isSignedIn,isAuthentication,isOrder)

router.put('/user/:userId',isSignedIn,isAuthentication,userUpdate)




module.exports = router