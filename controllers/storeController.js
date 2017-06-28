const mongoose = require("mongoose");
const Store = mongoose.model("Store");
const slug = require("slugs"); //Hi there! How are you! --> hi-there-how-are-you
const multer = require("multer"); //helps uploading images/files
const jimp = require("jimp"); //helps with resizing photos
const uuid = require("uuid"); //generated unique identifiers

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype is not allowed" }, false);
    }
  },
  dest: "uploads/"
};

exports.upload = multer(multerOptions).single("image");

exports.resize = async (req, res, next) => {
  //check if new file to resize
  if (!req.file) {
    next(); //go to next middleware
    return;
  }

  //Do something with this
  next();
};

//when using FormData, which is needed to upload image, all data gets turned into
//string so we need to reformat to match model
exports.stringToProperType = (req, res, next) => {
  if (!req.body.location) {
    req.body.location = {};
  }

  if (typeof req.body.coordinates === "string") {
    req.body.location.coordinates = req.body.coordinates.split(",");
    delete req.body.coordinates;
  }

  if (typeof req.body.address === "string") {
    req.body.location.address = req.body.address;
    delete req.body.address;
  }

  if (typeof req.body.tags === "string") {
    req.body.tags = req.body.tags.split(",");
  }

  next(); //next middleware
};

exports.addStore = async (req, res) => {
  try {
    const store = await new Store(req.body).save();

    //send back slug so we can link to it for user to rate
    res.send(store);
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
};

exports.getStore = async (req, res) => {
  try {
    const store = await Store.findOne({ _id: req.params.id });

    //TODO make sure user is actual "owner" of store
    //check here

    //send store back for user to edit
    res.send(store);
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
};

exports.editStore = async (req, res) => {
  try {
    //generate new slug
    req.body.slug = slug(req.body.name);

    //set location data to be point
    req.body.location.type = "Point";

    const store = await Store.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true, //return new store instead of old one -- we want updated data returned
        runValidators: true //force model to be sure required fields are still there
      }
    ).exec();

    //send store to grab name and slug and create flash message
    res.send(store);
  } catch (err) {
    //go into here if user didn't input name or some other model requirement wasn't met
    res.send(err);
  }
};

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find();

    //send json of stores
    res.send(stores);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
