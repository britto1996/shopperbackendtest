require('dotenv').config()
const express = require("express")
const app = new express()

//import middleware files
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let cors = require('cors')
//port number to run server
const port = 3000

//use middleware files
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//import router files

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")

//db connection
const mongoose = require("mongoose")


//connect a database called shopperonline
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex:true}).then(()=>{
    console.log("DB CONNECTED")
})

//my routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)


//use all the middleware files
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//collect mongoose data collections




//listen the port number

app.listen(port,()=>{
    console.log(`The port is running on port ${port}`)
})