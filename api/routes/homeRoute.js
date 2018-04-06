let express = require('express');
let router = express.Router();
let path = require('path');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res, next) => {
  res.sendFile(path.resolve('src/index.html'));
});

module.exports = router;