const mongoose = require("mongoose")
const authSchema = mongoose.Schema({
    userName:String,
    userEmail:String,
    userPassword:String
})
const AuthModel = mongoose.model("User",authSchema)
module.exports = {AuthModel}