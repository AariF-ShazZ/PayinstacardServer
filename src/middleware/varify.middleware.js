const jwt = require("jsonwebtoken")
require("dotenv").config()
const varifyUser = (req,res,next) => {
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token,process.env.key)
        if(decoded){
            next()
        }else{
            res.send("Please Login First")
        }

    }else{
        res.send("Please Login First")       
    }
}
module.exports={varifyUser}