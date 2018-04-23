// Dependencies
const express = require('express');
const router = express.Router();
const config = require('./../../../config');
const classController = require('./../../controllers/classController');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/class' route
router.get('/', (req, res, next) => {
  classController.getAllClasses((err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// POST '/class/:classId/join' route to join a class
router.post('/:classId/join', config.validateRequest, (req, res, next) => {
  classController.joinClass(req.params.classId, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

module.exports = router;