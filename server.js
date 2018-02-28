var express = require("express");
var app = express();

//rest will fall here and be handled by react app
app.get("*", function(req, res) {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

app.listen(5000, function() {
  console.log("Example app listening on port 5000!");
});
