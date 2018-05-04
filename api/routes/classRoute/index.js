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

// GET '/class/:classId/student' route to get all students of a class
router.get('/:classId/student', config.validateRequest, (req, res, next) => {
  classController.getClassStudents(req.params.classId, (err, status, students) => {
    res.status(status).json({err: err, data: students});
  })
});

// POST '/class/:classId/join' route to join a class
router.post('/:classId/join', config.validateRequest, (req, res, next) => {
  classController.joinClass(req.params.classId, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// GET '/class/join/:classCode' route to join a class by classCode
router.get('/join/:classCode', config.validateRequest, (req, res, next) => {
  classController.joinClassByCode(req.params.classCode, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

module.exports = router;