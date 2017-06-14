const express = require('express')
const expressValidator = require('express-validator')
const mongoose = require('mongoose')
const path = require('path')
const routes = require('./routes/routes.js')

//create express app
const app = express()

//serves up static files from distribution folder.
app.use(express.static(path.join(__dirname, 'dist')))

//handle routes
app.use('/', routes)

module.exports = app