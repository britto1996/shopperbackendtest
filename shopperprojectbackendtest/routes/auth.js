const express = require("express")
const router = express.Router()



router.get("/signout",(req,res)=>{
    res.json({
        message:"user logged out successfully"
    })
})

module.exports = router;