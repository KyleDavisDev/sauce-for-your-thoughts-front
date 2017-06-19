const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.addStore = async (req, res) => {
  // res.json(req.body);
  try {
    const store = new Store(req.body);
    await store.save();
    // res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};
