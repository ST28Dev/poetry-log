const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const {v4: uuidv4} = require("uuid")
const { findOne, findOneAndReplace, findOneAndUpdate } = require("../models/User")


//for user login/registration
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//function to send verification email to user
const sendEmail = (email,verification_id, username)=>{
    return new Promise((resolve,reject)=>{
        const Transport = nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASS
            }
        })
    
        const mailOptions = {
            from: "PoetryLog "+process.env.APP_EMAIL,
            to: email,
            subject: "Welcome to PoetryLog!",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>Verify Your Account</h1>
                <p>Dear ${username},</p>
                <p>Welcome to PoetryLog!</p>
                <a href="http://localhost:3000/users/verify/${verification_id}">Click here to verify your account!</a>
                <p>Thank you,</p>
                <p>PoetryLog</p>
            </body>
            </html>
            `
        }
    
        Transport.sendMail(mailOptions, (err,res)=>{
            if(err){
                console.log(err)
                return reject({message: "An error has occurred"})
            }
            return resolve({message: "Email sent successfully"})
        })
    })
}

const getUsers = async (req,res)=>{
    const {id} = req.params

    const user = await User.findOne({_id: id})

    res.status(200).json(user)
}

const registerUser = async(req,res)=>{
    const {email,password,username} = req.body

    if(!email || !password || !username){
        res.status(400).json({
            message: "Missing email, password, or username"
        })
    }
    else {
        const emailExists = await User.findOne({email})
        const usernameExists = await User.findOne({username})

        //check if a user exists for the provided email or username
        if(emailExists){
            return res.status(400).json({
                message: "A user already exists for the provided email."
            })
        }

        //check if the username is already taken
        if(usernameExists){
            return res.status(400).json({
                message: "Username you have provided is already taken."
            })
        }

        //insert credentials
        //hash password using bcrypt
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password,salt)

        const verification_id = uuidv4()

        const user = await User.create({
            email,
            password: hashedPassword,
            username,
            verified: false,
            verification_id
        })
        
        sendEmail(email, verification_id, user.username)

        user ? res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            token: generateToken(user._id),
            verified: user.verified
        }) : res.status(400).json({
            message: "Invalid user data"
        })
        
    }
}

const loginUser = async(req,res)=>{
    const {email,password,username} = req.body
    if((!email && !username) || !password){
        res.status(400).json({
            message:"Missing either email/username or password."
        })
    }
    else{
        const user = await User.findOne({
            $or: [{email},{username}]
        })

        if(user){
            if(!user.verified){
                const verif = uuidv4()
                

                await User.findOneAndUpdate({email: user.email},{
                    verification_id: verif
                })
    
                //could be the case where user only provided username rather than email
                //use the user obj
                sendEmail(user.email, verif, user.username)
    
                return res.status(400).json({message: "Unverified account. Please check your email for verification link."})
            }

            const match = await bcrypt.compare(password,user.password)
            match ? res.status(200).json({
                _id: user._id,
                email: user.email,
                username: user.username,
                verified: user.verified,
                token: generateToken(user._id)
            }) : res.status(400).json({message: "Incorrect credentials provided. Try again."})
        }
        else
            return res.status(400).json({message: "Incorrect email or password, or user does not exist."})
    }
}


//method to verify user when they click the verif link
const verifyUser = async (req,res)=>{
    const {verification_id} = req.params

    const user = await User.findOne({verification_id})
    
    if(user){
        await User.findByIdAndUpdate(user._id, {
            verified: true
        })


        console.log("User verified")
        res.status(200).json({message: "User successfully verified"})
    } else{
        res.status(404).json({message: "User not found or an unexpected error has occurred"})
    }
}

//reset password
const sendResetEmail = (email,link,username)=>{
    return new Promise((resolve,reject)=>{
        const Transport = nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASS
            }
        })
    
        const mailOptions = {
            from: "PoetryLog "+process.env.APP_EMAIL,
            to: email,
            subject: "Reset your Password",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>Reset your Password</h1>
                <p>Dear ${username},</p>
                <p>You can click this link to reset your password:</p>
                <p><a href="${link}">${link}</a></p>
                <h4>This link will expire in 15 minutes. You will need to request another one time reset password email once this link expires.</h4>
                <p>Thank you,</p>
                <p>PoetryLog</p>
            </body>
            </html>
            `
        }
    
        Transport.sendMail(mailOptions, (err,res)=>{
            if(err){
                console.log(err)
                return reject({message: "An error has occurred"})
            }
            return resolve({message: "Email sent successfully"})
        })
    })
}

const resetPassword = async(req,res)=>{
    const {email} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({
            message: `User with the email ${email} not found.`
        })
    }

    //generate a one time link using jwt and user password (which is hashed)
    const secret = process.env.JWT_SECRET + user.password

    const token = jwt.sign({
        email: user.email,
        id: user._id
    },secret,{expiresIn: "15m"})

    const link = `http://localhost:3000/users/reset_password/${user._id}/${token}`

    const username = user.username
    sendResetEmail(email,link,username)

    return res.status(200).json({message: "Email sent"})
}

const resetPasswordConfirm = async(req,res)=>{
    //retrieve the user id and token from params
    const {id,token} = req.params
    const {password} = req.body

    //verify id and token
    const user = await User.findById({_id: id})

    if(!user){
        return res.status(400).json({message: `User not found with id ${id}`})
    }

    //valid id, now check if token is valid
    const secret = process.env.JWT_SECRET + user.password

    try {
        //validate the jwt
        const payload = jwt.verify(token, secret)

        //after validation, update user password
        //hash
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)

        const update = await User.findByIdAndUpdate({_id: id},{
            password: hashedPass    
        })

        return res.status(200).json({message: "Password updated."})
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
module.exports = {
    getUsers,
    registerUser,
    loginUser,
    verifyUser,
    resetPassword,
    resetPasswordConfirm
}