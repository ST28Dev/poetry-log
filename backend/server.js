const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

const app = express()

const PORT = process.env.PORT || 8000
mongoose.connect(process.env.DB_CONNECT)

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/users",require("./routes/userRoutes"))
app.use("/poems",require("./routes/poemRoutes"))

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})