const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(ErrorHandler)
module.exports = app;