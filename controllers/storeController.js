const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.addStore = async (req, res) => {
  try {
    const store = await new Store(req.body).save();

    //send back slug so we can link to it for user to rate
    res.send(store.slug);
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.send(err);
  }
};

exports.editStore = async (req, res) => {
  try {
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true, //return new store instead of old one -- we want updated data returned
      runValidators: true, //force model to be sure required fields are still there
    }).exec();

    //send store to grab name and slug and create flash message
    res.send(store)
  } catch (err) {
    console.log(err);
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

