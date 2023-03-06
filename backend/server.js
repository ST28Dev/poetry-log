const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const path = require('path')

const app = express()

const PORT = process.env.PORT || 8000
mongoose.connect(process.env.DB_CONNECT)

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/users",require("./routes/userRoutes"))
app.use("/poems",require("./routes/poemRoutes"))

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*',(req,res)=>{
        return res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html'))
    })
}
else{
    app.get("/",(req,res)=>{
        return res.send('Need to set to production.')
    })
}

//cmt
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})