const express = require("express")
const app = new express()
const port = 3000

//test to route a file using postman

app.get("/home",(req,res)=>{
    res.json({
        message:"user can access home field"
    })
})

app.get("/signup",(req,res)=>{
    res.json({
        message:"user registered successfully"
    })
})

app.get("/signin",(req,res)=>{
    res.json({
        message:"user can access dashboard"
    })
})

app.get("/signout",(req,res)=>{
    res.json({
        message:"user loggedout successfully"
    })
})

app.listen(port,()=>{
    console.log(`The port is running on port ${port}`)
})