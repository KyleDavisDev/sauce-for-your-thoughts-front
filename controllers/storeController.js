const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.addStore = async (req, res) => {
  try {
    const store = await new Store(req.body).save();

    //send back slug so we can link to it for user to rate
    res.send(store.slug);
  } catch (err) {
    // console.log(err);
    res.send("error");
  }
};

exports.getStores = async (req, res) => {
  try {
    const store = await Store.find();

    //TODO adjust query to not include ID maybe? 
    res.send(store);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
