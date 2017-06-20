const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.addStore = async (req, res) => {
  try {
    const store = await new Store(req.body).save();
    res.send("success")
  } catch (err) {
    console.log(err);
    res.send("success")
  }
};
