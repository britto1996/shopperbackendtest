require('dotenv').config()
const express = require("express")
const app = new express()
const port = 3000


//db connection
const mongoose = require("mongoose")

//import user model 
const User = require("./models/user")
//connect a database called shopperonline
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex:true}).then(()=>{
    console.log("DB CONNECTED")
})

//test to route a file using postman

app.get("/home",(req,res)=>{
   return res.json({
        message:"user can access home field"
        
    })
   
})

//post the registered form fields in postman
app.post("/signup",(req,res,next)=>{
   return res.json({
        message:"user"
    })
})

app.get("/signin",(req,res)=>{
   return res.json({
        message:"user can access dashboard"
    })
})

app.get("/signout",(req,res)=>{
   return res.json({
        message:"user loggedout successfully"
    })
})

app.listen(port,()=>{
    console.log(`The port is running on port ${port}`)
})