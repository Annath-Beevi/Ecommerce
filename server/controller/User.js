const express = require('express')
const path = require('path')
const { upload } = require("../multer")
const fs = require('fs')
const User = require("../Model/User")
const ErrorHandler = require('../utils/ErrorHandler')

const router = express.Router()

router.post('/create-user', upload.single('file'), async (req, res, next) => {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email })
    if(userEmail){
        const fileName  = req.file.filename;
        const filePath = `uploads/${fileName}`
        fs.unlink(filePath, (err) => {
            if(err){
                console.log(err)
                res.status(500).json({message: "Error Deleting File"})
            }
            else {
                res.json({ message: "file deleted successfully"})
            }
        })
        return next(new ErrorHandler("user already exists", 400))
    }
    const fileName  = req.file.filename;
    const fileUrl = path.join(fileName)

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
    }

    const newUser = await User.create(user)
    res.status(201).json({
        success: true,
        newUser: newUser
    })
})

module.exports = router;