const express = require("express")
const app = express()
const port = 3000

//test to route a file using postman

app.get("/home",(req,res)=>{
    res.json({
        message:"user can access home field"
    })
})

app.listen(port,()=>{
    console.log(`The port is running on port ${port}`)
})