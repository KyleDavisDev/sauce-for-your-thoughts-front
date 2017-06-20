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
