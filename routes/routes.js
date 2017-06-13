const express = require('express')
const router = express.Router();

// api stuff
router.get('/api/test', (req, res) => {
  res.send('Hey! It works!');
});


//let react handle it
router.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

module.exports = router;
