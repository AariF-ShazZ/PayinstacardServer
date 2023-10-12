const express = require("express")
const authRoute = express.Router()
const { signUp, login, readUsers } = require("../controllers/auth.controllers")
const { varifyUser } = require("../middleware/varify.middleware")

authRoute.post("/register",signUp)
authRoute.post("/login", login)
authRoute.get("/read",varifyUser,readUsers)
module.exports={authRoute}