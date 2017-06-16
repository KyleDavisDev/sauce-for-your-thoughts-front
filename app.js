const express = require("express");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes/routes.js");

//create express app
const app = express();

//serves up static files from distribution folder.
app.use(express.static(path.join(__dirname, "dist")));

// takes raw requests and attaches them to req.body for use later
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//populates req.cookies w/ any cookies that are w/ the req
app.use(cookieParser());

//handle routes
app.use("/", routes);

module.exports = app;
