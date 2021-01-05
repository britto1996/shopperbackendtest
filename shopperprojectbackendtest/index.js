const express = require("express")
const app = express()
const port = 3000

app.listen(port,()=>{
    console.log(`The port is running on port ${port}`)
})