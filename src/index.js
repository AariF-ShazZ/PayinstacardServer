const express  = require("express")
require("dotenv").config()
const port = process.env.port || 5000
const app = express()
const connection = require("./configs/db.js")
const {authRoute} = require("./routes/auth.route.js")
app.use(express.json())

app.get("/",(req,res)=>{ 
    res.send("This is the home page.....")
})

app.use("/auth",authRoute)

app.listen(port,async ()=>{
    try {
        await connection
        console.log("Connected to the DB...");
    } catch (err) {
        console.log("Error while connecting to the DB: " + err);
    }
    console.log(`Server running at port ${port}`)
})



