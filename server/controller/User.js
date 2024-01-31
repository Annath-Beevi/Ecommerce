const express = require('express')
const path = require('path')
const { upload } = require("../multer")
const fs = require('fs')
const User = require("../Model/User")
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/ErrorHandler')
const sendMail = require("../utils/sendMail")

const router = express.Router()

router.post('/create-user', upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email })
        if (userEmail) {
            const fileName = req.file.filename;
            const filePath = `uploads/${fileName}`
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error Deleting File" })
                }
                else {
                    res.json({ message: "file deleted successfully" })
                }
            })
            return next(new ErrorHandler("user already exists", 400))
        }
        const fileName = req.file.filename;
        const fileUrl = path.join(fileName)

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl,
        }
        const activationToken = createActivationToken(user)
        const activationUrl = `http://localhost:5173/activation/${activationToken}`
        try{
            await sendMail({
                email: user.email,
                subject: "Activate Your Account",
                message: `Hello ${user.name}, Please click to activate your account: ${activationUrl}`,
            })
            res.status(201).json({
                success: true,
                message: `Please check your mail :- ${user.email} to activate your Account`,
            });
        }
        catch(err) {
            return next(new ErrorHandler(err.message, 400))
        }
    }
    catch (err) {
        return next(new ErrorHandler(err.message, 400))
    }
})

const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    })
}

module.exports = router;