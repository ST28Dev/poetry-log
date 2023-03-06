const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

const app = express()
const path = require("path")

const PORT = process.env.PORT || 8000
mongoose.connect(process.env.DB_CONNECT)

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use("/users",require("./routes/userRoutes"))
app.use("/poems",require("./routes/poemRoutes"))

if(process.env.NODE_ENV){
    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.get("*", (req,res)=> res.sendFile(path.resolve(__dirname, '../frontend','build','index.html')))
}
else{
    app.get("/",(req,res) => res.send('Please set to production'))
}

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})