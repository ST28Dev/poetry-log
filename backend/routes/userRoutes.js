const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const User = require("../models/User")
const {getUsers,registerUser,loginUser, verifyUser,resetPassword, resetPasswordConfirm} = require("../controllers/userController")
const {protect} = require("../middleware/auth")

// router.get("/:id", getUsers)

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/verify/:verification_id", verifyUser)

router.post("/reset_password",resetPassword)

router.post("/reset_password/:id/:token",resetPasswordConfirm)

// router.get("/protected",protect,(req,res)=>{
//     res.json({
//         message: "Protected route accessed"
//     })
// })

module.exports = router