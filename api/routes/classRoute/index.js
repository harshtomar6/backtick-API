// Dependencies
const express = require('express');
const router = express.Router();
const config = require('./../../../config');
const controller = require('./../../controllers');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/class' route
router.get('/', (req, res, next) => {
  controller.getAllClasses((err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// GET '/class/:classId/student' route to get all students of a class
router.get('/:classId/student', config.validateRequest, (req, res, next) => {
  controller.getClassStudents(req.params.classId, (err, status, students) => {
    res.status(status).json({err: err, data: students});
  })
});

// POST '/class/:classId/student/join' route to join a class
router.post('/:classId/student/join', config.validateRequest, (req, res, next) => {
  controller.joinClass(req.params.classId, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// POST '/class/:classId/staff/join' route to join a class (staff)
router.post('/:classId/staff/join', config.validateRequest, (req, res, next) => {
  controller.joinClassStaff(req.params.classId, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// GET '/class/join/:classCode' route to join a class by classCode
router.get('/join/:classCode', config.validateRequest, (req, res, next) => {
  controller.joinClassByCode(req.params.classCode, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

module.exports = router;